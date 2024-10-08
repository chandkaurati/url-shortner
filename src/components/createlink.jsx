import React, { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import * as yup from "yup";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Error from "./error";
import { BeatLoader } from "react-spinners";
import databaseService from "@/db/database-service";
import { QrCode } from "lucide-react";

const CreateLink = ({ fetchurls }) => {
  const user = useSelector((state) => state.auth.userData);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState();
  const [isOpen, setIsOpen] = useState(!!searchParams.get("createNew"));
  const longLink = searchParams.get("createNew");
  const ref = useRef(null)
  const [formData, setFormdata] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateSchema = yup.object().shape({
    title: yup.string().required("plese enter a title"),
    longUrl: yup.string().required("plese enter a url"),
    customUrl: yup.string(),
  });

  const handleCreateLink = async () => {
    setLoading(true);
    try {
      await validateSchema.validate(formData, { abortEarly: false });
      const canvas = ref.current.canvasRef.current
      const  blob = await new Promise((resolve)=> canvas.toBlob(resolve))
      await databaseService.createShortUrl({
        ...formData,
        qr_code : blob,
        user_id: user?.user?.id,
      });
      await fetchurls(user?.user?.id);
      setFormdata({
        title: "",
        longUrl: "",
        customUrl: "",
      });

      setIsOpen(false);
      setSearchParams({});
    } catch (error) {
      console.log(error);
      const newErrors = [];
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <AlertDialog
        // defaultOpen={longLink}
        // onOpenChange={(res) => {
        //   if (!res) setSearchParams({});
        // }}

        open={isOpen}
        onOpenChange={(res) => {
          setIsOpen(res);
          if (!res) setSearchParams({});
        }}
      >
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            {formData?.longUrl && <QRCode value={formData?.longUrl} ref={ref} size={150} />}
            <AlertDialogTitle>Create Link</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>

            <div className="text-left flex flex-col gap-3">
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="enter a title"
              />
              {errors?.title && <Error message={errors.title} />}
              <Input
                type="text"
                name="longUrl"
                value={formData.longUrl}
                onChange={handleInputChange}
                placeholder="enter a your long Link"
              />
              {errors?.longUrl && <Error message={errors.longUrl} />}

              <Input
                type="text"
                name="customUrl"
                value={formData.customUrl}
                onChange={handleInputChange}
                placeholder="enter a your custom link"
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleCreateLink}>
              {loading ? <BeatLoader size={10} /> : "create url"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateLink;

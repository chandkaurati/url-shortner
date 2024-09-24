import React, { useEffect, useState } from "react";
import * as yup from "yup";
import {
  AlertDialog,
  AlertDialogAction,
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

const CreateLink = ({fetchurls}) => {
  const user = useSelector((state) => state.auth.userData);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState()
  const longLink = searchParams.get("createNew");
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

  useEffect(() => {}, [user]);

  const handleCreateLink = async () => {
    setLoading(true)
    try {
      await validateSchema.validate(formData, { abortEarly: false });
      const data = await databaseService.createShortUrl({
        ...formData,
        user_id: user?.user?.id,
      });
      await fetchurls(user?.user?.id)
      console.log(data);
    } catch (error) {
      console.log(error);
      const newErrors = [];
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <AlertDialog
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if (!res) setSearchParams({});
        }}
      >
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
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

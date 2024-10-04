import React, { useEffect, useState } from "react";
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
import { QrCodeIcon, Timer } from "lucide-react";
import { CircleLoader, ClipLoader } from "react-spinners";

const ShareQrcode = ({ Qr }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    console.log("hi");

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <QrCodeIcon size={20} color="gray" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {loading ? (
                <div className="flex justify-center items-center">
                  <ClipLoader color="white" />
                </div>
              ) : (
                <img src={Qr} alt="QR Code" />
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ShareQrcode;

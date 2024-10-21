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
import { QrCodeIcon, ShareIcon, Timer } from "lucide-react";
import { CircleLoader, ClipLoader } from "react-spinners";
import { Button } from "./ui/button";
import { Share1Icon } from "@radix-ui/react-icons";

const ShareQrcode = ({ Qr, title }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  // convert into img/png file
  const convertToFile = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob(); // Convert image URL to Blob
    const file = new File([blob], "qrcode.png", { type: "image/png" }); // Create a File object
    return file;
  };
 
  //share qur code method
  const handleShare = async () => {
    if (navigator.share) {
      try {
        const file = await convertToFile(Qr);
        await navigator.share({
          title: title,
          text: "visit the link",
          files: [file]
        });
        console.log("url shared successfully");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("web share api is not supported in this browser");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <QrCodeIcon size={20} color="gray" />
        </AlertDialogTrigger>
        <AlertDialogContent className="w-80">
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="white" />
            </div>
          ) : (
            <div className="flex justify-center flex-col gap-5 items-center">
              <h1>share this Qr</h1>
              <img src={Qr} alt="QR Code" />
            </div>
          )}
          <div className="flex justify-center gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleShare}>
              <Share1Icon />
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ShareQrcode;

import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyIcon, QrCodeIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import shortString from "@/utils/shortstring";
import { useSelector } from "react-redux";
import databaseService from "@/db/database-service";
import { ClipLoader } from "react-spinners";
import { useToast } from "@/hooks/use-toast";
import ShareQrcode from "./ShareQrcode";

const MyLinksTable = ({ urls, fetchurls }) => {
  const [loadingMap, setLoadingMap] = useState({});
  const { toast } = useToast();
  const user = useSelector((state) => state.auth.userData);

  const setLoadingForUrl = (id, isLoading) => {
    setLoadingMap((prevstate) => ({ ...prevstate, [id]: isLoading }));
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "shor link copied ",
      description: `${link}`,
    });
  };

  const deleteUrl = async (id, user_id) => {
    setLoadingForUrl(id, true);
    try {
      await databaseService.deleteUrl(id);
      await fetchurls(user_id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForUrl(id, false);
    }
  };

  return (
    <>
      <div className="hidden md:flex">
        <Table>
          <TableCaption>A list of your links created.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">short Link</TableHead>
              <TableHead>short link</TableHead>
              <TableHead>originalLInk</TableHead>
              <TableHead>Qrcode</TableHead>
              <TableHead className="">created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls?.map((url) => {
              return (
                <TableRow key={url.id} className="">
                  <TableCell className="font-medium">{url.title}</TableCell>
                  <TableCell>
                    <span className="flex gap-2 items-center">
                      <p>{`https://BiteUrl.in/${
                        url.custom_url ? url.custom_url : url.short_url
                      }`}</p>
                      <p
                        onClick={() => {
                          handleCopyLink(`${url.custom_url ? url.custom_url : url.short_url}`)
                        }}
                      >
                        <CopyIcon size={14} color="gray" />
                      </p>
                    </span>
                  </TableCell>
                  <TableCell>{shortString(url.original_url)}</TableCell>
                  <TableCell ><ShareQrcode/></TableCell>
                  <TableCell className="">
                    {new Date(url.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="">
                    <Button
                      onClick={() => deleteUrl(url.id, user?.user?.id)}
                      className="bg-red-600 hover:bg-red-500"
                    >
                      {loadingMap[url.id] ? (
                        <ClipLoader color="white" size={12} />
                      ) : (
                        <Trash2Icon size={16} color="white" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* mobile data table */}

      <div className="w-full md:hidden">
        <div className="w-full">
          <Accordion type="multiple" collapsible>
            {urls?.map((url, index) => {
              return (
                <AccordionItem key={url.id} value={`item-${index + 1}`}>
                  <AccordionTrigger>{url.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between gap-4 ">
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-400">Long url</p>
                        <span className="items-center">
                          {shortString(url.original_url)}
                        </span>
                        <p className="text-gray-400">short ulr</p>
                        <span className=" flex gap-8 items-center">
                          <p>{`https://BiteUrl.in/${
                            url.custom_url ? url.custom_url : url.short_url
                          }`}</p>
                          <p
                            className="text-white"
                            onClick={() => {
                              handleCopyLink(`${ url.custom_url ? url.custom_url : url.short_url}`);
                            }}
                          >
                            <CopyIcon size={15} />
                          </p>
                        </span>
                        <p className="text-gray-400">clicks </p>
                        <span> 23</span>
                        <p>Qrcode</p>
                        <span><ShareQrcode Qr={url.qr}/></span>
                        <p className="text-gray-400">Created at</p>
                        <span className="">
                          {new Date(url.created_at).toLocaleDateString()}
                        </span>

                        <Button
                          onClick={() => deleteUrl(url.id, user?.user?.id)}
                          className="bg-red-600 w-40 hover:bg-red-500"
                        >
                          {loadingMap[url.id] ? (
                            <ClipLoader color="white" size={12} />
                          ) : (
                            <Trash2Icon size={16} color="white" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default MyLinksTable;

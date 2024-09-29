import React, { useState } from "react";
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
import {
  Copy,
  CopyIcon,
  Delete,
  DeleteIcon,
  LucideDelete,
  QrCodeIcon,
  ShareIcon,
  Trash,
  Trash2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import shortString from "@/utils/shortstring";
import { useSelector } from "react-redux";
import databaseService from "@/db/database-service";
import { BeatLoader, ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const MyLinksTable = ({ urls, fetchurls }) => {
  const [loadingMap, setLoadingMap] = useState({});
  const user = useSelector((state) => state.auth.userData);

  const setLoadingForUrl = (id, isLoading) => {
    setLoadingMap((prevstate) => ({ ...prevstate, [id]: isLoading }));
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
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">short Link</TableHead>
              <TableHead>short link</TableHead>
              <TableHead>originalLInk</TableHead>
              <TableHead>clicks </TableHead>
              <TableHead className="">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls?.map((url) => {
              return (
                <TableRow key={url.id} className="">
                  <TableCell className="font-medium">{url.title}</TableCell>
                  <TableCell>
                    <span className="flex gap-2 items-center">
                    <Link to={`/link/${url.id}`}>{`https://BiteUrl.in/${url.custom_url ? url.custom_url : url.short_url}`}</Link>
                      <p>
                        <CopyIcon size={14} color="gray" />
                      </p>
                    </span>
                  </TableCell>
                  <TableCell>{shortString(url.original_url)}</TableCell>
                  <TableCell className="">3</TableCell>
                  <TableCell className="">
                    {new Date().toLocaleDateString()}
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
                        <Link to={`/link/${url.id}`}>{`https://BiteUrl.in/${url.custom_url ? url.custom_url : url.short_url}`}</Link>
                          <p className="text-white">
                            <CopyIcon size={15} />
                          </p>
                        </span>
                        <p className="text-gray-400">clicks </p>
                        <span> 23</span>
                        <p className="text-gray-400">Created at</p>
                        <span className="">
                          {new Date(url.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex justify-between p-1">
                        <Button
                          onClick={() => deleteUrl(data.id, user?.user?.id)}
                          className="bg-red-600 hover:bg-red-500"
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

import React, { useEffect } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSearchParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    console.log(longLink);
  }, []);
  return (
    <>
      <div>
        {true && <BarLoader color="lightblue" width={"100%"} />}
        <div className="w-full p-2">
          <Card>
            <CardHeader>
              <CardTitle>Links createed</CardTitle>
            </CardHeader>
            <CardContent>
              <p>0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p>0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

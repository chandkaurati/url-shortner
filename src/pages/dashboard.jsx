import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useSearchParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/error";
import { useSelector } from "react-redux";
import databaseService from "@/db/database-service";
import CreateLink from "@/components/createlink";
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState();
  const [urlData, setUrlsData] = useState([]);
  const [clicksData, setClicksData] = useState([]);
  const longLink = searchParams.get("createNew");
  const userdata = useSelector((state) => state.auth.userData);

  const fetchurls = useCallback(async (user_id) => {
    setLoading(true);
    try {
      const urls = await databaseService.getUrls(user_id);
      console.log(urls);
      setUrlsData(urls || []);
      if (urls?.length) {
        const urlIds = urls?.map((url) => url?.id);
        const clicks = await databaseService.geturlClicks(urlIds);
        console.log(clicks);
        setClicksData(clicks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userdata?.user?.id) {
      fetchurls(userdata.user.id);
    }
  }, [userdata, fetchurls]);

  return (
    <>
      <div className="w-full p-5 flex flex-col gap-8">
        {loading && <BarLoader color="lightblue" width={"100%"} />}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Links createed</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{urlData.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{clicksData.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">My Links</h1>
          <CreateLink fetchurls={fetchurls} />
        </div>

        <div className="relative">
          <Input
            type="text"
            placeholder="filter links"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Filter className="absolute top-2 right-2 p-1 " />
        </div>
        <div>
          {urlData.map((url, i) => {
            return (
              <div className="border p-1">
                <p  key={i}>{url?.title}</p>
                <a href="">{url?.original_url}</a>
                <a href="">{url?.short_url}</a>
                <Button
                  variant=""
                  onClick={() => {
                    databaseService.deleteUrl(url?.id);
                    fetchurls(userdata.user.id);
                  }}
                >
                  delete
                </Button>
              </div>
            );
          })}
        </div>
        {false && <Error message="true" />}
      </div>
    </>
  );
};

export default Dashboard;

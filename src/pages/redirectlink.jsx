import databaseService from "@/db/database-service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const [loading, setLoading] = useState();
  const { id } = useParams();

  async function recordUrlStats() {
    setLoading(true);
    try {
      const data = await databaseService.getLongUrl(id);
      await databaseService.storeClicks({
        id: data?.id,
        originalUrl: data?.original_url,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    recordUrlStats();
    console.log(id)
  }, []);

  

  if (loading) {
    return <BarLoader width={"100%"} color="green" />;
  }
  return null;
};

export default RedirectLink;

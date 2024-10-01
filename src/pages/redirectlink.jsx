import databaseService from "@/db/database-service";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate()

  const recordUrlStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await databaseService.getLongUrl(id);
      await databaseService.storeClicks({
        id: data?.id,
        originalUrl: data?.original_url,
      });
    } catch (error) {
      console.log(error);
      setError(error)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    recordUrlStats();
  }, []);

  if (loading) {
    return (
      <>
      <BarLoader width={"100%"} color="green" />
      <div className="mt-6 flex justify-center items-center ">
        Redirecting ...
      </div>
      </>
    );
  }

  if(error){
    navigate("/404")
  }
  return null;
};

export default RedirectLink;

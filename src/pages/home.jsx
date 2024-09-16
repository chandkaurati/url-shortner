import LinkInput from "@/components/linkinput";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";
const Home = () => {
  const Userdata = useSelector((state)=> state.auth.userData)
  useEffect(() => {
    console.log(Userdata)
  }, [Userdata]);

  return (
    <div className=" h-full px-4">
      <div className="action-container h-1/2 mt-5 flex flex-col justify-center gap-7 items-center">
        <h1
          className="break-words text-[2rem] sm:text-[3rem]
    font-extrabold text-gradient text-center"
        >
          Shortner Your Loooong Links :)
        </h1>
        <LinkInput />
        <p className="text-center break-words font-extralight text-gray-400">
          LinkLy is an efficient and easy-to use shortneing service that
          setreamlienes your online experience
        </p>
      </div>
    </div>
  );
};

export default Home;

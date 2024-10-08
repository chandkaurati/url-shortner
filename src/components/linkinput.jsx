import React, { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, LinkIcon } from "lucide-react";
import AuthPopup from "./authpopup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LinkInput = () => {
  const [lognUrl, setLongUrl] = useState("")
  const state = useSelector((state) => state.auth.status);
  const navigate = useNavigate()
  const handleShorten = (e)=>{
  navigate(`/dashboard?${lognUrl?`createNew=${lognUrl}`: ""}`)
  }
  return (
    <div  className="input-container border-gray-600  border-2  rounded-full break-words flex items-center px-3 gap-3 md:px-3 py-2 md:gap-9">
      <LinkIcon />{" "}
      <input
        type="link"
        value={lognUrl}
        onChange={(e)=> setLongUrl(e.target.value)}
        placeholder="paste your link here"
        className="bg-[#0A0A0A] text-white outline-none"
      />
      {!state ? (
        <AuthPopup title={"Shorten Now!"} isInputpopup={true}/>
      ) : (
        <Button onClick={(e)=> handleShorten(e)} className="bg-[#144EE3] hover:bg-[#0f4be2] text-white p-2 md:px-4 md:py-2 rounded-full">
          <span className="hidden font-light md:flex tracking-wide">
            Shorten Now!
          </span>
          <span className="flex font-light md:hidden ">
            <ArrowRight />
          </span>
        </Button>
      )}
    </div>
  );
};

export default LinkInput;

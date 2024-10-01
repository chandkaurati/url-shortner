import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import AuthPopup from "./authpopup";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import authService from "@/db/auth-service";
import { logout } from "@/store/authSclice";
const Navbar = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const data = useSelector((state) => state.auth.userData);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const responce = await authService.removeSession();
      if (!responce) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <nav className="flex p-3 justify-between items-center">
      <Link>
        <p className="text-gradient text-[1.5em] font-extrabold tracking-wide">
          Bite Url
        </p>
      </Link>
      <div className="flex gap-7">
        {!status ? (
          <AuthPopup title="login" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>My Accoount</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {data?.user?.user_metadata?.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link to="/dashboard">My Links</Link></DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={handleLogout}>
                  {loading ? <BeatLoader size={10} /> : "Logout"}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import AuthPopup from "./authpopup";
import { useUserContext } from "@/context/userContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import useFetch from "@/hooks/fetchapi";
import { logoutUser } from "@/db/auth-api";
import { BeatLoader } from "react-spinners";

const Navbar = () => {
  const { user, isAuthenticated, fn: getSession } = useUserContext();
  const navigate = useNavigate();
  const { error, loding, fn: logout } = useFetch(logoutUser);

  const handleLogout = async() => {
      await logout()
      await getSession()
      navigate("/")
  };

  return (
    <nav className="flex p-3 justify-between items-center">
      <Link>
        <p className="text-gradient text-[1.5em] font-extrabold tracking-wide">
          Bite Url
        </p>
      </Link>
      <div className="flex gap-7">
        {!isAuthenticated ? (
          <AuthPopup title="login" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>My Accoount</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                Hi !{user?.user_metadata?.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={handleLogout}>{loding ? <BeatLoader size={10} /> : "Logout"}</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

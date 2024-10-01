import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
const AppLayout = () => {
  return (
    <div className=" flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <Toaster/>
      <footer className="h-20 bg-slate-600 flex flex-col items-center justify-center">
         <p>Developed by Chand</p>
         <p>Design Credits <a href="https://www.figma.com/@mohijas" target="index">@mohijas</a></p>
      </footer>
    </div>
  );
};

export default AppLayout;

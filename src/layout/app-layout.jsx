import React from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div className=" flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="h-32 bg-slate-600 flex flex-col items-center justify-center">
         <p>Developed by Chand</p>
         <p>Design Credits <a href="https://www.figma.com/@mohijas" target="index">@mohijas</a></p>
      </footer>
    </div>
  );
};

export default AppLayout;

import React from 'react'

import {
    AlertDialog,

    AlertDialogCancel,
    AlertDialogContent,
 
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from './ui/button';
import { ArrowRight, LogIn } from 'lucide-react';
import Login from './login';
import Register from './register';

const AuthPopup = ({title, isInputpopup }) => {
  return (
    <>
      <AlertDialog>
          <AlertDialogTrigger>
           {!isInputpopup ? (
            <Button className="bg-slate-600 hover:bg-slate-700 rounded-full text-white">
            {title} <span className='ml-2'><LogIn width={20}/></span></Button>
           ): (
            <>
             <Button className="bg-[#144EE3] hover:bg-[#0845dd] text-white p-2 md:px-4 md:py-2 rounded-full">
              <span className="hidden font-light md:flex tracking-wide">
                Shorten Now!
              </span>
              <span className="flex font-light md:hidden ">
                <ArrowRight />
              </span>
            </Button>
            </>
           )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <Tabs defaultValue="account" className="w-[400px flex flex-col">
              <TabsList>
                <TabsTrigger value="account">Login</TabsTrigger>
                <TabsTrigger value="password">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>login</CardTitle>
                      <CardDescription>
                        login to yout Account to view your links analytics or
                        genrate a new link
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Login/>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="password">
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Register</CardTitle>
                      <CardDescription>
                        Register to Genrate short links and exelerate your
                        online experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Register/>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
    </>
  )
}

export default AuthPopup

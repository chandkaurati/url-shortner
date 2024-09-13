import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useFetch from "@/hooks/fetchapi";
import * as yup from "yup"
import { loginUser, signUpNewUser } from "@/db/auth-api";
import Error from "./error";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/userContext";
const Register = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target
    setFormdata((prevstate) => ({
      ...prevstate,
      [name]:  type === "file" ? files[0] : value,
    }));
  };

  const { data:session , error:apiError, loding, fn:singup} =  useFetch(signUpNewUser, formdata)
  const {fn:login} =  useFetch(loginUser, formdata)
  const {fn:getSession} =  useUserContext()

  useEffect(()=>{
      if(session.session){
         navigate("/dashboard")
         login()
         getSession()
      }
  },[session, loding])


  const handleSignupUser = async(e)=> {
    e.preventDefault()
     try {
      const schema = yup.object().shape({
        name : yup.string().required("name is required"),
        email : yup.string().email("plsease enter a valid email")
        .required("email is required"),
        password: yup.string().min(6, "password mustlonger than 6 chagerater").required("password is requred")
      })

      await schema.validate(formdata, {abortEarly:false})
       let responce =  await singup()
       console.log(responce)
     } catch (error) {
        const newError = []
        error?.inner?.forEach((err)=>{
          newError[err.path] = err.message
        })
        console.log(newError)
        setErrors(newError)
        console.log(error)
     }
  }

  return (
    <form onSubmit={handleSignupUser}>
      {apiError && <Error message={"User Already exists"}/>}
      <Input
        type="text"
        name="name"
        className="mb-3 mt-2"
        value={formdata.name}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />
      {errors.name && <Error message={errors.name}/>}
      <Input
        type="email"
        name="email"
        className="mb-3 mt-2"
        value={formdata.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />
      {errors.email && <Error message={errors.email}/>}   
      <Input
        type="Password"
        name="password"
        value={formdata.password}
        onChange={handleInputChange}
        className="mb-3"
        placeholder="Enter your password  "
      />
      {errors.password && <Error message={errors.password}/>}
      
      {/* <Input
        type="file"
        onChange={handleInputChange}
        className="text-white  mb-3"
        placeholder="Enter your password  "
      /> */}

      <Button type="submit">{loding ? <BeatLoader/> : 'Register'}</Button>
    </form>
  );
};

export default Register;

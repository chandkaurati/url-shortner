import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import Error from "./error";
import { loginUser } from "@/db/auth-api";
import useFetch from "@/hooks/fetchapi";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/userContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [erorrs, setErrors] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const {
    data: session,
    error: apiError,
    loding,
    fn:login,
  } = useFetch(loginUser, formData);

  const {fn:getSession} = useUserContext()

  useEffect(() => {
    if (session.session) {
      navigate("/dashboard");
      getSession()
    }
  }, [session, loding]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErrors([]);
      const validateSchema = yup.object().shape({
        email: yup
          .string()
          .email("invalid Email")
          .required("email is required"),
        password: yup
          .string()
          .min(6, "password should be 6 chars long ")
          .required("password is required"),
      });

      await validateSchema.validate(formData, { abortEarly: false });
      // const responce = await loginUser(formData.email, formData.password)
      const responce = await login();
    } catch (error) {
      const newErrors = [];
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      console.log(error);
      console.log(erorrs.email);
    }
  };
  
  return (
    <form onSubmit={handleLogin}>
      {apiError && <Error message={"wrong credentials"}/>}
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="mb-3"
        placeholder="Enter your email"
      />
      {erorrs.email && <Error message={erorrs.email} />}
      <Input
        type="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="mb-3"
        placeholder="Enter your password  "
      />
      {erorrs.password && <Error message={erorrs.password} />}
      <Button type="submit" className="mt-3">
        {loding ? <BeatLoader size={10} color="black" /> : "login"}
      </Button>
    </form>
  );
};

export default Login;

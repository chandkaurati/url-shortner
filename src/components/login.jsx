import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import Error from "./error";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/fetchapi";
import authService from "@/db/auth-service";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSclice";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [erorrs, setErrors] = useState([]);
  const [loading, setLoading] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      const userData = await authService.setSession(formData);
      if (userData.access_token) {
        dispatch(login({ userData }));
        navigate("/dashboard");
      }
    } catch (error) {
      const newErrors = [];
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {false && <Error message={"wrong credentials"} />}
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
        {loading ? <BeatLoader size={10} color="black" /> : "login"}
      </Button>
    </form>
  );
};

export default Login;

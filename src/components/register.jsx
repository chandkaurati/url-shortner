import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as yup from "yup";
import Error from "./error";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "@/db/auth-service";
import { login } from "@/store/authSclice";
import { useToast } from "@/hooks/use-toast";
const Register = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const [loading, setLoading] = useState();
  const [apiErorr, setApiError] = useState(false);
  const [Validationerrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target;
    setFormdata((prevstate) => ({
      ...prevstate,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  //hook to show toast message after user registered succssfully
  const { toast } = useToast();

  // handle register user function
  const handleSignupUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const schema = yup.object().shape({
        name: yup.string().required("name is required"),
        email: yup
          .string()
          .email("plsease enter a valid email")
          .required("email is required"),
        password: yup
          .string()
          .min(6, "password must longer than 6 chagerater")
          .required("password is requred"),
      });

      await schema.validate(formdata, { abortEarly: false });
      const userData = await authService.createAccount(formdata);
      if (userData.access_token) {
        dispatch(login({ userData }));
        navigate("/dashboard");
        toast({
          title: `welcome ${userData?.user?.user_metadata.name}`,
          description: `Enjoy our free services`,
        });
      } else {
        setApiError(userData.message);
      }
    } catch (error) {
      const newError = [];
      error?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      setValidationErrors(newError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignupUser}>
      {apiErorr && <Error message={"User Already exists"} />}
      {Validationerrors.name && <Error message={Validationerrors.name} />}
      <Input
        type="text"
        name="name"
        className="mb-3 mt-2"
        value={formdata.name}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />
      {Validationerrors.email && <Error message={Validationerrors.email} />}
      <Input
        type="email"
        name="email"
        className="mb-3 mt-2"
        value={formdata.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />
        {Validationerrors.password && (
          <Error message={Validationerrors.password} />
        )}
      <Input
        type="Password"
        name="password"
        value={formdata.password}
        onChange={handleInputChange}
        className="mb-3"
        placeholder="Enter your password  "
      />

      <Button type="submit" disabled={loading}>{loading ? <BeatLoader size={10} /> : "Register"}</Button>
    </form>
  );
};

export default Register;

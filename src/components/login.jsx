import React, {useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import Error from "./error";
import authService from "@/db/auth-service";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSclice";
import { useToast } from "@/hooks/use-toast";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {toast} = useToast()
  const [apiError, setApiError] = useState(false)
  const [validationErorrs, setValidationErrors] = useState([]);
  const [loading, setLoading] = useState();
  
  //set form values 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const dispatch = useDispatch();

  // handle user login function 
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setValidationErrors([]);
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
        console.log(userData)
        dispatch(login({ userData }));
        toast({
          title: "login success",
          description: `Hello ${userData?.user?.user_metadata?.name} go to dashboard to see your created short links`,
        });
       setValidationErrors(null)
       setApiError(null) 
      }else{
        setApiError(userData.message)
      }
     
    } catch (error) {
      const newErrors = [];
        error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
        });
        setValidationErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {apiError && <Error message={"wrong credentials"} />}
      {validationErorrs.email && <Error message={validationErorrs.email} />}
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="mb-3"
        placeholder="Enter your email"
      />
      {validationErorrs.password && <Error message={validationErorrs.password} />}
      <Input
        type="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="mb-3"
        placeholder="Enter your password  "
      />
      <Button type="submit" disabled={loading} className="mt-3">
        {loading ? <BeatLoader size={10} color="black" /> : "login"}
      </Button>
    </form>
  );
};

export default Login;

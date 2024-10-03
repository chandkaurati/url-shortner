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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
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
      const responce = await authService.setSession(formData);
      if (responce.access_token) {
        dispatch(login({ responce }));
        toast({
          title: "login success",
          description: `Hello ${responce?.user?.user_metadata?.name}`,
        });
      }else{
        setApiError(responce.message)
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
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="mb-3"
        placeholder="Enter your email"
      />
      {validationErorrs.email && <Error message={validationErorrs.email} />}
      <Input
        type="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="mb-3"
        placeholder="Enter your password  "
      />
      {validationErorrs.password && <Error message={validationErorrs.password} />}
      <Button type="submit" className="mt-3">
        {loading ? <BeatLoader size={10} color="black" /> : "login"}
      </Button>
    </form>
  );
};

export default Login;

import { useEffect } from "react";
import { useAuth } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { useState } from "react";

export default function PrivateRoutes() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/user-auth`,
          {
            headers: {
              Authorization: auth?.token
            },
          }
        );
        setOk(res.data.ok);
      } catch (error) {
        console.log(error);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}

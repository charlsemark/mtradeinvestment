"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  // const AuthenticatedComponent = (props) => {

  const token = Cookies.get('token');
  const router = useRouter();
  if (!token) {
    React.useEffect(() => {
      router.push("/login");
    }, []);
  } else {
    return <>{children}</>;
  }
};

export default PrivateRoute;

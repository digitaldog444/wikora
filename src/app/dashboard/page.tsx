"use client";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [user, setUser] = useState({});

  const verifyUser = async () => {
    let response = await fetch("/api/auth/authenticate");
    let json = await response.json();
    if (json.success) {
      setUser(json.user);
    } else {
      toast.error(json.error);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);
  return <div>Dashboard</div>;
};
export default Dashboard;

import React from "react";
import RegisterPage from "../register/page";
import { getSession } from "@/lib/getSession";
import DashboardClient from "./DashboardClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Quikmemo | Your Favorite Note Editor",
  description:
    "Effortlessly create, edit, and organize your notes for maximum productivity.",
};

const Dashboard = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <React.Fragment>
      {user ? <DashboardClient /> : <RegisterPage />}
    </React.Fragment>
  );
};

export default Dashboard;

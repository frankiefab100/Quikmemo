import RegisterPage from "../register/page";
import { getSession } from "@/lib/getSession";
import DashboardClient from "./DashboardClient";

const Dashboard = async () => {
  const session = await getSession();
  const user = session?.user;

  return <>{user ? <DashboardClient /> : <RegisterPage />}</>;
};

export default Dashboard;

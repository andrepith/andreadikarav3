import { useSelector } from "react-redux";
import withAuth from "@/components/HOC/WithAuth";
import BioForm from "@/components/BioForm";
import SocialForm from "@/components/SocialForm";

const Dashboard = () => {
  return (
    <div className="wrapper py-4">
      <BioForm />
      <SocialForm />
    </div>
  );
};

export default withAuth(Dashboard);

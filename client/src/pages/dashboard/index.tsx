import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "src/store/reducers";
import withAuth from "@/components/HOC/WithAuth";
import BioForm from "@/components/BioForm";
import SocialForm from "@/components/SocialForm";
import ExperienceForm from "@/components/ExperienceForm";
import { getBio } from "src/store/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const bio = useSelector((state: IRootState) => state.bio.bio);

  useEffect(() => {
    if (!bio) dispatch(getBio());
  }, []);

  return (
    <div className="wrapper py-4">
      {bio && (
        <>
          <BioForm bio={bio} />
          <SocialForm bio={bio} />
          <ExperienceForm bio={bio} />
        </>
      )}
    </div>
  );
};

export default withAuth(Dashboard);

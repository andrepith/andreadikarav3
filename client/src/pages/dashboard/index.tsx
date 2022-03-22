import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { IRootState } from "src/store/reducers";
import withAuth from "@/components/HOC/WithAuth";
import BioForm from "@/components/BioForm";
import SocialForm from "@/components/SocialForm";
import ExperienceForm from "@/components/ExperienceForm";
import SkillForm from "@/components/SkillForm";
import PortofolioForm from "@/components/PortofolioForm";
import EducationForm from "@/components/EducationForm";
import { getBio } from "src/store/actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const bio = useSelector((state: IRootState) => state.bio.bio);

  useEffect(() => {
    if (!bio) dispatch(getBio());
  }, [bio, dispatch]);

  return (
    <div className="dashboard wrapper py-4">
      {bio && (
        <div>
          <BioForm bio={bio} />
          <SocialForm bio={bio} />
          <ExperienceForm bio={bio} />
          <PortofolioForm bio={bio} />
          <SkillForm bio={bio} />
          <EducationForm bio={bio} />
          <div className="back-to-home container">
            <Link href="/">
              <a>
                <button className="btn btn-secondary">
                  To Home <i className="fa fa-arrow-right" />
                </button>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Dashboard);

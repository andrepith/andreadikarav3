import dynamic from "next/dynamic";
import NavBar from "src/components/NavBar";
import LandingTop from "src/components/LandingTop";
import Experience from "src/components/Experience";
const Showcase = dynamic(() => import("@/components/Showcase"));
const Skillset = dynamic(() => import("@/components/Skillset"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
import bioInterface from "@/lib/Types";

export async function getServerSideProps({ req }: { req: any }) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  const res = await fetch(baseUrl + "/api/bio");
  const bio = await res.json();
  return {
    props: {
      bio,
    },
  };
}

const Home = ({ bio }: bioInterface) => {
  const scrollToExperience = () => {
    window.location.replace("/#experience");
  };
  const scrollToProject = () => {
    window.location.replace("/#project");
  };
  const scrollToSkills = () => {
    window.location.replace("/#skills");
  };

  const scrollToContact = () => {
    window.location.replace("/#contact");
  };
  return (
    <>
      <NavBar
        bio={bio}
        scrollToExperience={scrollToExperience}
        scrollToProject={scrollToProject}
        scrollToSkills={scrollToSkills}
        scrollToContact={scrollToContact}
      />
      <main className="wrapper">
        <LandingTop bio={bio} scrollToExperience={scrollToExperience} />
        <Experience bio={bio} />
        <Showcase bio={bio} />
        <Skillset bio={bio} />
        <Contact />
        <Footer bio={bio} />
      </main>
    </>
  );
};

export default Home;

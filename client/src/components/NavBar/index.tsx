import { useState } from "react";
import Link from "next/link";
import { List } from "react-bootstrap-icons";
import Overlay from "../Overlay";

interface NavBarInterface {
  firstName: string;
  lastName: string;
  github: string;
  linkedin: string;
  email: string;
  scrollToExperience: () => void;
  scrollToProject: () => void;
  scrollToSkills: () => void;
  scrollToContact: () => void;
}

const NavBar = ({
  firstName,
  lastName,
  github,
  linkedin,
  email,
  scrollToExperience,
  scrollToProject,
  scrollToSkills,
  scrollToContact,
}: NavBarInterface) => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Overlay
        isOpen={isOpen}
        handleClose={handleClose}
        scrollToExperience={scrollToExperience}
        scrollToProject={scrollToProject}
        scrollToSkills={scrollToSkills}
        scrollToContact={scrollToContact}
      />
      <header className="fixed-top navigation" id="navigation">
        <nav className="navbar navbar-expand-lg primary-nav container">
          <Link href="/">
            <a aria-current="page" className="nav-item nav-link pl-0 me-4">
              {firstName} {lastName}
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleOpen}
            aria-label="nav-mobile"
          >
            <List size={24} color="white" />
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <div className="navbar-nav align-items-center ml-auto">
              <div
                onClick={scrollToExperience}
                className="nav-item nav-link me-2"
              >
                Experience
              </div>
              <div onClick={scrollToProject} className="nav-item nav-link me-2">
                Project
              </div>
              <div onClick={scrollToSkills} className="nav-item nav-link me-2">
                Skills
              </div>
              <div onClick={scrollToContact} className="nav-item nav-link me-2">
                Contact
              </div>
              <a
                href={`mailto:${email}`}
                className="btn btn-layered offset"
                role="button"
                aria-pressed="true"
              >
                hire me
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;

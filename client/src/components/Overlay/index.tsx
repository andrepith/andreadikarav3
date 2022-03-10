import { XCircle } from "react-bootstrap-icons";

interface OverlayInterface {
  isOpen: boolean;
  handleClose: () => void;
  scrollToExperience: () => void;
  scrollToProject: () => void;
  scrollToSkills: () => void;
  scrollToContact: () => void;
}

const Overlay = ({
  isOpen,
  handleClose,
  scrollToExperience,
  scrollToProject,
  scrollToSkills,
  scrollToContact,
}: OverlayInterface) => {
  const scrollExp = () => {
    scrollToExperience();
    handleClose();
  };
  const scrollProj = () => {
    scrollToProject();
    handleClose();
  };
  const scrollSkills = () => {
    scrollToSkills();
    handleClose();
  };
  const scrollContact = () => {
    scrollToContact();
    handleClose();
  };
  return (
    <aside
      id="navOverlay"
      className={`nav-overlay ${isOpen ? "d-block" : "d-none"}`}
    >
      <span className="nav-close">
        <XCircle onClick={handleClose} />
      </span>
      <div className="overlay-content">
        <div onClick={scrollExp}>Experience</div>
        <div onClick={scrollProj}>Project</div>
        <div onClick={scrollSkills}>Skills</div>
        <div onClick={scrollContact}>Contact</div>
      </div>
    </aside>
  );
};

export default Overlay;

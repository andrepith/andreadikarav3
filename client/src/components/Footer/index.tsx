import { EnvelopeFill, PhoneFill } from "react-bootstrap-icons";
import bioInterface from "@/lib/Types";

const Footer = ({ bio }: bioInterface) => {
  return (
    <footer className="justify-content-start footer" id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-contact">
            <div className="footer-contact__email">
              <EnvelopeFill className="me-2" size={16} />
              <span>{bio.email}</span>
            </div>
            <div className="footer-contact__phone">
              <PhoneFill className="me-2" size={16} />
              <span>{bio.phone}</span>
            </div>
          </div>
          <div className="footer-copyright">
            <div>Designed and Built by Andre Adikara</div>
            <div>© 2021-{new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

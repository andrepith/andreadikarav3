import React from "react";
import {
  EnvelopeFill,
  FileArrowDownFill,
  ArrowDownCircleFill,
} from "react-bootstrap-icons";
import bioInterface from "@/lib/Types";

interface LandingTopProps extends bioInterface {
  scrollToExperience: () => void;
}

const LandingTop = ({
  bio: { firstName, nationality, aboutMe, email, resumeLink, social },
  scrollToExperience,
}: LandingTopProps) => {
  return (
    <section className="landing-top position-relative" id="landing-top">
      <div className="container landing-top__text">
        <div className="landing-block">
          <h1 className="landing-title">
            Hey, I’m {firstName} - A Software <br />
            Engineer from {nationality}.
          </h1>
          <p className="mt-4">{aboutMe}</p>
          <div className="d-flex mt-4">
            <div className="me-2">
              <EnvelopeFill size={16} color="white" />
            </div>
            <a className="email-link" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
          <div className="d-flex mt-2">
            <div className="me-2">
              <FileArrowDownFill size={16} color="white" />
            </div>
            <a
              className="download-link d-block"
              href={resumeLink}
              target="__blank"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
      <div className="landing-top__foot" onClick={scrollToExperience}>
        <ArrowDownCircleFill size={32} color="white" />
      </div>
      <ul className="landing-top__side">
        {social.map(({ name, url }, key) => (
          <li key={key}>
            <a href={url} target="__blank">
              <i className={`fa fa-${name.toLocaleLowerCase()}`} />
            </a>
          </li>
        ))}
        {/* <i className="fa fa-github" /> */}
      </ul>
    </section>
  );
};

export default LandingTop;

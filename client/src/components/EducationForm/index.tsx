import { useState } from "react";
import { getRangeYear } from "src/lib/Helpers";

interface eduInterface {
  _id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: number;
  to: number;
  description: string;
}

const EducationForm = ({ bio }: any) => {
  const [toggle, setToggle] = useState({ open: false, id: "" });
  return (
    <section>
      <div className="education container">
        <div className="bio-section-title">Education</div>
        <div className="education-items">
          {bio.education.map(
            ({
              _id,
              school,
              degree,
              fieldofstudy,
              from,
              to,
              description,
            }: eduInterface) => (
              <div className="education-item" key={_id}>
                <div className="education-card">
                  <div className="education-detail">
                    <div>{school}</div>
                    <div>
                      {degree} in {fieldofstudy}
                    </div>
                    <div>{getRangeYear(from, to)}</div>
                    <div>{description}</div>
                  </div>
                  <div className="btn-action">
                    <i
                      onClick={() =>
                        setToggle({ ...toggle, open: true, id: _id })
                      }
                      className="fa fa-edit"
                    />
                    <i className="fa fa-trash" />
                  </div>
                </div>
              </div>
            )
          )}
          <div className="education-item__add">
            <div className="education-card">
              <i className="fa fa-plus toggle_add" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationForm;

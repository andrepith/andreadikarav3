import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "src/store/actions";
import { getRangeYear } from "src/lib/Helpers";

interface expInterface {
  title: string;
  company: string;
  location: string;
  from: number;
  to: number;
  current: boolean;
  description: string[];
  url: string;
  _id: string;
}

const ExperienceForm = ({ bio }: any) => {
  return (
    <section>
      <div className="experience container">
        <div className="bio-section-title">Experience</div>
        <div className="experience-items">
          {bio.experience.map(
            ({
              title,
              company,
              location,
              from,
              to,
              current,
              description,
              url,
              _id,
            }: expInterface) => (
              <div className="experience-item" key={_id}>
                <div className="experience-card">
                  <div className="experience-card__header">
                    <h3>
                      {title} @{" "}
                      <a target="__blank" href={url}>
                        {company}
                      </a>
                    </h3>
                    <h4>{getRangeYear(from, to, current)}</h4>
                    <h4>{location}</h4>
                  </div>
                  <div className="experience-card__body">
                    {description.map((desc, index) =>
                      description.length > 1 ? (
                        <li key={index}>{desc}</li>
                      ) : (
                        <p key={index}>{desc}</p>
                      )
                    )}
                  </div>
                  <div className="experience-card__footer">
                    <button className="btn-delete">Delete</button>
                    <button className="btn-edit">Edit</button>
                  </div>
                </div>
              </div>
            )
          )}
          <div className="experience-item">
            <div className="experience-card__add">
              <i className="fa fa-plus" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceForm;

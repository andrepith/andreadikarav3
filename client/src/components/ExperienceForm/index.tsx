import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExperience } from "src/store/actions";
import { getRangeYear, removeEmpty } from "src/lib/Helpers";

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

const initialState = {
  title: "",
  company: "",
  location: "",
  from: 0,
  to: 0,
  current: false,
  description: [],
  url: "",
};

const ExperienceForm = ({ bio }: any) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({ open: false, id: "" });

  const Form = () => {
    const [formData, setFormData] = useState(initialState);
    const [descArr, setDescArr] = useState({ 0: "" });
    const [toDateDisabled, toggleDisabled] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { title, company, location, from, to, current, url } = formData;
    const onChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onAddExperience = async (e: any) => {
      e.preventDefault();
      await setDisabled(true);
      await dispatch(
        addExperience(
          removeEmpty({
            ...formData,
            from: Math.floor(new Date(formData.from).getTime() / 1000) * 1000,
            to: formData.current
              ? null
              : Math.floor(new Date(formData.to).getTime() / 1000) * 1000,
            description: !!Object.keys(descArr).length
              ? Object.values(descArr)
              : null,
          })
        )
      );
      setDisabled(false);
    };

    return (
      <form onSubmit={onAddExperience}>
        <div className="form-group">
          <input
            type="title"
            value={title}
            onChange={onChange}
            name="title"
            placeholder="Title"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="company"
            value={company}
            onChange={onChange}
            name="company"
            placeholder="Company"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="location"
            value={location}
            onChange={onChange}
            name="location"
            placeholder="Location"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={from}
            onChange={onChange}
            name="from"
            placeholder="Start Date"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={to}
            onChange={onChange}
            name="to"
            placeholder="End Date"
            disabled={toDateDisabled}
          />
        </div>
        <div className="form-group checkbox">
          <input
            type="checkbox"
            checked={current}
            onChange={() => {
              setFormData({ ...formData, current: !current });
              toggleDisabled(!toDateDisabled);
            }}
          />
          <label>I am currently working in this role</label>
        </div>
        <div className="form-group">
          <input
            type="url"
            value={url}
            onChange={onChange}
            name="url"
            placeholder="Company Website"
          />
        </div>
        <label>Work done</label>
        <div className="form-group">
          {Object.values(descArr).map((desc, key) => (
            <div key={key} className="desc-item">
              <input
                value={desc}
                onChange={(e) =>
                  setDescArr({ ...descArr, [key]: e.target.value })
                }
              />
              <i
                onClick={() =>
                  // @ts-ignore
                  setDescArr(removeEmpty({ ...descArr, [key]: null }))
                }
                className="fa fa-square-minus"
              />
            </div>
          ))}
        </div>
        <div className="form-group">
          <div className="add-desc-button">
            <i
              onClick={() =>
                setDescArr({ ...descArr, [Object.keys(descArr).length]: "" })
              }
              className="fa fa-square-plus"
            />
            <div>Add more work</div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            {disabled ? "Adding..." : "Add Experience"}
          </button>
          <button
            onClick={() => setToggle({ ...toggle, open: false, id: "" })}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

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
            {toggle.open && !toggle.id ? (
              <div className="experience-card__add">
                <Form />
              </div>
            ) : (
              <div
                className="experience-card__add"
                onClick={() => setToggle({ ...toggle, open: true, id: "" })}
              >
                <i className="fa fa-plus toggle_add" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceForm;

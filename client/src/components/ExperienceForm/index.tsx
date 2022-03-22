import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sortBy, remove } from "lodash";
import {
  addExperience,
  deleteExperience,
  updateExperience,
} from "src/store/actions";
import {
  getRangeYear,
  removeEmpty,
  htmlDateToUnix,
  htmlDateFormat,
} from "src/lib/Helpers";

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

  const Form = ({ id = "", edit = false }: { id?: string; edit?: boolean }) => {
    const [formData, setFormData] = useState(initialState);
    const [descArr, setDescArr] = useState([""]);
    const [toDateDisabled, toggleDisabled] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { title, company, location, from, to, current, url } = formData;
    const onChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onAddExperience = async (e: any) => {
      e.preventDefault();
      await setDisabled(true);
      const sendData = await removeEmpty({
        ...formData,
        from: htmlDateToUnix(formData.from),
        to: formData.current ? null : htmlDateToUnix(formData.to),
        description: !!Object.keys(descArr).length
          ? Object.values(descArr)
          : null,
      });
      if (edit) {
        await dispatch(updateExperience(sendData, id));
      } else {
        await dispatch(addExperience(sendData));
      }
      setDisabled(false);
      setToggle({ ...toggle, open: false, id: "" });
    };

    useEffect(() => {
      if (edit) {
        const currentExp = bio.experience.filter(
          (exp: { _id: string }) => exp._id === id
        )[0];
        setFormData({
          ...currentExp,
          from: htmlDateFormat(currentExp.from),
          to: currentExp.current ? null : htmlDateFormat(currentExp.to),
        });
        setDescArr(currentExp.description);
        toggleDisabled(currentExp.current);
      }
    }, [edit, id]);

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
          {descArr.map((desc: string, key: number) => (
            <div key={key} className="desc-item">
              <input
                value={desc}
                onChange={(e) => {
                  const temp = descArr.slice();
                  temp[key] = e.target.value;
                  setDescArr(temp);
                }}
              />
              <i
                onClick={() =>
                  setDescArr(
                    remove([...descArr], (item) => item !== descArr[key])
                  )
                }
                className="fa fa-square-minus"
              />
            </div>
          ))}
        </div>
        <div className="form-group">
          <div className="add-desc-button">
            <i
              onClick={() => setDescArr([...descArr, ""])}
              className="fa fa-square-plus"
            />
            <div>Add more work</div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            {disabled
              ? edit
                ? "Updating"
                : "Adding..."
              : edit
              ? "Update Experience"
              : "Add Experience"}
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
          {sortBy(bio.experience, ["from"]).map(
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
                {toggle.open && toggle.id === _id ? (
                  <div className="experience-card__add">
                    <Form id={_id} edit={true} />
                  </div>
                ) : (
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
                      <i
                        className="fa fa-trash"
                        onClick={() => dispatch(deleteExperience(_id))}
                      />
                      <i
                        className="fa fa-edit"
                        onClick={() =>
                          setToggle({ ...toggle, open: true, id: _id })
                        }
                      />
                    </div>
                  </div>
                )}
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

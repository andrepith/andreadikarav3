import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRangeYear, htmlDateToUnix, htmlDateFormat } from "src/lib/Helpers";
import {
  addEducation,
  deleteEducation,
  updateEducation,
} from "src/store/actions";

interface eduInterface {
  _id: string;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: number;
  to: number;
  description: string;
}

const initialState = {
  school: "",
  degree: "",
  fieldofstudy: "",
  from: 0,
  to: 0,
  description: "",
};

const EducationForm = ({ bio }: any) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({ open: false, id: "" });

  const Form = ({ id = "", edit = false }: { id?: string; edit?: boolean }) => {
    const [formData, setFormData] = useState(initialState);
    const { school, degree, fieldofstudy, from, to, description } = formData;
    const [disabled, setDisabled] = useState(false);
    const onChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onAddEducation = async (e: any) => {
      e.preventDefault();
      await setDisabled(true);
      const sendData = await {
        ...formData,
        from: htmlDateToUnix(formData.from),
        to: htmlDateToUnix(formData.to),
      };
      if (edit) {
        await dispatch(updateEducation(sendData, id));
      } else {
        await dispatch(addEducation(sendData));
      }
      setDisabled(false);
      setToggle({ ...toggle, open: false, id: "" });
    };

    useEffect(() => {
      if (edit) {
        const currentEdu = bio.education.filter(
          (exp: { _id: string }) => exp._id === id
        )[0];

        setFormData({
          ...currentEdu,
          from: htmlDateFormat(currentEdu.from),
          to: htmlDateFormat(currentEdu.to),
        });
      }
    }, [edit, id]);

    return (
      <form onSubmit={onAddEducation}>
        <div className="form-group">
          <input
            type="text"
            value={school}
            onChange={onChange}
            name="school"
            placeholder="School Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={degree}
            onChange={onChange}
            name="degree"
            placeholder="Degree"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={fieldofstudy}
            onChange={onChange}
            name="fieldofstudy"
            placeholder="Field of Study"
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
          />
        </div>
        <div className="form-group">
          <textarea
            value={description}
            onChange={onChange}
            name="description"
            placeholder="Description"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            {disabled
              ? edit
                ? "Updating"
                : "Adding..."
              : edit
              ? "Update Education"
              : "Add Education"}
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
              <div key={_id}>
                <div className="education-item">
                  {toggle.open && toggle.id === _id ? (
                    <div className="education-card">
                      <Form id={_id} edit />
                    </div>
                  ) : (
                    <div className="education-card">
                      <div className="education-wrapper">
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
                          <i
                            onClick={() => dispatch(deleteEducation(_id))}
                            className="fa fa-trash"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
          <div className="education-item__add">
            {toggle.open && !toggle.id ? (
              <div className="education-card">
                <Form />
              </div>
            ) : (
              <div className="education-item__last">
                <div
                  className="education-card"
                  onClick={() => setToggle({ ...toggle, open: true, id: "" })}
                >
                  <i className="fa fa-plus toggle_add" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationForm;

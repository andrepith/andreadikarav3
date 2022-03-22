import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSkills, deleteSkills, updateSkills } from "src/store/actions";

interface skillInterface {
  _id: string;
  name: string;
  image: string;
  link: string;
}

const SkillForm = ({ bio }: any) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({ open: false, id: "" });

  const Form = ({ id = "", edit = false }: { id?: string; edit?: boolean }) => {
    const [formData, setFormData] = useState({ name: "", image: "", link: "" });
    const { name, image, link } = formData;
    const [disabled, setDisabled] = useState(false);
    const onChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onAddSkill = async (e: any) => {
      e.preventDefault();
      await setDisabled(true);
      if (edit) {
        await dispatch(updateSkills(formData, id));
      } else {
        await dispatch(addSkills(formData));
      }
      setDisabled(false);
      setToggle({ ...toggle, open: false, id: "" });
    };

    useEffect(() => {
      if (edit) {
        setFormData(
          bio.skillset.filter((soc: { _id: string }) => soc._id === id)[0]
        );
      }
    }, [edit, id]);

    return (
      <form onSubmit={onAddSkill}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={onChange}
            name="name"
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={image}
            onChange={onChange}
            name="image"
            placeholder="Image Link"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={link}
            onChange={onChange}
            name="link"
            placeholder="Skill Website"
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
              ? "Update Skills"
              : "Add Skills"}
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
      <div className="skillform container">
        <div className="bio-section-title">Skills</div>
        <div className="skillform__items">
          {bio.skillset.map(({ _id, name, image, link }: skillInterface) => (
            <div className="skillform__item" key={_id}>
              <div className="skillform-card">
                {toggle.open && toggle.id === _id ? (
                  <div className="skillform-wrapper">
                    <Form id={_id} edit />
                  </div>
                ) : (
                  <>
                    <div className="skillform__image">
                      <Image src={image} alt={`${name}-image`} layout="fill" />
                    </div>
                    <div className="btn-action">
                      <i
                        onClick={() =>
                          setToggle({ ...toggle, open: true, id: _id })
                        }
                        className="fa fa-edit"
                      />
                      <i
                        onClick={() => dispatch(deleteSkills(_id))}
                        className="fa fa-trash"
                      />
                      <a href={link} target="__blank">
                        <i className="fa fa-arrow-right-from-bracket" />
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div className="skillform__item">
            {toggle.open && !toggle.id ? (
              <div className="skillform-card">
                <div className="skillform-wrapper">
                  <Form />
                </div>
              </div>
            ) : (
              <div
                onClick={() => setToggle({ ...toggle, open: true, id: "" })}
                className="skillform-card__add"
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

export default SkillForm;

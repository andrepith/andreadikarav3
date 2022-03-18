import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "src/store/reducers";
import { addSocial, deleteSocial } from "src/store/actions";

const SocialForm = () => {
  const dispatch = useDispatch();
  const bio = useSelector((state: IRootState) => state.bio.bio);
  const [toggleAdd, setToggleAdd] = useState(false);

  const Form = () => {
    const [formData, setFormData] = useState({ name: "", url: "" });
    const [disabled, setDisabled] = useState(false);
    const { name, url } = formData;
    const onChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onAddSocial = async (e: any) => {
      e.preventDefault();
      await setDisabled(true);
      await dispatch(addSocial(formData));
      setDisabled(false);
      setToggleAdd(false);
    };
    return (
      <form onSubmit={onAddSocial}>
        <div className="form-group">
          <input
            type="name"
            value={name}
            onChange={onChange}
            name="name"
            placeholder="Social Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="url"
            value={url}
            onChange={onChange}
            name="url"
            placeholder="URL"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            {disabled ? "Adding..." : "Add social"}
          </button>
          <button onClick={() => setToggleAdd(false)} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </form>
    );
  };
  return (
    <section>
      <div className="social container">
        <div className="bio-section-title">Socials</div>
        <div className="social-items">
          {bio &&
            bio?.social &&
            bio?.social?.map(
              (soc: { _id: string; name: string; url: string }) => (
                <div className="social-item" key={soc._id}>
                  <div>
                    <i className={`fa fa-${soc.name.toLowerCase()}`}></i>
                    {soc.name}
                  </div>
                  <div className="btn-action">
                    <button className="btn-edit">Edit</button>
                    <button
                      onClick={() => dispatch(deleteSocial(soc._id))}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                    <button className="btn-visit">
                      <a href={soc.url} target="__blank">
                        Visit
                      </a>
                    </button>
                  </div>
                </div>
              )
            )}
          <div className="social-item">
            {toggleAdd ? (
              <Form />
            ) : (
              <div
                onClick={() => setToggleAdd(true)}
                className="add-social-button"
              >
                <i className="fa fa-plus" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialForm;

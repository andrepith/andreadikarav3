import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSocial, deleteSocial, updateSocial } from "src/store/actions";

const SocialForm = ({ bio }: any) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({ open: false, id: "" });

  const Form = ({ id = "", edit = false }: { id?: string; edit?: boolean }) => {
    const [formData, setFormData] = useState({ name: "", url: "" });
    const [disabled, setDisabled] = useState(false);
    const onChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onAddSocial = async (e: any) => {
      e.preventDefault();
      await setDisabled(true);
      if (edit) {
        await dispatch(updateSocial(formData, id));
      } else {
        await dispatch(addSocial(formData));
      }

      setDisabled(false);
      setToggle({ ...toggle, open: false, id: "" });
    };

    const { name, url } = formData;

    useEffect(() => {
      if (edit) {
        setFormData(
          bio.social.filter((soc: { _id: string }) => soc._id === id)[0]
        );
      }
    }, [edit, id]);

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
            {disabled
              ? edit
                ? "Updating"
                : "Adding..."
              : edit
              ? "Update Social"
              : "Add social"}
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
      <div className="social container">
        <div className="bio-section-title">Socials</div>
        <div className="social-items">
          {[...bio.social]
            .reverse()
            .map((soc: { _id: string; name: string; url: string }) => (
              <div key={soc._id}>
                <div className="social-item">
                  {toggle.open && toggle.id === soc._id ? (
                    <Form id={soc._id} edit={true} />
                  ) : (
                    <>
                      <div>
                        <i className={`fa fa-${soc.name.toLowerCase()}`}></i>
                        {soc.name}
                      </div>
                      <div className="btn-action">
                        <i
                          onClick={() =>
                            setToggle({ ...toggle, open: true, id: soc._id })
                          }
                          className="fa fa-edit"
                        ></i>
                        <i
                          onClick={() => dispatch(deleteSocial(soc._id))}
                          className="fa fa-trash"
                        ></i>
                        <a href={soc.url} target="__blank">
                          <i className="fa fa-arrow-right-from-bracket" />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          <div className="social-item__add">
            {toggle.open && !toggle.id ? (
              <Form />
            ) : (
              <div
                onClick={() => setToggle({ ...toggle, open: true, id: "" })}
                className="add-social-button"
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

export default SocialForm;

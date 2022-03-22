import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addPortofolio,
  deletePortofolio,
  updatePortofolio,
} from "src/store/actions";

interface portofolioInterface {
  _id: string;
  url: string;
  image: string;
  alt: string;
  name: string;
  type: string;
}

const initialState = {
  url: "",
  image: "",
  alt: "",
  name: "",
  type: "",
};

const PortofolioForm = ({ bio }: any) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({ open: false, id: "" });

  const Form = ({ id = "", edit = false }: { id?: string; edit?: boolean }) => {
    const [formData, setFormData] = useState(initialState);
    const { url, image, alt, name, type } = formData;
    const [disabled, setDisabled] = useState(false);
    const onChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onAddSkill = async (e: any) => {
      e.preventDefault();
      await setDisabled(true);
      if (edit) {
        await dispatch(updatePortofolio(formData, id));
      } else {
        await dispatch(addPortofolio(formData));
      }
      setDisabled(false);
      setToggle({ ...toggle, open: false, id: "" });
    };

    useEffect(() => {
      if (edit) {
        setFormData(
          bio.portofolio.filter((item: { _id: string }) => item._id === id)[0]
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
            value={url}
            onChange={onChange}
            name="url"
            placeholder="URL"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={type}
            onChange={onChange}
            name="type"
            placeholder="Type"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={image}
            onChange={onChange}
            name="image"
            placeholder="Image src"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={alt}
            onChange={onChange}
            name="alt"
            placeholder="Image alt"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            {disabled
              ? edit
                ? "Updating"
                : "Adding..."
              : edit
              ? "Update Portofolio"
              : "Add Portofolio"}
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
      <div className="portofolio container">
        <div className="bio-section-title">Portofolio</div>
        <div className="portofolio-items">
          {bio.portofolio.map(
            ({ _id, url, image, name, type }: portofolioInterface) => (
              <div className="portofolio-item" key={_id}>
                <div className="portofolio-card">
                  {toggle.open && toggle.id === _id ? (
                    <div className="portofolio-wrapper">
                      <Form id={_id} edit />
                    </div>
                  ) : (
                    <>
                      <div>{name}</div>
                      <div>{type}</div>
                      <div className="btn-action">
                        <a href={image} target="__blank">
                          <i className="fa fa-image" />
                        </a>
                        <i
                          onClick={() =>
                            setToggle({ ...toggle, open: true, id: _id })
                          }
                          className="fa fa-edit"
                        />
                        <i
                          onClick={() => dispatch(deletePortofolio(_id))}
                          className="fa fa-trash"
                        />
                        <a href={url} target="__blank">
                          <i className="fa fa-arrow-right-from-bracket" />
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          )}
          <div className="portofolio-item__add">
            {toggle.open && !toggle.id ? (
              <div className="portofolio-card">
                <div className="portofolio-wrapper">
                  <Form />
                </div>
              </div>
            ) : (
              <div
                className="portofolio-card"
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

export default PortofolioForm;

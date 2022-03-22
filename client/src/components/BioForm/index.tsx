import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBio, updateBio } from "src/store/actions";
import { htmlDateFormat } from "@/lib/Helpers";

const initialState = {
  firstName: "",
  lastName: "",
  birthName: "",
  birthDate: 0,
  birthPlace: "",
  city: "",
  country: "",
  nationality: "",
  email: "",
  phone: "",
  resumeLink: "",
  jobTitle: "",
  aboutMe: "",
};

const BioForm = ({ bio }: any) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const {
    firstName,
    lastName,
    birthName,
    birthDate,
    birthPlace,
    city,
    country,
    nationality,
    email,
    phone,
    resumeLink,
    jobTitle,
    aboutMe,
  } = formData;

  useEffect(() => {
    if (!bio) dispatch(getBio());

    if (bio) {
      const bioData = { ...initialState };
      for (const key in bio) {
        // @ts-ignore
        if (key in bioData) bioData[key] = bio[key];
      }
      if (Array.isArray(bioData.jobTitle))
        bioData.jobTitle = bioData.jobTitle.join(", ");

      if (!isNaN(bioData.birthDate)) {
        // @ts-ignore
        bioData.birthDate = htmlDateFormat(bioData.birthDate * 1000);
      }
      setFormData(bioData);
    }
  }, [bio, dispatch]);

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await setDisabled(true);
    await dispatch(
      updateBio({
        ...formData,
        birthDate: Math.floor(new Date(formData.birthDate).getTime() / 1000),
      })
    );
    setDisabled(false);
  };

  return (
    <section>
      <form className="container bio" onSubmit={onSubmit}>
        <div className="bio-section-title">Edit Bio</div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="firstName"
            value={firstName}
            onChange={onChange}
            name="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="lastName"
            value={lastName}
            onChange={onChange}
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label>Birth Name</label>
          <input
            type="birthName"
            value={birthName}
            onChange={onChange}
            name="birthName"
            placeholder="Birth Name"
          />
        </div>
        <div className="form-group">
          <label>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={birthDate}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Birth Place</label>
          <input
            type="birthPlace"
            value={birthPlace}
            onChange={onChange}
            name="birthPlace"
            placeholder="Birth Place"
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="city"
            value={city}
            onChange={onChange}
            name="city"
            placeholder="City"
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input
            type="country"
            value={country}
            onChange={onChange}
            name="country"
            placeholder="Country"
          />
        </div>
        <div className="form-group">
          <label>Nationality</label>
          <input
            type="nationality"
            value={nationality}
            onChange={onChange}
            name="nationality"
            placeholder="Nationality"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={onChange}
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="phone"
            value={phone}
            onChange={onChange}
            name="phone"
            placeholder="Phone"
          />
        </div>
        <div className="form-group">
          <label>Resume Link</label>
          <input
            type="resumeLink"
            value={resumeLink}
            onChange={onChange}
            name="resumeLink"
            placeholder="Resume Link"
          />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="jobTitle"
            value={jobTitle}
            onChange={onChange}
            name="jobTitle"
            placeholder="Job Title"
          />
        </div>
        <div className="form-group">
          <label>About Me</label>
          <textarea value={aboutMe} onChange={onChange} name="aboutMe" />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary dashboard-button"
            value={disabled ? "Submiting..." : "Update Bio"}
            disabled={disabled}
          />
        </div>
      </form>
    </section>
  );
};

export default BioForm;

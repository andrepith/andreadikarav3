import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuth from "@/components/HOC/WithAuth";
import { getBio } from "src/store/actions";
import { IRootState } from "src/store/reducers";
import { htmlDateFormat } from "@/lib/Helpers";

const Dashboard = () => {
  const dispatch = useDispatch();
  const bio = useSelector((state: IRootState) => state.bio.bio);
  const [formData, setFormData] = useState({
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
  });

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
    dispatch(getBio());
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      ...bio,
      birthDate: htmlDateFormat(bio.birthDate * 1000),
    });
  }, [bio]);

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="wrapper">
      <form className="container dashboard">
        <div className="dashboard-title">Edit Bio</div>
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
      </form>
    </section>
  );
};

export default withAuth(Dashboard);

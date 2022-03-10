import { useState } from "react";
import { send } from "emailjs-com";
import swal from "sweetalert";

const Contact = () => {
  const [toSend, setToSend] = useState({
    name: "",
    user_email: "",
    email: "andrepith@yahoo.co.uk",
    message: "",
  });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await setDisabled(true);
    send(
      "service_ci5frc8",
      "template_3r84lvn",
      toSend,
      "user_gSB2xeGoAkU0AKCCBbfcw"
    )
      .then(() => swal("Success", "I will get back to you shortly!", "success"))
      .then(() =>
        setToSend({ ...toSend, name: "", user_email: "", message: "" })
      )
      .catch((err) => {
        console.error(err);
        swal(
          "Error",
          "There's something wrong!!, alternatively, you can send me an email at andrepith@yahoo.co.uk",
          "error"
        );
      })
      .finally(() => setDisabled(false));
  };

  const handleChange = (e: any) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <section className="justify-content-start contact" id="contact">
      <div className="container">
        <h2 className="section-title text-center">Get In Touch.</h2>
        <form className="contact-form" onSubmit={onSubmit}>
          <input
            className="contact-input"
            type="text"
            name="name"
            placeholder="Name"
            required
            value={toSend.name}
            onChange={handleChange}
          />
          <input
            className="contact-input"
            type="email"
            name="user_email"
            placeholder="Email"
            required
            value={toSend.user_email}
            onChange={handleChange}
          />
          <textarea
            className="contact-textarea"
            name="message"
            placeholder="Message"
            required
            value={toSend.message}
            onChange={handleChange}
            rows={5}
          />
          <button className="contact-submit" type="submit" disabled={disabled}>
            {disabled ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

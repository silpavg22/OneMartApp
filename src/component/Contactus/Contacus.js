import contactImage from "./../../asset/icons/contact.svg";
import React, { useEffect, useState } from "react";
import { sentcontactus } from "../../services/loginService";
import { alertMessage, getBase64 } from "../../util/util";


const Contacus = () => {

  const [values, setValues] = useState({
    email: "",
    name: "",
    message: ""
  });

  const handleContactus = async (event) => {
    const res = await sentcontactus(values);
    if (res) {
      alertMessage("Message sent successfully..!!!");
    }
  };

  const handleChange = (event, prop) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div id="contact" style={{ backgroundColor: "#232659" }}>
      <div className="contact-container">
        <div className="contact-item">
          <img src={contactImage} alt="" />
        </div>
        <div className="contact-item">
          <div className="contact-header text-center">
            <div className="h3" style={{ color: "white" }}>
              Contact Form
            </div>
          </div>
          <div className="contact-form">
            <form action="#0">
              <div className="form-control">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  required
                  placeholder="Name"
                  onChange={(e) => handleChange(e, "name")}
                />
                <label for="name">Name</label>
              </div>

              <div className="form-control">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={values.email}
                  onChange={(e) => handleChange(e, "email")}
                  pattern="(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"
                />
                <label for="email">Email Address</label>
                <div className="requirements">
                  Must be a valid email address.
                </div>
              </div>

              <div className="form-control">
                <textarea
                  id="message"
                  type="text"
                  placeholder="Message"
                  value={values.message}
                  onChange={(e) => handleChange(e, "message")}
                  style={{ height: "10rem" }}
                ></textarea>
                <label for="password">Message</label>
                <div className="requirements">Message is required.</div>
              </div>

              <input type="submit" value="Sign Up"  onClick={handleContactus}/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacus;

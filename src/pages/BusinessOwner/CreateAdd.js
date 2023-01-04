import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoadingButton from "../../common/LoadingButton";
import { registerAdd } from "../../services/addService";
import { alertMessage, getBase64 } from "../../util/util";

const CreateAdd = () => {
  const [values, setValues] = useState({
    addname: "",
    adddescription: "",
    addownerid: "",
    addimage: "",
    id:""
  });

  const [picture, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    let formData=new FormData();
    getAllData(formData)
    const res = await registerAdd(formData);
    setLoading(false);
    alertMessage(res?.message);
    if (res?.success) {
      navigate("../");
    }
  };

  const handleChange = (event, prop) => {
    let val = event.target.value;
    if (prop === "price") val = parseFloat(event.target.value);
    setValues({ ...values, [prop]: val });
  };
  
  const handleImage = (event, prop) => {
    setImage({[prop]: event.target.files[0] });
};
  const getAllData=(formData)=>{
    formData.append("id",values.id)
    formData.append("addname",values.addname)
    formData.append("adddescription",values.adddescription)
    formData.append("addimage",picture.addimage)
    formData.append("addownerid",localStorage.getItem('user_id'))

  }

  return (
    <section style={{ backgroundColor: "#232659" }}>
      <div className="login-container py-5 h-100">
        <div className="login-card" style={{ borderRadius: "1rem" }}>
          <div className="card-stack">
            <div className="card-item">
              <object
                data="/app/asset/icons/login.svg"
                type="image/svg+xml"
                style={{ width: "100%" }}
              ></object>
            </div>
            <div className="card-item">
              <div className="card-body p-4 p-lg-5 text-black">
                <form enctype="multipart/form-data">
                  <div className="heading">
                    <span className="h1 fw-bold mb-0">
                      Create New Advertisement
                    </span>
                  </div>

                  <div className="form-control">
                    <input
                      value={values.name}
                      onChange={(e) => handleChange(e, "addname")}
                      type="text"
                      id="form2Example17"
                      className=""
                      placeholder="Enter the Ad name here..."
                    />
                    <label className="form-label">Ad Name</label>
                  </div>
                  <div className="form-control">
                    <input
                      value={values.adddescription}
                      onChange={(e) => handleChange(e, "adddescription")}
                      type="text"
                      id="form2Example27"
                      className=""
                      placeholder="Enter the Ad description here.."
                    />
                    <label className="form-label" for="form2Example27">
                      Ad Description
                    </label>
                  </div>

                  <div className="form-control">
                    <input
                      onChange={(e) => handleImage(e, "addimage")}
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      placeholder="Upload Ad Image.."
                    />
                    <label className="form-label" for="form2Example27">
                      Ad Image
                    </label>
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <LoadingButton loading={loading} onClick={handleSubmit}>
                      Submit
                    </LoadingButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAdd;

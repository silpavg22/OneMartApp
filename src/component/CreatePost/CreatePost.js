import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoadingButton from "../../common/LoadingButton";
import { createPosts } from "../../services/postService";
import { alertMessage, getBase64 } from "../../util/util";

const CreateAdd = () => {
  const [values, setValues] = useState({
    posttitle: "",
    postdescription: "",
    postimage: "",
    id:""
  });

  const [picture, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    let formData=new FormData();
    getAllData(formData)
    const res = await createPosts(formData);
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
    formData.append("posttitle",values.posttitle)
    formData.append("postdescription",values.postdescription)
    formData.append("postimage",picture.postimage)
    formData.append("postuserid",localStorage.getItem('user_id'))

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
                      Create New Post
                    </span>
                  </div>

                  <div className="form-control">
                    <input
                      value={values.posttitle}
                      onChange={(e) => handleChange(e, "posttitle")}
                      type="text"
                      id="form2Example17"
                      className=""
                      placeholder="Enter the Post Title here..."
                    />
                    <label className="form-label">Post Title</label>
                  </div>
                  <div className="form-control">
                    <input
                      value={values.postdescription}
                      onChange={(e) => handleChange(e, "postdescription")}
                      type="text"
                      id="form2Example27"
                      className=""
                      placeholder="Enter the Post description here.."
                    />
                    <label className="form-label" for="form2Example27">
                      Post Description
                    </label>
                  </div>

                  <div className="form-control">
                    <input
                      onChange={(e) => handleImage(e, "postimage")}
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      placeholder="Upload Post Image.."
                    />
                    <label className="form-label" for="form2Example27">
                      Post Image
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

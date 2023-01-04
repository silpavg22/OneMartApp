import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoadingButton from "../../common/LoadingButton";
import { registerProduct } from "../../services/productService";
import { alertMessage, getBase64 } from "../../util/util";

const CreateProduct = () => {
  const [values, setValues] = useState({
    productname: "",
    price: "",
    productdescription: "",
    id: "",
    productimage: "",
  });

  const getAllData=(formData)=>{
    formData.append("id",values.id)
    formData.append("productname",values.productname)
    formData.append("price",values.price)
    formData.append("productdescription",values.productdescription)
    formData.append("productimage",picture.productimage)
    formData.append("productownerid",localStorage.getItem('user_id'))

  }

  const [picture, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    let formData=new FormData();
    getAllData(formData)
    const res = await registerProduct(formData);
    setLoading(true);
    alertMessage(res?.message);
    if (res?.success) {
      navigate("../");
    }
  };


  const handleImage = (event, prop) => {
    setImage({[prop]: event.target.files[0] });
};

  const handleChange = (event, prop) => {
    let val = event.target.value;
    if (prop === "price") val = parseFloat(event.target.value);
    setValues({ ...values, [prop]: val });
  };

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
                <form  enctype="multipart/form-data">
                  <div className="heading">
                    <span className="h1 fw-bold mb-0">Sell Product</span>
                  </div>

                  <div className="form-control">
                    <input
                      value={values.productname}
                      onChange={(e) => handleChange(e, "productname")}
                      type="text"
                      id="form2Example17"
                      className=""
                      placeholder="Enter the product name here..."
                    />
                    <label className="form-label">Product Name</label>
                  </div>

                  <div className="form-control">
                    <input
                      value={values.price}
                      onChange={(e) => handleChange(e, "price")}
                      type="text"
                      id="form2Example27"
                      className=""
                      placeholder="Enter the price here.."
                    />
                    <label className="form-label" for="form2Example27">
                      Price
                    </label>
                  </div>
                  <div className="form-control">
                    <input
                      value={values.productdescription}
                      onChange={(e) => handleChange(e, "productdescription")}
                      type="text"
                      id="form2Example27"
                      className=""
                      placeholder="Enter the description here.."
                    />
                    <label className="form-label" for="form2Example27">
                      Product Description
                    </label>
                  </div>

                  <div className="form-control">
                    <input
                      onChange={(e) => handleImage(e, "productimage")}
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      placeholder="Upload Product Image.."
                    />
                    <label className="form-label" for="form2Example27">
                      Product Image
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

export default CreateProduct;

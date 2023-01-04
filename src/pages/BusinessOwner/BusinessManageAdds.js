import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../common/Loading";
import Sidebar from "../../component/Sidebar/Sidebar";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllAddsById,deleteAdds } from "../../services/addService";
import { Link } from "react-router-dom";
import { hostName } from "../../constants/ApiEndPoints";
import { alertMessage, getBase64 } from "../../util/util";

const Adds = () => {
  const [adds, setAdds] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await getAllAddsById(localStorage.getItem("user_id"));
      if (res) setDataLoading(false);
      setAdds(ownerProduct(res));
    }
    fetchData();
  }, []);

  const ownerProduct = (obj) => obj.map((product) => product);
  const canDelete = () =>
   localStorage.getItem("user_role") === "businessowner" 
  


  const onDeleteAdd = async (add) => {
    const newList = adds.filter((item) => item.id !== add.id);
    setDataLoading(true);
    const res = await deleteAdds(add.id);
    setDataLoading(false);
    alertMessage(res?.message);
    setAdds(newList);
  };

  return (
    <section
      className="vh-500 product_bo"
      style={{ backgroundColor: "#232659" }}
    >
      <Sidebar />
      <div className="wrapper">
        <div className="cart">
          <div className="cartproducts">
            <h1>Explore Adds</h1>
            <Loading height={130} isLoading={dataLoading} count={3}>
              {adds.map((item) => (
                <div className="product">
                  <div className="pdt_img">
                  <img src={item.addimage?hostName+"/"+item.addimage
                        : "/app/asset/images/default-post.png"} alt="ok" />
                  </div>
                  <div className="description">
                    <h2>{item.addname}</h2>
                    <h5>{item.adddescription}</h5>
                    {canDelete() && (
                    <p className="btn-remove" onClick={() => onDeleteAdd(item)}>
                      {" "}
                      <span className="btn2">Delete</span>
                    </p>
                  )}
                  </div>
                </div>
              ))}
            </Loading>
          </div>
        </div>
        <div>
        {canDelete() && (
          <Link to="create" className="view-more create-new">
            Create
          </Link>)}
        </div>
      </div>
    </section>
  );
};

export default Adds;

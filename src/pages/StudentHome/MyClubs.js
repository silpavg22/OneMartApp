import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../common/Loading";
import Sidebar from "../../component/Sidebar/Sidebar";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllClubsById,deleteClub } from "../../services/clubService";
import { Link } from "react-router-dom";
import {  hostName } from "../../constants/ApiEndPoints";
import { alertMessage } from "../../util/util";

const Products = () => {
  const [clubs, setClubs] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllClubsById(localStorage.getItem("user_id"));
      if (res) setDataLoading(false);
      setClubs(res);
    }
    fetchData();
  }, []);

  const ownerProduct = (clubs) => clubs.map((product) => product);

  const onDelete = async (club) => {
    const newList = clubs.filter((item) => item.id !== club.id);
    setDataLoading(true);
    const res = await deleteClub(club);
    setDataLoading(false);
    alertMessage(res?.message);
    setClubs(newList);
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
            <h1>My Clubs</h1>
            <Loading height={130} isLoading={dataLoading} count={3}>
              {ownerProduct(clubs).map((item, index) => (
                <div className="product">
                  <div className="pdt_img">
                  <img src={item.clubimage?hostName+"/"+item.clubimage
                        : "/app/asset/images/default-post.png"} alt="ok" />
                  </div>
                  <div className="description">
                    <h2>{item.clubname}</h2>
                    <h5>{item.clubdescription}</h5>
                    <p className="btn-remove" onClick={() => onDelete(item)}>
                      {" "}
                      <span className="btn2">Delete</span>
                    </p>
                  </div>
                </div>
              ))}
            </Loading>
            <div>
              <Link to="../clubs/create" className="view-more create-new">
                Add new
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

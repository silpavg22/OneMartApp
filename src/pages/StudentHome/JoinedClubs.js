import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import Sidebar from "../../component/Sidebar/Sidebar";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
import {
  getAllJoinedClubs,
  getAllJoinedClubsById,
} from "../../services/joinedService";
import { getAllClubs } from "../../services/clubService";
import { leaveClub } from "../../services/joinedService";
import { addPostSvc, hostName } from "../../constants/ApiEndPoints";
import { alertMessage } from "../../util/util";


const JoinedClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [joined, setJoined] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let res = await getAllJoinedClubsById(localStorage.getItem("user_id"));
      setJoined(res);
      if(res?.status){
        alertMessage(res.message)
      }
      res = await getAllClubs();
      setClubs(res);
      setDataLoading(false);
    }
    fetchData();
  }, []);

  const ownerClubs = (clubs) => clubs.map((club) => club);

  const onLeave = async (club) => {
    const newList = joined.filter((item) => item.id !== club.id);
    const res = await leaveClub({
      userid: localStorage.getItem("user_id"),
      clubid: club.id,
    });
    setJoined(newList);
    if(res?.status){
      alertMessage(res.message)
    }
  };



  // const getClubsByJoined = () => {
  //   let finalJoinedClubs = [];
  //   joined?.forEach((order) => {
  //     clubs?.forEach((club) => {
  //       if (`${club.id}` === order.acf.clubid) {
  //         finalJoinedClubs.push({ ...club, date: order?.date });
  //       }
  //     });
  //   });
  //   return finalJoinedClubs;
  // };

  return (
    <section
      className="vh-500 product_bo"
      style={{ backgroundColor: "#232659" }}
    >
      <Sidebar />
      <div className="wrapper">
        <div className="cart">
          <div className="cartproducts">
            <h1>Joined Clubs</h1>
            <Loading height={130} isLoading={dataLoading} count={3}>
              {joined.map((item) => (
                <div className="product">
                  <div className="pdt_img">
                  <img src={item.clubimage?hostName+"/"+item.clubimage
                        : "/app/asset/images/default-post.png"} alt="ok" />
                  </div>
                  <div className="description">
                    <h2>{item.clubname}</h2>
                    <h5>{item.clubdescription}</h5>
                    <p className="btn-remove">
                      {" "}
                      <span className="btn2" onClick={() => onLeave(item)}>Leave</span>
                    </p>
                  </div>
                </div>
              ))}
            </Loading>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinedClubs;

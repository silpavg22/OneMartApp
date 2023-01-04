import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllClubs,deleteClub } from "../../services/clubService";
import LoadingButton from "../../common/LoadingButton";
import { Link } from "react-router-dom";
import { joinClub } from "../../services/joinedService";
import { hostName} from "../../constants/ApiEndPoints";
import { alertMessage } from "../../util/util";


const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const dispatch = useDispatch();

  const onDelete = async (club) => {
    const newList = clubs.filter((item) => item.id !== club.id);
    setDataLoading(true);
    const res = await deleteClub(club);
    setDataLoading(false);
    alertMessage(res?.message);
    setClubs(newList);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getAllClubs();
      if (res) setDataLoading(false);
      setClubs(res);
    }
    fetchData();
  }, []);

  const canDelete = (item) =>
    localStorage.getItem("user_role") === "superadmin" ||
    localStorage.getItem("user_role") === "schooladmin" ||
    item.clubownerid == localStorage.getItem("user_id");

  const canJoin = (item) => localStorage.getItem("user_role") === "student";

  const onJoined = async (club) => {
    const newList = clubs.filter((item) => item.id !== club.id);
    const res = await joinClub({
      userid: localStorage.getItem("user_id"),
      clubid: club.id,
    });
    if(res?.status){
      alertMessage(res.message)
    }
    setClubs(newList)

  };

  const allProducts = (clubs) => clubs.map((club) => club.acf);

  return (
    <section
      className="product_bo managePosts"
      style={{ backgroundColor: "#232659" }}
    >
      <div className="wrapper">
        <h1>Clubs</h1>
        <div className="cart">
          <div className="cartproducts">
            {clubs?.map((item, index) => (
              <div className="product" key={item.id}>
                <div className="pdt_img">
                <img
                    src={
                      item.clubimage?hostName+"/"+item.clubimage
                        : "/app/asset/images/default-post.png"
                    }
                    alt="ok"
                  />
                </div>
                <div className="description">
                  <h3>{item.clubname}</h3>
                  <h4
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></h4>
                </div>
                <div className="button-wrapper">
                  {canJoin() && (
                    <LoadingButton onClick={() => onJoined(item)}>
                      Join
                    </LoadingButton>
                  )}

                  {canDelete(item) && (
                    <LoadingButton
                      isLoading={dataLoading}
                      onClick={() => onDelete(item)}
                      sx={{ backgroundColor: "#dc3545" }}
                    >
                      Delete
                    </LoadingButton>
                  )}
                </div>
              </div>
            ))}
            <div>
              <Link to="create" className="view-more create-new">
                Add new
              </Link>
            </div>
          </div>

          {/* <div className="price-details">
            <img src="/app/asset/images/waterbottle.jpg" alt="waterbottle" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Clubs;

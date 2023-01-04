import React, { useEffect, useState } from "react";
import Loading from "../../common/Loading";
import LoadingButton from "../../common/LoadingButton";
import Sidebar from "../../component/Sidebar/Sidebar";
import {  hostName } from "../../constants/ApiEndPoints";
import { getAllPostsById ,deletePosts} from "../../services/postService";
import { Link } from "react-router-dom";
import { alertMessage } from "../../util/util";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const onDelete = async (post) => {
    const newList = posts.filter((item) => item.id !== post.id);
    setDataLoading(true);
    const res = await deletePosts(post.id);
    setDataLoading(false);
    alertMessage(res?.message);
    setPosts(newList);
  };

  const getPostUrl = (slug) => `${hostName}/${slug}`;
  useEffect(() => {
    async function fetchData() {
      setDataLoading(true);
      const res = await getAllPostsById(localStorage.getItem("user_id"));
      if (res) setDataLoading(false);
      setPosts(res);
    }
    fetchData();
  }, []);
  return (
    <section
      className="product_bo managePosts"
      style={{ backgroundColor: "#232659" }}
    >
      <Sidebar />
      <div className="wrapper">
        <h1>Posts</h1>
        <div className="cart">
          <div className="cartproducts">
            <Loading height={130} isLoading={dataLoading} count={3}>
              {posts?.map((item, index) => (
                <div className="product" key={item.id}>
                  <div className="pdt_img">
                  <img src={item.postimage?hostName+"/"+item.postimage
                        : "/app/asset/images/default-post.png"} alt="ok" />
                  </div>
                  <div className="description">
                    <h3>{item.posttitle}</h3>
                    <h4
                      dangerouslySetInnerHTML={{ __html: item?.content }}
                    ></h4>
                  </div>
                  <div className="button-wrapper">
                      <Link to="viewpost" >
                    <LoadingButton>
                    Read
                    </LoadingButton>
                  </Link>

                    <LoadingButton
                      onClick={() => onDelete(item)}
                      sx={{ backgroundColor: "#dc3545" }}
                    >
                      Delete
                    </LoadingButton>
                  </div>
                </div>
              ))}
            </Loading>
            <div className="view-more create-new">
            <Link to="/create">ADD NEW POST</Link>
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

export default Posts;

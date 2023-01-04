import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../component/Sidebar/Sidebar";
import { getAllClubs } from "../../services/clubService";
import { getAllPosts } from "../../services/postService";
import { getAllProducts } from "../../services/productService";
import ChatEngine from "../../component/Chat/ChatEngine/index"
import { hostName } from "../../constants/ApiEndPoints";
import { getAllAdds } from "../../services/addService";

const StudentHome = () => {
  const [posts, setPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [adds, setAdds] = useState([]);

  const getPostData = (list) => list;

  const getProductData = (list) => list.map((item) => item);

  const getClubData = (list) => list.map((item) => item);
  const getAddData = (list) => list.map((item) => item);

  useEffect(() => {
    async function fetchData() {
      setProducts(getProductData(await getAllProducts()));
      setPosts(getPostData(await getAllPosts()));
      setClubs(getClubData(await getAllClubs()));
      setAdds(
        getAddData(await getAllAdds())
      );
    }
    fetchData();
  }, []);

  return (
    <section style={{ marginLeft: "43px" }}>
      <Sidebar />
      <div class="herosection" id="home">
        <div class="hero-container">
          <img
            src="/app/asset/images/starbucks-open.jpg"
            alt=""
            class="hero-image"
          />

          <div class="hero-content">
            <h1 class="display-1">
              One Shop <br /> for all your needs
            </h1>
          </div>
        </div>
      </div>
      <div class="outer-container" id="outer-container">
        <div class="left-side-container">
          <div class="card-heading">Products</div>
          <div class="productshome">
            <div class="card-container">
              {products.slice(0, 3).map((item) => (
                <div
                  class="card-item"
                  style={{
                    backgroundImage: `url(${
                      item.productimage?hostName+"/"+item.productimage
                        : "/app/asset/images/default-post.png"
                    })`,
                  }}
                >
                  <div class="card-content">
                    <h1>{item?.productname}</h1>
                    <h4>{item?.productdescription}</h4>
                  </div>
                </div>
              ))}
              <div class="view-more">
                <Link to="products">View More</Link>
              </div>
            </div>
          </div>

          <div class="card-heading">Posts</div>
          <div class="placeshome">
            <div class="card-container">
              {posts.slice(0, 3).map((item) => (
                <div
                  class="card-item"
                  style={{
                    backgroundImage: `url(${
                      item.postimage?hostName+"/"+item.postimage
                        : "/app/asset/images/default-post.png"
                    })`,
                  }}
                >
                  <div class="card-content">
                    <h1>{item?.title}</h1>
                    <h4
                      className="post-description"
                      dangerouslySetInnerHTML={{ __html: item?.content }}
                    ></h4>
                  </div>
                </div>
              ))}
              <div class="view-more">
                <Link to="posts">View More</Link>
              </div>
            </div>
          </div>

          <div class="card-heading">Clubs</div>
          <div class="placeshome">
            <div class="card-container">
              {clubs.slice(0, 3).map((item) => (
                <div
                  class="card-item"
                  style={{
                    backgroundImage: `url(${
                      item.clubimage?hostName+"/"+item.clubimage
                      : "/app/asset/images/default-post.png"
                    })`,
                  }}
                >
                  <div class="card-content">
                    <h1>{item?.clubname}</h1>
                    <h4>{item?.clubdescription}</h4>
                  </div>
                </div>
              ))}
              <div class="view-more">
                <Link to="clubs">View More</Link>
              </div>
            </div>
          </div>
          <div class="card-heading">Advertisements</div>
            <div class="placeshome">
              <div class="card-container">
                {adds.slice(0, 3).map((item) => (
                  <div
                    class="card-item"
                    style={{
                      backgroundImage: `url(${
                        item.addimage?hostName+"/"+item.addimage
                          : "/app/asset/images/default-post.png"
                      })`,
                    }}
                  >
                    <div class="card-content">
                      <h1>{item?.addname}</h1>
                      <h4>{item?.adddescription}</h4>
                    </div>
                  </div>
                ))}
                <div class="view-more">
                  <Link to="adds">View More</Link>
                </div>
              </div>
            </div>
        </div>

        <div class="right-side-container">
          {/* <div class="advertisement">
            <img src="/app/asset/images/adbo1.jpg" alt="adbo" />
            <p> Grab your Deak NOW!! </p>
          </div> */}
          {/* <div class="view-more advertise-btn">
            <a href="bocreateAdvertisement.html">Advertise</a>
          </div> */}
                    <ChatEngine />

        </div>
      </div>
    </section>
  );
};

export default StudentHome;

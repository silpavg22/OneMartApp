import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../common/Loading";
import Sidebar from "../../component/Sidebar/Sidebar";
import { getAllProducts,addtoCart} from "../../services/productService";
import { addToCart } from "../../state/slices/cartSlice";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { hostName } from "../../constants/ApiEndPoints";
import { alertMessage } from "../../util/util";

const Products = () => {
  const [products, setProduct] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllProducts();
      if (res) setDataLoading(false);
      setProduct(res);
    }
    fetchData();
  }, []);

  const allProducts = (products) => products.map((product) => product);

  const onBuyorReturn = (e, index) => {
    e.target.style.backgroundColor = "#aaaaaa";
    e.target.style.pointerEvents = "none";

    dispatch(addToCart(products[index]));
  };

  const onaddToCart = async (product) => {
    const newList = products.filter((item) => item.id !== product.id);
    setDataLoading(true);
    const res = await addtoCart({userid: localStorage.getItem("user_id"),productid: product.id});
    setDataLoading(false);
    alertMessage(res?.message);
    // setProduct(newList);
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
            <h1>Explore Products</h1>
            <Loading height={130} isLoading={dataLoading} count={3}>
              {allProducts(products).map((item, index) => (
                <div className="product">
                  <div className="pdt_img">
                    <img src={item.productimage?hostName+"/"+item.productimage
                        : "/app/asset/images/default-post.png"} alt="ok" />
                  </div>
                  <div className="description">
                    <h2>{item.productname}</h2>
                    <h5>{item.productdescription}</h5>
                    <h5>${item.price}</h5>
                    <p
                      className="btn-remove"
                      onClick={(e) => onaddToCart(item)}
                    >
                      {" "}
                      <span className="btn2">BUY</span>
                    </p>
                  </div>
                </div>
              ))}
            </Loading>
            <div>
              <Link to="sell" className="view-more create-new">
                Sell
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;

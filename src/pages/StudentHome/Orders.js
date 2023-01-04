import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../common/Loading";
import Sidebar from "../../component/Sidebar/Sidebar";
import { addToCart } from "../../state/slices/cartSlice";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllOrdersById ,onRemoveOrder} from "../../services/orderService";
import moment from "moment";
import { getAllProducts } from "../../services/productService";
import LoadingButton from "../../common/LoadingButton";
import { addPostSvc, hostName } from "../../constants/ApiEndPoints";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userOrder, setUserOrders] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let res = await getAllOrdersById(localStorage.getItem("user_id"));
      setOrders(res);
      res = await getAllProducts();
      setProducts(res);
      setDataLoading(false);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   getProductByOrder();
  // }, [orders, products]);

  const onDelete = async (order) => {
    const newList = orders.filter((item) => item.id !== order.id);
    setOrders(newList);
    const res= await onRemoveOrder(order.id)
    setOrders(newList);
  };

  const ownerProduct = (products) => products.map((product) => product);

  const getProductByOrder = () => {
    let finalProducts = [];
    orders?.forEach((order) => {
      products?.forEach((product) => {
        if (`${product.id}` === order.acf.productid) {
          finalProducts.push({
            ...product,
            acf: { ...product.acf, date: order?.date },
            orderid: order.id,
          });
        }
      });
    });
    console.log(userOrder);

    setUserOrders(finalProducts);
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
            <h1>Orders</h1>
            <Loading height={130} isLoading={dataLoading} count={3}>
              {orders.map((item, index) => (
                <div className="product">
                  <div className="pdt_img">
                  <img src={item.productimage?hostName+"/"+item.productimage
                        : "/app/asset/images/default-post.png"} alt="ok" />
                  </div>
                  <div className="description">
                    <h2>{item.productname}</h2>
                    <h5>{item.description}</h5>
                    <h5>${item.price}</h5>
                  </div>
                  <div className="button-wrapper">
                    <a href="#">
                      <LoadingButton>
                        {moment(item?.date).format("DD-MM-YY")}
                      </LoadingButton>
                    </a>
                    <LoadingButton
                      onClick={() => onDelete(item)}
                      sx={{ backgroundColor: "#dc3545" }}
                    >
                      Return
                    </LoadingButton>
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

export default Products;

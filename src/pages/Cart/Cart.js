import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, removeFromCart } from "../../state/slices/cartSlice";
import { getAllProductsFromCart, getAllProducts, onRemoveFromCart } from "../../services/productService";
import Loading from "../../common/Loading";
import { addPostSvc, hostName } from "../../constants/ApiEndPoints";
import LoadingButton from "../../common/LoadingButton";
import { alertMessage, getBase64 } from "../../util/util";
import { checkOut } from "../../services/orderService";
import { useNavigate } from "react-router";




const Cart = () => {
  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(true);
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  const [cartValue, setCartValue] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });
  const tax = 5 / 100;

  useEffect(() => {
    async function fetchData() {
      if (cart.length == 0) {
        const cart = await getAllProductsFromCart();
        const products = await getAllProducts();
        //setCart(cart)
        setProduct(products)
        const finalCart = await getFinalCart(products, cart)
        setCart(finalCart)
        calculateSubTotal()
      }
    }
    fetchData();
    if (cart.length > 0)
      setDataLoading(false);
    console.log({ cart });
    console.log({ products });
    const subtotal = calculateSubTotal();
    setCartValue({
      subtotal: subtotal,
      tax: subtotal * tax,
      shipping: subtotal ? 15 : 0,
      total: subtotal + subtotal * tax + (subtotal ? 15 : 0),
    });
  }, [cart]);

  const getFinalCart = async (products, cart) => {
    let finalCart = [];
    products?.forEach((product) => {
      cart?.forEach((item) => {
        if (product.id === item.productid) {
          finalCart.push({ ...product, date: item?.date });
        }
      });
    });
    return finalCart;
  };

  useEffect(() => {
    const subtotal = calculateSubTotal();
    setCartValue({
      subtotal: subtotal,
      tax: subtotal * tax,
      shipping: subtotal ? 15 : 0,
      total: subtotal + subtotal * tax + (subtotal ? 15 : 0),
    });
  }, [cart]);

  const onRemove = async (id) => {
    const newList = cart.filter((item) => item.id !== id);
    setCart(newList)
    // const res = await onRemoveFromCart(id)

  };

  const onCheckOut = async () => {
    const res = await checkOut({
      userid: localStorage.getItem("user_id"),
      cart: cart,
    })
    if (res) {
      navigate("/payment");

    }

  }
  const calculateSubTotal = () => {
    let subtotal = 0
    cart.forEach(item => subtotal += item.price);
    return subtotal
  }

  return (
    <section className="vh-500" style={{ backgroundColor: "#232659" }}>
      <div className="wrapper">
        <h1>My Cart</h1>
        <Loading height={130} isLoading={dataLoading} count={3}>
          {cart.length > 0 ? (
            <div className="cart">
              <div className="cartproducts">
                {cart.map((item) => (
                  <div className="product" key={item.id}>
                    <div className="pdt_img">
                      <img src={item.productimage ? hostName + "/" + item.productimage
                        : "/app/asset/images/default-post.png"} alt="ok" />
                    </div>
                    <div className="description">
                      <h3>{item.productname}</h3>
                      <h4>${item.price}</h4>
                      <p className="quantity">
                        Quantity: <span>+</span>
                        <span>{1}</span>
                        <span>-</span>
                      </p>
                      {/* <p className="btn-remove" onClick={() => onRemove(item.id)}>
                        {" "}
                        <span className="btn2">Remove</span>
                      </p> */}
                    </div>
                  </div>
                ))}
              </div>
              <div className="price-details">
                <p>
                  <span>Subtotal</span> <span>${cartValue.subtotal}</span>
                </p>
                <hr />
                <p>
                  <span>Tax</span> <span>${cartValue.tax}</span>
                </p>
                <hr />
                <p>
                  <span>Shipping Cost</span> <span>${cartValue.shipping}</span>
                </p>
                <hr />
                <p>
                  <span>
                    <b>Total</b>
                  </span>{" "}
                  <span>
                    <b>${cartValue.total}</b>
                  </span>
                </p>
                <button id='checkoutcart' onClick={() => onCheckOut()}>
                  <i className="fa fa-shopping-cart"></i>
                  <span className="btn2">CheckOut</span>
                </button>
                {/* <Link to="/payment">
                  <i className="fa fa-shopping-cart"></i>Checkout
                </Link> */}
              </div>
            </div>
          ) : (
            <div class="empty-cart">
              <img src="/app/asset/icons/empty.svg" />
              <p>Uh-Oh your cart is empty</p>
            </div>
          )}
        </Loading>
      </div>
    </section>
  );
};

export default Cart;

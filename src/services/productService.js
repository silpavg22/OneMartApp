import { hostName, productSvc ,addToCart, fetchAllProducts,createProduct,deleteProductid,fetchAllProductsCart,removeFromCart} from "../constants/ApiEndPoints";
import axios from "axios"

export const checkOut = async (values, image) => {
  const prodcutUrl = hostName + productSvc;

  const eventObj = {
    acf: {
      ...values,
      title: values?.name,
      image: image,
      owner: localStorage.getItem("user_id"),
    },
    status: "publish",
  };
  const data = await fetch(prodcutUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("admin_token"),
    },
    body: JSON.stringify(eventObj),
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        success: true,
        message:
          data?.data?.status === 400
            ? "Invalid Parameter"
            : "Successfully created",
      };
    })
    .catch((error) => ({ success: false, message: "Error" }));
  return data;
};

export const getAllProducts1 = async () => {
  const prodcutUrl = hostName + productSvc;

  const data = await fetch(prodcutUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("admin_token"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((response) => response);
  return data;
};


export const getAllProducts = async (title, content) => {
  const fetchpostUrl = hostName + fetchAllProducts;
  let data=[]
  const res = await axios.get(fetchpostUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data.products
      }
    })
    .catch((error) => console.log("Error"));
  return data;
};

export const getAllProductsById = async (id) => {
  const res = await getAllProducts();
  const result=res?.filter((product) => product?.productownerid === id);
  return result
};



export const registerProduct = async (values) => {
  const usersUrl = hostName + createProduct;
  let data = []
  let res = await axios.post(usersUrl, values)
  .then((res) => {
    if(res.status === 200){
      return {
        success: true,
        message: res.data.message,
      };
    }
  })
  .catch((error) => console.log("Error"));
return res;
};



export const addtoCart = async (values) => {
  const usersUrl = hostName + addToCart;
  let data = []
  let res = await axios.post(usersUrl, values)
  .then((res) => {
    if(res.status === 200){
      return {
        success: true,
        message: res.data.message,
      };
    }
  })
  .catch((error) => console.log("Error"));
return res;
};


export const deleteProduct = async (id) =>{
  let data = []
  const usersUrl = hostName + deleteProductid +'/'+id ;
  const res = await axios.delete(usersUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data
      }
    })
    .catch((error) => console.log("Error"));
  return data;
}

export const getAllProductsFromCart = async (valuest) => {
  const fetchpostUrl = hostName + fetchAllProductsCart;
  let data=[]
  const res = await axios.get(fetchpostUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data.cart
      }
    })
    .catch((error) => console.log("Error"));
  return data;
};



export const onRemoveFromCart = async (id) =>{
  let data = []
  const usersUrl = hostName + removeFromCart +'/'+id ;
  const res = await axios.delete(usersUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data
      }
    })
    .catch((error) => console.log("Error"));
  return data;
}
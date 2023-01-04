import { hostName, ordersSvc,saveOrders,fetchAllOrders,removeOrder } from "../constants/ApiEndPoints";
import axios from "axios"
export const orderProduct = async (values) => {
  const orderUrl = hostName + ordersSvc;

  const eventObj = {
    acf: {
      ...values,
    },
    status: "publish",
  };
  const data = await fetch(orderUrl, {
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
          data?.data?.status === 400 ? "Invalid Parameter" : "Order Successful",
      };
    })
    .catch((error) => ({ success: false, message: "Error" }));
  return data;
};

export const getAllOrders1 = async (values) => {
  const orderUrl = hostName + ordersSvc;
  const data = await fetch(orderUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("admin_token"),
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => ({ success: false, message: "Error" }));
  return data;
};

export const getAllOrdersById = async () => {
  const res = await getAllOrders();
  return res.filter(
    (item) => item.buyeruserid == localStorage.getItem("user_id")
  );
};


export const checkOut= async (values) => {
  const usersUrl = hostName + saveOrders+'/'+values.userid ;

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


export const getAllOrders = async () =>{
  let data = []
  const usersUrl = hostName + fetchAllOrders;
  const res = await axios.get(usersUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data.orders
      }
    })
    .catch((error) => console.log("Error"));
  return data;
}

export const onRemoveOrder = async (id) =>{
  let data = []
  const usersUrl = hostName + removeOrder +'/'+id ;
  const res = await axios.delete(usersUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data
      }
    })
    .catch((error) => console.log("Error"));
  return data;
}
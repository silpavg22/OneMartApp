import { hostName, joinedSvc ,joinedClub,leaveClubs} from "../constants/ApiEndPoints";
import axios from "axios"
import { getAllClubs } from "./clubService";
export const joinClub1 = async (values) => {
  const orderUrl = hostName + joinedSvc;

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

export const getAllJoinedClubs = async (values) => {
  const orderUrl = hostName + joinedSvc;
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

export const getAllJoinedClubsById = async () => {
  const res = await getAllClubs();
  return res.filter(
    (item) => item.joineduserid == localStorage.getItem("user_id")
  );
};

export const joinClub = async (values) =>{
  let data = []
  const usersUrl = hostName + joinedClub +'/'+values.clubid;
  const res = await axios.put(usersUrl,values)
  .then((res) => {
      if(res.status === 200){
         return{
          status : true,
          message:res.data.message
         }
      }
    })
    .catch((error) => console.log("Error"));
  return res;
}

export const leaveClub = async (values) =>{
  let data = []
  const usersUrl = hostName + leaveClubs +'/'+values.clubid;
  const res = await axios.put(usersUrl,values)
  .then((res) => {
    if(res.status === 200){
      return{
       status : true,
       message:res.data.message
      }
   }
    })
    .catch((error) => console.log("Error"));
  return res;
}
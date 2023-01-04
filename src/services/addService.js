import { hostName, addSvc, fetchAllAdds,createAdd,deleteAdd } from "../constants/ApiEndPoints";
import axios from "axios"
export const registerAdd1 = async (values, image) => {
  const addUrl = hostName + addSvc;

  const eventObj = {
    acf: {
      ...values,
      image: image,
      owner: localStorage.getItem("user_id"),
    },
    title: values?.name,
    status: "publish",
  };
  const data = await fetch(addUrl, {
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

export const getAllAdds1 = async () => {
  const addUrl = hostName + addSvc;

  const data = await fetch(addUrl, {
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


export const getAllAdds = async (title, content) => {
  const fetchpostUrl = hostName + fetchAllAdds;
  let data=[]
  const res = await axios.get(fetchpostUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data.adds
      }
    })
    .catch((error) => console.log("Error"));
  return data;
};

export const getAllAddsById = async (id) => {
  const res = await getAllAdds();
  // const reslt= res?.filter((add) => add?.addownerid === id);
  return res;
};

export const registerAdd= async (values) => {
  const usersUrl = hostName + createAdd;
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


export const deleteAdds = async (id) =>{
  let data = []
  const usersUrl = hostName + deleteAdd +'/'+id ;
  const res = await axios.delete(usersUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data
      }
    })
    .catch((error) => console.log("Error"));
  return data;
}
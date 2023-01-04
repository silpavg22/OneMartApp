import { hostName, loginSvc, registerSvc , registerUser, contactUs,loginUser} from "../constants/ApiEndPoints";
import { userRole } from "../constants/constants";
import axios from "axios";

export const login1 = async (username, password, admin) => {
  const loginUrl = "https://nxg0191.uta.cloud" + loginSvc;
  const payload = { 
    username: username,
    password: password,
  };
  let data = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.token) {
        if (!admin) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user_role", userRole[res.user_role[0]]);
          localStorage.setItem("user_id", res.id);
        } else {
          localStorage.setItem("admin_token", res.token);
        }
        // navigate(page[res.user_role]);
        return {
          success: true,
          message: "Logged in Successfully",
        };
      }
      if (res?.data?.status === 403) {
        return {
          success: false,
          message: res?.message,
        };
      }
      return {
        success: false,
        message: "Error",
      };
    });
  return data;
};



export const singup1 = async (body) => {
  const userObj = {
    username: body.username,
    first_name: body.name,
    email: body.email,
    password: body.password,
    roles: ["author"],
    acf: {
      dob: body.dob,
      address: body.address,
      avatar: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    },
  };
  const token = localStorage.getItem("admin_token");
  const hostName="https://nxg0191.uta.cloud"
  // const registerUrl = hostName + registerSvc;

  const registerUrl = hostName + registerSvc;
  const data = await fetch(registerUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      if (
        res?.data?.status === 400 ||
        res?.code === "existing_user_login" ||
        res?.code === "existing_user_email"
      ) {
        return {
          success: false,
          message: res?.message,
        };
      } else {
        return {
          success: true,
          message: "User created successfully",
        };
      }
    })
    .catch((err) => err);
  return data;
};

export const isUserLoggedIn = () => localStorage.getItem("user_role");


export const login = async (username, password, admin) => {
  // const loginUrl = "https://nxg0191.uta.cloud" + loginSvc;
  const loginUrl = hostName + loginUser;
  const payload = { 
    email: username,
    password: password,
  };
  let data = await axios.post(loginUrl, payload)
    .then((res) => {
      if (res.data.token) {
        if (!admin) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_role", userRole[res.data.user_role]);
          localStorage.setItem("user_id", res.data.id);
        } else {
          localStorage.setItem("admin_token", res.data.token);
        }
        // navigate(page[res.user_role]);
        return {
          success: true,
          message: "Logged in Successfully",
        };
      }
      if (res?.data?.status === 401) {
        return {
          success: false,
          message: res?.message,
        };
      }
      return {
        success: false,
        message: "Error",
      };
    });
  return data;
};

export const singup = async (values) => {
  const usersUrl = hostName + registerUser;
  let errors=[]
  let data = await axios.post(usersUrl, values)
  .then((res) => {
    if(!res.data.validation_errors && res.status === 200){
      return {
        success: true,
        message: "User created successfully",
        token : res.data.token
      };
    }
    else
      return{
      success: false,
      errors: res.data.validation_errors
      };
    
  })
  .catch((error) => console.log("Error"));
   return data;
};


export const sentcontactus = async (values) => {
  const usersUrl = hostName + contactUs;
  let data = await axios.post(usersUrl, values)
  .then((res) => {
    if(res.status === 200){
      return {
        success: true,
        message: "Message sent successfully!!",
      };
    }
  })
  .catch((error) => console.log("Error"));
return data;
};



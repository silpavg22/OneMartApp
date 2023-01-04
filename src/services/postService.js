import { postsSvc, hostName ,fetchAllPosts,deletePost,createPost} from "../constants/ApiEndPoints";
import axios from "axios";

export const getAllPosts1 = async (title, content) => {
  const post = hostName + postsSvc;
  const data = await fetch(post, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("admin_token"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return data;
};


export const getAllPosts = async (title, content) => {
  const fetchpostUrl = hostName + fetchAllPosts;
  let data=[]
  const res = await axios.get(fetchpostUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data.posts
      }
    })
    .catch((error) => console.log("Error"));
  return data;
};


export const deleteUser = async (index) =>{
  let data = []
  const postUrl = hostName + deletePost +'/'+index.id ;
  const res = await axios.delete(postUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data
      }
    })
    .catch((error) => console.log("Error"));
  return data;
}

export const getAllPostsById = async (id) => {
  const res = await getAllPosts();
  const reslt= res?.filter((item) => item.postuserid == id);
  return  reslt;
};


export const createPosts= async (values) => {
  const usersUrl = hostName + createPost;
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


export const deletePosts = async (id) =>{
  let data = []
  const usersUrl = hostName + deletePost +'/'+id ;
  const res = await axios.delete(usersUrl)
  .then((res) => {
      if(res.status === 200){
         data=res.data
      }
    })
    .catch((error) => console.log("Error"));
  return data;
}
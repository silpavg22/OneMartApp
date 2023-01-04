// export const hostName = "https://sxv9441.uta.cloud";
export const     hostName = "http://localhost:8000";


//JWT
export const loginSvc = "/wp-json/jwt-auth/v1/token";
export const contactSvc =
  "/wp-json/contact-form-7/v1/contact-forms/89/feedback";

export const addPostSvc = "/wp-admin/post-new.php";

//in-built
export const registerSvc = "/wp-json/wp/v2/users";
export const blogSvc = "/wp-json/wp/v2/posts";

//CPT
export const schoolSvc = "/wp-json/wp/v2/schools";
export const eventSvc = "/wp-json/wp/v2/events";
export const businessSvc = "/wp-json/wp/v2/business";
export const flightSvc = "/wp-json/wp/v2/flights";
export const productSvc = "/wp-json/wp/v2/product";
export const addSvc = "/wp-json/wp/v2/advertise";
export const clubsSvc = "/wp-json/wp/v2/club";
export const ordersSvc = "/wp-json/wp/v2/orders";
export const joinedSvc = "/wp-json/wp/v2/joined";

//Custom
export const usersSvc = "/wp-json/wl/v1/users";
export const postsSvc = "/wp-json/wl/v1/posts";


export const fetchAllPosts = "/api/post/fetch-posts";
export const deletePost = "/api/post/delete-post";
export const createPost = "/api/post/create-post";


export const joinedClub = "/api/club/join-club";
export const leaveClubs = "/api/club/leave-club";
export const fetchAllClubs = "/api/club/fetch-clubs";
export const deleteClubs = "/api/club/delete-club";
export const createClub = "/api/club/create-club";

export const fetchAllProducts = "/api/product/fetch-products";
export const createProduct = "/api/product/create-product";
export const deleteProductid = "/api/product/delete-product";



export const createUsers = "/api/user/create-user";
export const getUsers = "/api/user/fetch-users";
export const updateUser = "/api/user/update-user";
export const deleteUserid = "/api/user/delete-user";
export const registerUser = "/api/user/register-user";
export const loginUser = "/api/user/login-user";
export const contactUs = "/api/user/contact-us";
export const forgotPassword = "/api/user/change-password";


export const fetchAllProductsCart = "/api/cart/fetch-products-cart";
export const addToCart = "/api/cart/addto-cart";
export const removeFromCart = "/api/cart/removefrom-cart";


export const saveOrders = "/api/order/save-order";
export const fetchAllOrders = "/api/order/fetch-orders";
export const removeOrder = "/api/order/remove-order";





export const createAdd = "/api/advertisement/create-add";
export const deleteAdd = "/api/advertisement/delete-add";
export const fetchAllAdds = "/api/advertisement/fetch-adds";












import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllClubs } from "../../services/clubService";
import { getAllProducts } from "../../services/productService";
import { getAllUsers } from "../../services/userService";
import ChatEngine from "../../component/Chat/ChatEngine/index"
import BarChart from "react-bar-chart";



export default function BarCharts() {
  const [users, setUsers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [products, setProducts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const userCount = (role) =>
    users?.filter((user) => user.usertype === role).length;

  useEffect(() => {
    async function fetchData() {
      setUsers(await getAllUsers());
      setProducts(await getAllProducts());
      setClubs(await getAllClubs());
    }
    fetchData();
  }, []);

  const data = [
    { text: "Products", value: products.length },
    { text: "BOs", value: userCount("contributor") },
    { text: "Clubs", value: clubs.length , color: '#f00'},

  ];


  const margin = { top: 40, right: 0, bottom: 30, left: 200 };

  return (
    <div className="App">
      <div style={{ width: "20%" }}>
        <BarChart
          ylabel="Total Count"
          width={500}
          height={500}
          margin={margin}
          data={data}
          colorBars
        />
      </div>
    </div>
  );
}

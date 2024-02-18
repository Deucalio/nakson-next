"use client";
import { useSession } from "next-auth/react";
import { logUserOut } from "../esync/actions/logUserOut";
import { getUser } from "../esync/actions/getUser";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Nav from "./components/Nav";

export default function Page() {
  // Nav Configuration
  const navElement = useRef(null);
  const arrowElement = useRef(null);
  const sidebarItems = useRef(null);
  const pageElement = useRef(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // _________

  const data = useSession();
  const [user, setUser] = useState(null);

  const [orders, setOrders] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    logUserOut();
  };

  const logUserIn = async () => {
    const data = await getUser();
    setUser(data);
  };

  const getData = async () => {
    const res_first = await axios.get("/api/server-url");
    const { serverURL } = res_first.data;

    // send request to backend (localhost:4000) email as a header
    console.log("user:", user);
  };

  useEffect(() => {
    logUserIn();
  }, []);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <main className="h-screen overflow-auto grid grid-cols-6">
      <Nav
        pageElement={pageElement}
        openSidebar={openSidebar}
        navElement={navElement}
        arrowElement={arrowElement}
        sidebarItems={sidebarItems}
        handleSidebar={handleSidebar}
      />

      <div ref={pageElement}>
        <p>Dashboard</p>
        <p onClick={handleLogout}>Sign Out</p>
        <p>Your Email is: {user?.user?.email}</p>
        {orders?.map((order) => {
          return (
            <div key={order.id}>
              <p>{order.name}</p>
              <p>{order.price}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

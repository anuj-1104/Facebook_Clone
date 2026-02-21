import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing_Page from "./Pages/Landing_Page";
import LoginPage from "./component/LoginPage";
import Home from "./Pages/Home";
import Navbar from "./component/Navbar";
import ProfilePage from "./Pages/ProfilePage";
import Friends_Page from "./Pages/Friends_Page";
import Notification_Page from "./Pages/Notification_Page";
import Tranding_Page from "./Pages/Tranding_Page";
import UserProtected from "./protected/UserProtected";
import { useAppcontext } from "./contaxt/Appcontext";

const App = () => {
  const [loading, setLoading] = useState(true);

  const { token } = useAppcontext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <>
      <div className="">
        {token ? <Navbar /> : ""}
        <Routes>
          <Route
            path="/"
            element={loading ? <Landing_Page /> : <LoginPage />}
          />
          <Route element={<UserProtected />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/friends" element={<Friends_Page />} />
            <Route path="/notification" element={<Notification_Page />} />
            <Route path="/trending" element={<Tranding_Page />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;

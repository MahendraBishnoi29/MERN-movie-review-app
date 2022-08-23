import React from "react";
import { Route, Routes } from "react-router-dom";
import Actors from "../../components/Admin/Actors";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import Dashboard from "../../components/Admin/Dashboard";
import Header from "../../components/Admin/Header";
import Movies from "../../components/Admin/Movies";
import NotFound from "../../components/Home/NotFound";

const AdminNavigator = () => {
  return (
    <div className="flex dark:bg-primary bg-white">
      <AdminNavbar />
      <div className="flex-1 p-2 max-w-screen-xl">
        <Header onAddMovie={() => console.log("Adding Movie")} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavigator;

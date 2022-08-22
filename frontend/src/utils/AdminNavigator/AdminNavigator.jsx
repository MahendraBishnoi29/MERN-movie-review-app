import React from "react";
import { Route, Routes } from "react-router-dom";
import Actors from "../../components/Admin/Actors";
import Dashboard from "../../components/Admin/Dashboard";
import Movies from "../../components/Admin/Movies";
import NotFound from "../../components/Home/NotFound";

const AdminNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/actors" element={<Actors />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminNavigator;

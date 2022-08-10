import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import EmailVerification from "./components/Auth/EmailVerification";
import Home from "./components/Home/Home";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ConfirmPassword from "./components/Auth/ConfirmPassword";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
      </Routes>
    </>
  );
}

export default App;

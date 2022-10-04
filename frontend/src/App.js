import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// Components
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import EmailVerification from "./components/Auth/EmailVerification";
import Home from "./components/Home/Home";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ConfirmPassword from "./components/Auth/ConfirmPassword";
import NotFound from "./components/Home/NotFound";
// Router
import { Routes, Route } from "react-router-dom";
// Hooks & Functions
import { useAuth } from "./hooks";
import AdminNavigator from "./utils/AdminNavigator/AdminNavigator";
import SingleMoviePage from "./components/SingleMoviePage/SingleMoviePage";
import MovieReviews from "./components/User/MovieReviews";
import SearchMovie from "./components/User/SearchMovie";

function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === "admin";

  if (isAdmin) return <AdminNavigator />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ConfirmPassword />} />
        <Route path="/movie/:movieId" element={<SingleMoviePage />} />
        <Route path="/movie/reviews/:movieId" element={<MovieReviews />} />
        <Route path="/movie/search" element={<SearchMovie />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

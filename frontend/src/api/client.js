import axios from "axios";

const client = axios.create({
  baseURL: "https://mern-movie-rating.onrender.com/api",
});

export default client;

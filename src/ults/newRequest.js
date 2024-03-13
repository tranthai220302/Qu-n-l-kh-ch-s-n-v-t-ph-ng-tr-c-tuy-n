import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://booking-5z8s.onrender.com/api",
  withCredentials: true,
});

export default newRequest;
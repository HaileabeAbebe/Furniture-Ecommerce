import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

let TOKEN = "";
const persistedState = localStorage.getItem("persist:root");

if (persistedState) {
  const parsedState = JSON.parse(persistedState);
  if (parsedState && parsedState.user) {
    const userState = JSON.parse(parsedState.user);
    if (userState && userState.currentUser) {
      TOKEN = userState.currentUser.accessToken;
    }
  }
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

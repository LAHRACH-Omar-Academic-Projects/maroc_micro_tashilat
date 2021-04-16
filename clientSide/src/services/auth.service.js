import axios from "axios";

const API_URL = "http://192.168.43.253:9091/auth/";

const register = (username, email, password, agencyName, agencyId, role) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    agencyName,
    agencyId,
    role
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};

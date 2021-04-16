import axios from "axios";

const API_URL = "http://192.168.43.253:9091/clients/";

const saveClient = (clientUser) => {
  const client = clientUser.client;
  const user = clientUser.user;
  return axios.post(API_URL + "saveClient", {
    user,
    client
  });
};

const getClientsByKeyword = (keyword) => {
  return axios.get(API_URL + "search/" + keyword);
}

const deleteClient = (clientId) => {
  return axios.delete(API_URL + "deleteClient/" + clientId);
}

const updateClient = (clientUser) => {
  const client = clientUser.client;
  const user = clientUser.user;
  const userClientKey = clientUser.userClientKey;
  return axios.post(API_URL + "saveClient", {
    userClientKey,
    user,
    client
  });
}

export default {
  saveClient,
  updateClient,
  getClientsByKeyword,
  deleteClient
};

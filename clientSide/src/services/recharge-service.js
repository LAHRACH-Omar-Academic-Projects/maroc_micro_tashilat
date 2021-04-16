import axios from "axios";

const API_URL = "http://192.168.43.253:9091/recharges/";
const API_URL_RECHARGE_IAM = "http://192.168.43.253:9092/iam/recharges/newRecharge";
const API_URL_RECHARGE_ORANGE = "http://192.168.43.253:9092/orange/recharges/newRecharge";
const API_URL_RECHARGE_INWI = "http://192.168.43.253:9092/inwi/recharges/newRecharge";

const saveRecharge = (phone, price, operationType, agencyName, agencyId, company, date, clientId) => {
  switch (company) {
    case "Iam":
      axios.post(API_URL_RECHARGE_IAM, {
        phone,
        price,
        operationType,
        agencyName,
        agencyId,
        date
      });
      break;
    case "Orange":
      axios.post(API_URL_RECHARGE_ORANGE, {
        phone,
        price,
        operationType,
        agencyName,
        agencyId,
        date
      });
      break;
    case "Inwi":
      axios.post(API_URL_RECHARGE_INWI, {
        phone,
        price,
        operationType,
        agencyName,
        agencyId,
        date
      });
      break;
    default:
      break;
  }
  const client = { "clientId": clientId }
  return axios.post(API_URL + "saveRecharge", {
    phone,
    price,
    operationType,
    company,
    date,
    client
  });
};

const deleteRecharge = (rechargeId) => {
  return axios.delete(API_URL + "deleteRecharge/" + rechargeId);
}

const getAllRecharges = (clientId) => {
  return axios.get(API_URL + "all/" + clientId);
}

const getRechargesByKeyword = (keyword) => {
  return axios.get(API_URL + "search/" + keyword);
}

const favorite = (id, phone, price, operationType, company, date, favorite, clientId) => {
  const client = { "clientId": clientId }
  return axios.put(API_URL + "addToFavorite", {
    id,
    phone,
    price,
    operationType,
    company,
    date,
    favorite,
    client
  })
}

export default {
  saveRecharge,
  deleteRecharge,
  getAllRecharges,
  favorite,
  getRechargesByKeyword
};

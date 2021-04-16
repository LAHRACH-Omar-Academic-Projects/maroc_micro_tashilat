import axios from "axios";

const API_URL = "http://192.168.43.253:9091/transactions/";
const API_URL_MONEY_TRANSFER = "http://192.168.43.253:9093/moneyTransfer/transactions/saveTransaction";

const saveTransaction = (
  beneficiaryFullName,
  beneficiaryId,
  transmitterFullName,
  transmitterPhoneNumber,
  transmitterId,
  transactionCode,
  transmitterAgencyName,
  transmitterAgencyId,
  receiverAgencyName,
  receiverAgencyId,
  date,
  price,
  done,
  clientId) => {

  axios.post(API_URL_MONEY_TRANSFER, {
    beneficiaryFullName,
    beneficiaryId,
    transmitterFullName,
    transmitterPhoneNumber,
    transmitterId,
    transactionCode,
    transmitterAgencyName,
    transmitterAgencyId,
    receiverAgencyName,
    receiverAgencyId,
    date,
    price,
    done
  });
  const client = { "clientId": clientId }
  return axios.post(API_URL + "saveTransaction", {
    beneficiaryFullName,
    beneficiaryId,
    transmitterPhoneNumber,
    transactionCode,
    transmitterAgencyName,
    transmitterAgencyId,
    receiverAgencyName,
    receiverAgencyId,
    date,
    price,
    done,
    client
  });
};

const deleteTransaction = (transactionId) => {
  return axios.delete(API_URL + "deleteTransaction/" + transactionId);
}

const getAllTransactions = (clientId) => {
  return axios.get(API_URL + "all/" + clientId);
}

const getTransactionsByKeyword = (keyword) => {
  return axios.get(API_URL + "search/" + keyword);
}

const updateTransaction = (id, beneficiaryFullName, beneficiaryId, transmitterFullName, transmitterPhoneNumber, transmitterId, transactionCode, transmitterAgencyName, transmitterAgencyId, receiverAgencyName, receiverAgencyId, date, price, done, favorite, clientId) => {
  axios.post(API_URL_MONEY_TRANSFER, {
    id,
    beneficiaryFullName,
    beneficiaryId,
    transmitterFullName,
    transmitterPhoneNumber,
    transmitterId,
    transactionCode,
    transmitterAgencyName,
    transmitterAgencyId,
    receiverAgencyName,
    receiverAgencyId,
    date,
    price,
    done
  });
  const client = { "clientId": clientId }
  return axios.put(API_URL + "addToFavorite", {
    id,
    beneficiaryFullName,
    beneficiaryId,
    transmitterPhoneNumber,
    transactionCode,
    transmitterAgencyName,
    transmitterAgencyId,
    receiverAgencyName,
    receiverAgencyId,
    date,
    price,
    done,
    favorite,
    client
  })
}

export default {
  saveTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
  getTransactionsByKeyword
};

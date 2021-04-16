import axios from "axios";

const API_URL = "http://192.168.43.253:9091/billPayments/";
const API_URL_BILL_PAYMENT_LYDEC = "http://192.168.43.253:9094/lydec/billPayments/newBillPayment";
const API_URL_BILL_PAYMENT_RADEEJ = "http:/192.168.43.253:9094/radeej/billPayments/newBillPayment";

const saveBillPayment = (method, service, price, paymentCode, agencyName, agencyId, company, date, clientId) => {
  switch (company) {
    case "Lydec":
      axios.post(API_URL_BILL_PAYMENT_LYDEC, {
        method, 
        service, 
        price, 
        paymentCode, 
        agencyName, 
        agencyId, 
        company, 
        date
      });
      break;
    case "Radeej":
      axios.post(API_URL_BILL_PAYMENT_RADEEJ, {
        method, 
        service, 
        price, 
        paymentCode, 
        agencyName, 
        agencyId, 
        company, 
        date
      });
      break;
    default:
      break;
  }
  const client = { "clientId": clientId }
  return axios.post(API_URL + "saveBillPayment", {
    method, 
    service, 
    price, 
    paymentCode, 
    company, 
    date, 
    client
  });
};

const deleteBillPayment = (billPaymentId) => {
  return axios.delete(API_URL + "deleteBillPayment/" + billPaymentId);
}

const getAllBillPayments = (clientId) => {
  return axios.get(API_URL + "all/" + clientId);
}

const getBillPaymentsByKeyword = (keyword) => {
  return axios.get(API_URL + "search/" + keyword);
}

const favorite = (id, method, service, price, paymentCode, company, date, favorite, clientId) => {
  const client = { "clientId": clientId }
  return axios.put(API_URL + "addToFavorite", {
    id,
    method, 
    service, 
    price, 
    paymentCode, 
    company, 
    date, 
    favorite,
    client
  })
}

export default {
    saveBillPayment,
    deleteBillPayment,
    getAllBillPayments,
    favorite,
    getBillPaymentsByKeyword
};

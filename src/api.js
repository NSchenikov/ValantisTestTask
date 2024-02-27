import axios from "axios";
import md5 from "md5";
const baseUrl = "https://api.valantis.store:41000/";
let password = "Valantis";

let now = new Date();
// console.log(now);
let yyyy = now.getFullYear().toString();
let mm =
  (now.getMonth() + 1).toString().length === 1
    ? "0" + (now.getMonth() + 1).toString()
    : (now.getMonth() + 1).toString();
let dd =
  now.getDate().toString().length === 1
    ? "0" + now.getDate().toString()
    : now.getDate().toString();
// let date = yyyy + mm + dd;
let date = "20240227";
// console.log(date);
let authString = md5(password + "_" + date);

export const getIds = ({currentPage}) => {
    let offset = currentPage === 1 ? 0 : (currentPage - 1) * 50 + 1;
    // console.log(authString);
    const headers = {
      "X-Auth": authString,
      "Content-Type": "application/json",
    };
    const requestData = {
      "action": "get_ids",
      "params": {
        "offset": offset,
        "limit": 50,
      },
    };
  
    return axios.post(baseUrl, requestData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {

        return response;
      })
  };

  export const getItems = (ids) => {

    // console.log(authString);
    const headers = {
      "X-Auth": authString,
      "Content-Type": "application/json",
    };
    const requestData = {
      "action": "get_items",
      "params": {
        "ids": ids
      },
    };
  
    return axios.post(baseUrl, requestData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        // console.log(response);
        return response;
      })
  };

  export const getFields = ({currentPage, field}) => {
    let offset = currentPage === 1 ? 0 : (currentPage - 1) * 50 + 1;
    // console.log(authString);
    const headers = {
      "X-Auth": authString,
      "Content-Type": "application/json",
    };
    const requestData = {
      "action": "get_fields",
      "params": {
        "field": field,
        "offset": offset,
        "limit": 50,
      },
    };
  
    return axios.post(baseUrl, requestData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {

        return response;
      })
  };
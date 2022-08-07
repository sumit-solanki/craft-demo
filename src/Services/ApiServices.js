import axios from "axios";

const GetToken = () => {
  return "123456789" ;
};

const getHeader = async() => {
  const token = GetToken();
  axios.defaults.headers = {
    token
  };
};
const baseURL = "http://smart-meeting.herokuapp.com/";
const services = {
  getBuildings: (params) => {
    getHeader();
    return axios.post(baseURL, params);
  },
  bookMeeting: (params) => {
    getHeader();
    return axios.post(baseURL, params);
  },
};
export default services;

import axios from "axios";

class nurseService {
  getNurses = (params) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `nurses`,{params})
    .then((resp)=>{
      return resp.data
    })
  };

  getNurse = (params) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `nurses/${params.nurseUsername}`)
    .then((resp)=>{
      return resp.data
    })
  };

  addReview = (nurseUsername, reviewData) => {
    return axios.post(process.env.REACT_APP_SERVER_URL + `reviews/${nurseUsername}`, reviewData)
    .then((resp)=>{
      return resp.data
     })
  };

  getReviews = (params) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `reviews/${params.nurseUsername}`)
    .then((resp)=>{
      return resp.data
    })
  };
}

export default new nurseService();

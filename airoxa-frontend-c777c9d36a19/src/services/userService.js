import axios from "axios";

class nurseService {
  getNurses = (params) => {
    return axios.get(process.env.REACT_APP_SERVER_URL + `users`,{params})
    .then((resp)=>{
      return resp.data
    })
  };
}

export default new nurseService();

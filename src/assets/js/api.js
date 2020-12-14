import axios from "axios";
const URL = "https://adminpanel.myafrilearn.com/v2/"; 

export default {
  url: URL,
  headers() { 
    let header = {};   
    header["Content-type"] = "application/json";
    header["authorization"] = "F0c7ljTmi25e7LMIF0Wz01lZlkHX9b57DFTqUHFyWeVOlKAsKR0E5JdBOvdunpqv";        
    return header;
  },

  loadSubjects() {
    return axios({
      method: "get",
      url: `${this.url}getOLevels`,
      headers: this.headers()
    });
  },

  loadQuestions(id) {
    return axios({
      method: "get",
      url: `${this.url}getQuestions/${id}`,
      //  url: `${this.url}getQuestions/1`,
      headers: this.headers()      
    });
  },

  registerUser(data) {
    return axios({
      method: "post",
      url: `${this.url}register`,
      headers: this.headers(),
      data
    });
  },

  login(data) {
    return axios({
      method: "post",
      url: `${this.url}login`,
      headers: this.headers(),
      data
    });
  },

  socialLoginGoogle(data) {
    return axios({
      method: "post",
      url: `${this.url}googleLogin`,
      headers: this.headers(),
      data
    });
  },

  socialLoginFacebook(data) {
    return axios({
      method: "post",
      url: `${this.url}facebookLogin`,
      headers: this.headers(),
      data
    });
  },

  getStatistics() {
    return axios({
      method: "post",
      url: `${this.url}getStatistics`,
      headers: this.headers()   
    });
  },

  submitScore(data) {
    return axios({
      method: "post",
      url: `${this.url}submitResult`,
      headers: this.headers(),
      data
    });
  },

  resetPassword(data) {
    return axios({
      method: "post",
      url: `${this.url}resetPassword`,
      headers: this.headers(),
      data
    });
  },
  changePassword(data) {
    return axios({
      method: "post",
      url: `${this.url}changePassword`,
      headers: this.headers(),
      data
    });
  },
  verifyToken(data) {
    return axios({
      method: "post",
      url: `${this.url}verifyResetPasswordToken`,
      headers: this.headers(),
      data
    });
  },
  search(data) {
    return axios({
      method: "post",
      url: `${this.url}search/${data}`,
      headers: this.headers(),   
    });
  },

  getHistory(data) {
    return axios({
      method: "get",
      url: `${this.url}getResultHistory/${data}`,
      headers: this.headers(),   
    });
  },
  
};

import axios from "axios";
const URL = "http://afrilearnbackend-env.eba-7ppeuqks.us-east-1.elasticbeanstalk.com/api/v1/"; 

export default {
  url: URL,
  headers(fileupload = false) {
    const token = localStorage.getItem('token');

    let header = {};
    if (fileupload) {
      header['Content-type'] = 'multipart/form-data';
    } else {
      header['Content-type'] = 'application/json';
      header['Accept'] = '*/*';
      header['Access-Control-Allow-Origin'] = '*';
    }
    if (token && token !== undefined) {
      header['token'] = token;
    }
    return header;
  },

  getRoles() {
    return axios({
      method: "get",
      url: `${this.url}auth/roles`,
      headers: this.headers()   
    });
  },
  registerUser(data) {
    return axios({
      method: 'post',
      url: `${this.url}/auth/signup`,
      headers: this.headers(),
      data,
    });
  },
  login(data) {
    return axios({
      method: 'post',
      url: `${this.url}/auth/login`,
      headers: this.headers(),
      data,
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

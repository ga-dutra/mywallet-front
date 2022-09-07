import axios from "axios";

const url_base = "http://localhost:5000";

function postLogin(body) {
  const promise = axios.post(`${url_base}/auth/login`, body);
  return promise;
}

function postSignUp(body) {
  const promise = axios.post(`${url_base}/auth/sign-up`, body);
  return promise;
}

export { postLogin, postSignUp };

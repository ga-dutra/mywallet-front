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

function getCashFlows(config) {
  const promise = axios.get(`${url_base}/cashflows`, config, {});
  return promise;
}

function postCashFlow(body, config) {
  const promise = axios.post(`${url_base}/cashflows`, body, config);
  return promise;
}

function deleteSession(config) {
  const promise = axios.delete(`${url_base}/logout`, config);
  return promise;
}

function deleteCashFlow(id, config) {
  const promise = axios.delete(`${url_base}/cashflows/${id}`, config);
  return promise;
}

function editCashFlow() {}

export {
  postLogin,
  postSignUp,
  getCashFlows,
  postCashFlow,
  deleteSession,
  deleteCashFlow,
  editCashFlow,
};

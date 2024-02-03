import axios from "axios";

const apiRequests = async (url, params, data, method = "get") => {
  const token = sessionStorage.getItem("token");

  return axios({
    method,
    url,
    params,
    data,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export default apiRequests;

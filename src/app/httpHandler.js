import { serverURL } from "./Config";

export function httpPostService(url, data) {
  const apiURL = `${serverURL}/${url}`; //http://localhost:5000/api/login
  const authToken = localStorage.getItem("authToken") || "";
  return fetch(`${apiURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
      "x-access-token": `${authToken}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

export function httpGetService(url) {
  const apiURL = `${serverURL}/${url}`;
  const authToken = localStorage.getItem("authToken") || "";
  return fetch(`${apiURL}`, {
    method: "GET",
    headers: {
      "x-access-token": `${authToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}

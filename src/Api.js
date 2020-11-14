import axios from "axios";

const api = axios.create({
  baseURL: "https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/"
});

var query_params = new URLSearchParams({
  limit: 10,
  query_type: "and",
  Name: "example value",
  "Favourite Thing": "example value",
  Image: "example value"
});
var url = "https://sheet2api.com/v1/ByR2h1huRjyQ/fiap/user?" + query_params;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });

export default api;

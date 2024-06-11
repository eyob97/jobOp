import axios from "axios";

// export default axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     headers: {
//         'Content-type': 'application/json',
//         'AUTHORIZATION': 'JWT ' + localStorage.getItem('jwt_access_token')
//     },
// });

export const get = (query, variables = {}) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API_URL + "/graphql/",
      headers: {
        AUTHORIZATION: "JWT " + localStorage.getItem("jwt_access_token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        query,
        variables,
      }),
    };
    axios
      .request(config)
      .then(function (response) {
        if (response.data.errors) {
          reject(response.data.errors[0].message);
        }
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

export const getRest = (query) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API_URL + "/rest/get_cdrs/",
      headers: {
        AUTHORIZATION: "JWT " + localStorage.getItem("jwt_access_token"),
        "Content-Type": "application/json",
      },
      data: query,
    };
    axios
      .request(config)
      .then(function (response) {
        if (response.data.errors) {
          reject(response.data.errors[0].message);
        }
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

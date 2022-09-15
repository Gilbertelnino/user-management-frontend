const productionApiUrl = "https://user-management12.herokuapp.com/api";
const localApiUrl = "http://localhost:5000/api";

const axiosConfig = (axios) => {
  if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = localApiUrl;
  } else {
    axios.defaults.baseURL = productionApiUrl;
  }

  axios.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers["auth-token"] = token;
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        (error.response.data.status === 401 &&
          error.response.data.error === "Session is expired, login again!") ||
        (error.response.data.status === 401 &&
          error.response.data.error === "Token is incorrect or expired")
      ) {
        // clear root store
        localStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );
};

export default axiosConfig;

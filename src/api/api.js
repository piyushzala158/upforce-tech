//third party
import axios from "axios";
import { toast } from "react-hot-toast";

//Endpoints
import { API_ENDPOINT } from "@/constants/appConstants";

const api = async ({
  endpoint,
  method = "GET",
  data = null,
  params = {},
  isMultipart = false,
}) => {
  try {
    const config = {
      method,
      url: API_ENDPOINT + endpoint,
      params: { ...params },
      data,
      headers: {},
    };

    if (isMultipart) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (typeof window !== "undefined") {
      if (status === 400) {
        toast.error("Bad Request: " + message);
      } else if (status === 401) {
        toast.error("Unauthorized: Please login first.");
      } else if (status === 403) {
        toast.error("Forbidden: You do not have permission.");
      } else if (status === 404) {
        toast.error("Not Found: The requested resource was not found.");
      } else if (status === 500) {
        toast.error("Server Error: Please try again later.");
      } else {
        toast.error(message);
      }
    }
    // console.error(`API Error: ${status} - ${message}`);
    throw error.response?.data || error.message;
  }
};

export default api;

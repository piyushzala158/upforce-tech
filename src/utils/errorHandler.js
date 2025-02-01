import { toast } from "react-hot-toast";

export const handleApiError = (error) => {
  const { status, message } = error;

  switch (status) {
    case 400:
      toast.error(`Bad Request: ${message}`);
      break;
    case 401:
      toast.error("Unauthorized: Please login first.");
      break;
    case 403:
      toast.error("Forbidden: You do not have permission.");
      break;
    case 404:
      toast.error("Not Found: The requested resource was not found.");
      break;
    case 500:
      toast.error("Server Error: Please try again later.");
      break;
    default:
      toast.error(message);
  }

  console.error(`API Error: ${status} - ${message}`);
};

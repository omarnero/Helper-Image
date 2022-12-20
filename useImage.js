import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import axios from "axios";
import Alerts from "components/Shared/Alert/Alert.jsx";
import ErrorAlert from "components/Shared/Alert/ErrorAlert.jsx";
const addImage = (data) => {
  return axios.post("https://dev-api.basekwt.com/uploads/image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useImage = () => {
  const token = useSelector((state) => state.auth.token);
  axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  return useMutation("addCityData", addImage, {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};

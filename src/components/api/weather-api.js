import axios from "axios";

const API_KEY = "7f88352b239028bc265174921a593a06";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=Barcelone&appid=${API_KEY}&units=metric`;
//`api.openweathermap.org/data/2.5/weather?q=${city}&appid=API_KEY`;

export default axios.create({
  baseURL: BASE_URL,
});

export const getTodayForecast = async (city, units = "metric") => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const response = await axios.get(baseUrl).catch((error) => {
    //console.log(error.response.status);
    return error;
  });

  return response;
};

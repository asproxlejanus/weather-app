import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getTodayForecast } from "../../api/weather-api";
import { AppContext } from "../../context/app-context";

const getTime = (time) => {
  const date = new Date(time * 1000);
  return date.toISOString();
};

const MainBoxContainer = styled.div`
  width: 100%;
  min-width: 450px;
  height: 100%;
  min-height: 400px;
  margin: auto;
`;

export const Today = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const { state } = useContext(AppContext);

  useEffect(async () => {
    const data = await getTodayForecast(`${state?.city}`);
    const isError = !!data?.response?.status;
    if (isError) {
      setIsLoading(false);
      //return setIsError(true);
    } else {
      const response = data.data;
      const weather = {
        clouds: response.clouds?.all,
        main: response.main,
        city: response.name,
        now: response.weather,
        wind: response.wind,
        sunrise: getTime(response.sys.sunrise),
        sunset: getTime(response.sys.sunset),
      };
      setIsError(false);
      setIsLoading(false);
      return setWeatherData(weather);
    }
  }, [state?.city]);

  console.log(weatherData);

  if (isLoading) {
    return <div> Loading </div>;
  }

  if (isError) {
    return <div>An error has ocurred</div>;
  } else {
    return (
      <MainBoxContainer>
        <div>
          <h1>{weatherData.city}</h1>
          <hr />
          Feels like: {weatherData?.main?.feels_like}
          <br />
          Humidity: {weatherData?.main?.humidity}
          <br />
          Presure: {weatherData?.main?.pressure}
          <br />
          Temp now: {weatherData?.main?.temp}
          <br />
          Temp max : {weatherData?.main?.temp_max}
          <br />
          Temp min : {weatherData?.main?.temp_min}
          <br />
          Sunrises: {weatherData?.sunrise} / Sunset: {weatherData?.sunset}
          <hr />
          <TodayNowDetails now={weatherData.now} />
        </div>
      </MainBoxContainer>
    );
  }
};

const TodayNowDetails = ({ now }) => {
  return (
    <div>
      {now?.map((item) => {
        return (
          <div key={item.id}>
            icon: {item.icon}
            description: {item.main}
          </div>
        );
      })}
    </div>
  );
};

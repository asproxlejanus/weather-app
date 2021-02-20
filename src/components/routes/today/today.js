import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getTodayForecast } from "../../api/weather-api";
import { AppContext } from "../../context/app-context";

const getDate = (time) => {
  const date = new Date(time * 1000);
  return date.toISOString();
};

const getTime = (time) => {
  return time.split("T")[1].split(".")[0];
};

const MainBoxContainer = styled.div`
  width: 100%;
  min-width: 450px;
  height: 100%;
  min-height: 400px;
  margin: auto;
`;

const MainCard = styled.div`
  width: 100% !important;
  margin: 20px 0px !important;

  .main-temp > h1 {
    font-size: 5em !important;
    margin: 20px 0px;
  }
`;

const Icon = styled.div`
  font-size: 50px;
`;

const WeatherIcon = ({ type }) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    switch (type) {
      case "01d":
        setIcon(<i class="fas fa-sun" />);
        break;
      case "01n":
        setIcon(<i class="fas fa-moon" />);
        break;
      case "02d":
        setIcon(<i className="fas fa-cloud-sun" />);
        break;
      case "02n":
        setIcon(<i className="fas fa-cloud-moon" />);
        break;
      case "03d":
        setIcon(<i className="fas fa-cloud" />);
        break;
      case "03n":
        setIcon(<i className="fas fa-cloud" />);
        break;
      case "04d":
        setIcon(<i className="fas fa-cloud" />);
        break;
      case "04n":
        setIcon(<i className="fas fa-cloud" />);
        break;
      case "09d":
        setIcon(<i className="fas fa-cloud-rain" />);
        break;
      case "09n":
        setIcon(<i className="fas fa-cloud-rain" />);
        break;

      default:
        break;
    }
  }, []);

  return <Icon>{icon}</Icon>;
};

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
        sunrise: getTime(getDate(response.sys.sunrise)),
        sunset: getTime(getDate(response.sys.sunset)),
      };
      setIsError(false);
      setIsLoading(false);
      return setWeatherData(weather);
    }
  }, [state?.city]);

  console.log(weatherData.now[0].icon);

  if (isLoading) {
    return <div> Loading </div>;
  }

  if (isError) {
    return <div>An error has ocurred</div>;
  } else {
    return (
      <MainBoxContainer>
        <MainCard className="ui card">
          <div className="image">
            <h1>{weatherData.city}</h1>

            <div className="ui grid">
              <div className="twelve wide column main-temp">
                <h1>{weatherData?.main?.temp}ºC</h1>
              </div>
              <div className="four wide column">
                <WeatherIcon type={weatherData?.now[0]?.icon} />
                <div>Max: {weatherData?.main?.temp_max}ºC</div>
                <div>Min: {weatherData?.main?.temp_min}ºC</div>
              </div>
            </div>
          </div>
          <div className="content">
            {/*             <a className="header">{weatherData.city}</a> */}
            <div className="meta">
              <span className="date">
                Feels like {weatherData?.main?.feels_like}ºC
              </span>
            </div>
            {/*             <div className="description">
              Kristy is an art director living in New York.
            </div> */}
          </div>
          <div className="extra content">
            <div className="ui grid">
              <div className="eight wide column">
                <i className="arrow alternate circle up outline icon" />
                {weatherData?.sunrise}
              </div>
              <div className="eight wide column">
                <i className="arrow alternate circle down outline icon" />{" "}
                {weatherData?.sunset}
              </div>
            </div>
          </div>
        </MainCard>
        <div>
          <hr />
          Feels like:
          <br />
          Humidity: {weatherData?.main?.humidity}
          <br />
          Presure: {weatherData?.main?.pressure}
          <br />
          Temp now:
          <br />
          Temp max :
          <br />
          Temp min :
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

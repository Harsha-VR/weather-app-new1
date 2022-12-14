import { BackgroundImage, Paper, TextInput, Group, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";

const API_KEY = "d0f30d0ef26524ab8fc67add631bf76d";

const Home: NextPage = () => {
  const [cityInput, setCityInput] = useState("");

  console.log("City input",cityInput);



  const [weatherData, setWeatherData] = useState<any>({});

  async function getWeatherData() {
    try {
      const serverResponse = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          cityInput +
          "&units=metric&appid=" +
          API_KEY
      );
      const data = await serverResponse.json();
      console.log(data);
      if (data?.cod === "400") throw data;
      setWeatherData(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      style={{
        position: "static",
        height: "100vh",
        backgroundImage:
          "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Paper withBorder p="lg" style={{ maxWidth: "500px" }}>
          <Group position="apart">
            <Text size="lg" weight={500}>
              Get the weather
            </Text>
          </Group>
          <Group position="apart">
            <Text size="lg" weight={500}>
              Enter a city and get weather below!
            </Text>
          </Group>
          <Group position="apart" mb="xs">
            <TextInput
              onChange={(e) => {
                setCityInput(e.target.value);
              }}
              label="City name"
              placeholder="ex:Mysuru"
            ></TextInput>
            <Button
              mt="xl"
              onClick={() => {
                getWeatherData();
              }}
            >
              Search City
            </Button>
          </Group>
          {Object.keys(weatherData).length !== 0 ? (
            <>
              <Group position="left">
                <Text size="lg" weight={500}>
                  <ul>
                    <li  style={{color:"black"}}>Name : {weatherData.name}</li>
                    <li style={{color:"dark blue"}}> currently Temp: {weatherData.main.temp} &deg;</li>
                    <li style={{color:"dark red"}}> Max Temp: {weatherData.main.temp_max} &deg;</li>
                    <li style={{color:"dark green"}}>Min Temp: {weatherData.main.temp_min} &deg;</li>
                    <li style={{color:""}}>Humidity: {weatherData.main.humidity} &deg;</li>
                  </ul>
                </Text>
              </Group>
            </>
          ) : null}
        </Paper>
      </div>
    </div>
  );
};

export default Home;

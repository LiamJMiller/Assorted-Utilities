document.getElementById("getWeather").addEventListener("click", function () {
  const apiKey = "6418b9965bc443dda79231847241802";
  const city = "London"; // Replace with the city you want

  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherData = document.getElementById("weatherData");
      let currentHtml = `
        <h2>Weather in ${data.location.name}</h2>
        <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
        <p><strong>Feels Like:</strong> ${data.current.feelslike_c} °C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        <p><strong>Humidity:</strong> ${data.current.humidity} %</p>
        <p><strong>UV Index:</strong> ${data.current.uv}</p>
      `;

      let forecastHtml = `<h2>Forecast</h2><div id="tableContainer"><table><tr><th class="sticky-column">Date</th><th>Max Temp (C)</th><th>Min Temp (C)</th><th>Avg Temp (C)</th><th>Max Wind (KPH)</th><th>Total Precipitation (MM)</th></tr>`;

      data.forecast.forecastday.forEach((day) => {
        const date = new Date(day.date);
        const formattedDate = `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`;

        forecastHtml += `
          <tr>
            <td data-column="Date" class="sticky-column">${formattedDate}</td>
            <td data-column="Max Temp (C)">${day.day.maxtemp_c}</td>
            <td data-column="Min Temp (C)">${day.day.mintemp_c}</td>
            <td data-column="Avg Temp (C)">${day.day.avgtemp_c}</td>
            <td data-column="Max Wind (KPH)">${day.day.maxwind_kph}</td>
            <td data-column="Total Precipitation (MM)">${day.day.totalprecip_mm}</td>
          </tr>
        `;
      });

      forecastHtml += "</table></div>";
      weatherData.innerHTML = currentHtml + forecastHtml;
    })
    .catch((error) => console.error("Error:", error));
});

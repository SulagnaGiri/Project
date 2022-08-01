var express = require('express');
const app = express()
const port = 8080
const https = require('https');
const bodyParser = require("body-parser");
const request = require('request');
const request_promise = require("request-promise");
var moment = require('moment-timezone');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/Public'));
function call_ny(req, res) {
   const url = "https://api.openweathermap.org/data/2.5/onecall?lat=40.7128&lon=-74.0060&appid=a7992f4410817b335549d20021dff616&units=metric&exclude=hourly,minutely";

   https.get(url, function (response) {
      response.on('data', function (data) {
         const weahtherUpdate = JSON.parse(data);
         var city = weahtherUpdate.timezone;
         // var countryName = weahtherUpdate.sys.country;

         d = new Date()
         localTime = d.getTime()
         localOffset = d.getTimezoneOffset() * 60000
         utc = localTime + localOffset
         var New_York = utc + (1000 * -14400)
         nd = new Date(New_York)

         var formatTime = new Date(New_York).toLocaleTimeString({
            hour: '2-digit',
            minute: '2-digit'
         });
         var pressure = weahtherUpdate.current.pressure;
         var wind = weahtherUpdate.current.wind_speed;
         var humidity = weahtherUpdate.current.humidity;
         var day = nd.getDate();
         var month = nd.toLocaleString('en-us', { month: 'short' });
         var daytime = nd.toLocaleString('en-us', { weekday: 'long' });
         // var image = weahtherUpdate.current.weather[0].icon;
         res.setHeader("Content-Type", "text/html")
         var iconURL = "http://openweathermap.org/img/wn/" + weahtherUpdate.current.weather[0].icon + "@2x.png";
         var temp = weahtherUpdate.current.temp
         res.locals.icon = iconURL
         res.locals.tem = temp
         res.locals.timeNewyork = formatTime
         res.locals.dayNewyork = day
         res.locals.monthNewyork = month
         res.locals.daytimeNewyork = daytime
         res.locals.nameCity = city
         // res.locals.country1 = countryName
         res.locals.humidityNewyork = humidity
         res.locals.wind = wind
         res.locals.pressureNewyork = pressure

         date = new Array();
         icon_city = new Array();
         mintemp = new Array();
         for (let i = 0; i <= 7; i++) {
            mintemp[i] = weahtherUpdate.daily[i].temp.min
            res.locals.minTemp = mintemp
            icon_city[i] = "http://openweathermap.org/img/wn/" + weahtherUpdate.daily[i].weather[0].icon + "@2x.png";
            // res.locals.iconCity = icon_city;
            date[i] = moment().add(i, 'day').tz("America/New_York").format("ddd DD")
            res.locals.iconCity = icon_city

            res.locals.dayCity = date

         }
         maxtemp = new Array();
         for (let i = 0; i <= 7; i++) {
            maxtemp[i] = weahtherUpdate.daily[i].temp.max
            res.locals.maxTem = maxtemp
         }




         res.render("index")
      })
   })
}



app.get("/", call_ny)





app.post('/', function (req, res) {
   const query = req.body.cityName;
   const url1 = "https://api.weatherbit.io/v2.0/forecast/daily?format=JSON&city=" + query + "&key=f8dd5d098be94134bcb279668bbaa457&units=metric";
   https.get(url1, function (response) {
      let result = '';
      response.on("data", (data) => {
         result += data;
      });
      response.on('end', () => {
         const weatherUpdate = JSON.parse(result);
         // const weatherUpdate = data1
         var city = weatherUpdate.city_name;
         var zone = weatherUpdate.timezone;
         var formatTime = new Date().toLocaleString([], { timeZone: zone, timeStyle: 'medium', hourCycle: 'h12' })
         var pressure = weatherUpdate.data[0].pres;
         var wind = weatherUpdate.data[0].wind_gust_spd;
         var humidity = weatherUpdate.data[0].rh;
         var daytime = moment().tz(zone).format("dddd")

         var month = moment().tz(zone).format("MMM")
         var day = moment().tz(zone).format("DD")
         res.setHeader("Content-Type", "text/html")
         var iconURL = " https://www.weatherbit.io/static/img/icons/" + weatherUpdate.data[0].weather.icon + ".png";
         var temp = weatherUpdate.data[0].temp;
         res.locals.icon = iconURL
         res.locals.tem = temp
         res.locals.timeNewyork = formatTime
         res.locals.dayNewyork = day
         res.locals.monthNewyork = month
         res.locals.daytimeNewyork = daytime
         res.locals.nameCity = city
         // res.locals.country1 = countryName
         res.locals.humidityNewyork = humidity
         res.locals.wind = wind
         res.locals.pressureNewyork = pressure

         date = new Array();
         icon_city = new Array();
         mintemp = new Array();
         for (let i = 0; i <= 7; i++) {
            mintemp[i] = weatherUpdate.data[i].low_temp
            res.locals.minTemp = mintemp
            icon_city[i] = " https://www.weatherbit.io/static/img/icons/" + weatherUpdate.data[i].weather.icon + ".png";
            // res.locals.iconCity = icon_city;
            date[i] = moment().add(i, 'day').tz(zone).format("ddd DD")
            res.locals.iconCity = icon_city

            res.locals.dayCity = date

         }
         maxtemp = new Array();
         for (let i = 0; i <= 7; i++) {
            maxtemp[i] = weatherUpdate.data[0].max_temp
            res.locals.maxTem = maxtemp
         }




         res.render("index")




      })
   })
})


app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})


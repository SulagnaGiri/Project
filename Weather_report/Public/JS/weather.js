$('#myCarousel').carousel({
  interval: 5000
})

var time1 = function () {
  document.querySelector(".number1").innerHTML = new Date().toLocaleString([], { timeZone: 'Europe/Amsterdam', timeStyle: 'short', hourCycle: 'h24' })
  return document.querySelector(".number1").innerHTML
}
time1();
if ("04:00" < time1() && time1() < "17:00") {
  document.querySelector(".sun1").innerHTML = "☀️"
}
else {
  document.querySelector(".sun1").innerHTML = "🌙"
}
setInterval(time1, 1000);

var time2 = function () {
  document.querySelector(".number2").innerHTML = new Date().toLocaleString([], { timeZone: 'Europe/London', timeStyle: 'short', hourCycle: 'h24' })
  return document.querySelector(".number2").innerHTML
}
time2();
if ("04:00" < time2() && time2() < "17:00") {
  document.querySelector(".sun2").innerHTML = "☀️"
}
else { document.querySelector(".sun2").innerHTML = "🌙" }
setInterval(time2, 1000);

var time3 = function () {
  document.querySelector(".number3").innerHTML = new Date().toLocaleString([], { timeZone: 'Europe/Budapest', timeStyle: 'short', hourCycle: 'h24' })
  return document.querySelector(".number3").innerHTML
}
time3();
if ("04:00" < time3() && time3() < "17:00") {
  document.querySelector(".sun3").innerHTML = "☀️"
}
else { document.querySelector(".sun3").innerHTML = "🌙" }
setInterval(time3, 1000);

var time4 = function () {
  document.querySelector(".number4").innerHTML = new Date().toLocaleString([], { timeZone: 'Europe/Paris', timeStyle: 'short', hourCycle: 'h24' })
  return document.querySelector(".number4").innerHTML
}
time4();
if ("04:00" < time4() && time4() < "17:00") {
  document.querySelector(".sun4").innerHTML = "☀️"
}
else { document.querySelector(".sun4").innerHTML = "🌙" }
setInterval(time4, 1000);

var time5 = function () {
  document.querySelector(".number5").innerHTML = new Date().toLocaleString([], { timeZone: 'America/Chicago', timeStyle: 'short', hourCycle: 'h24' })
  return document.querySelector(".number5").innerHTML
}
time5();
if ("04:00" < time5() && time5() < "17:00") {
  document.querySelector(".sun5").innerHTML = "☀️"
}
else { document.querySelector(".sun5").innerHTML = "🌙" }
setInterval(time5, 1000);
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);











// <%=minTemp%>
// <%=maxTem%><br>
//   <%=day1%>
//     <%=month1%>
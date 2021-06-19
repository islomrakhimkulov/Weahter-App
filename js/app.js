const address = document.querySelector('h1 span');
const input = document.querySelector('input');
const button = document.querySelector('.search');

const boxes = document.querySelectorAll('.box');
const box1 = boxes[0];
const box2 = boxes[1];
const box3 = boxes[2];

const spinner = '<div class="spinner"></div>';

const  BASE_URL = 'http://api.weatherapi.com/v1';
const API_KEY = 'caaeb0fb1a8b455f83385939212904';

const  url = function(value){
  return BASE_URL+'/forecast.json?key='+API_KEY+'&q='+value+'&days=3';
};


sendRequest(url(input.value),displayWeather);

function sendRequest(url='',cb){
  
  boxes.forEach(function(item){
    item.innerHTML = spinner;
  });
  
  fetch(url)
  .then(function(res){
    return res.json()
  })
  .then(function(data){
    cb(data);
  })
  
}

button.addEventListener('click',function(){
  sendRequest(url(input.value),displayWeather);
})
function displayWeather(obj){
   box1.innerHTML = '';
   box2.innerHTML = '';
   box3.innerHTML = '';
  
  const name = obj.location.name,
        temp_c = obj.current.temp_c,
        humidity = obj.current.humidity,
        wind_kph = obj.current.wind_kph,
        cloud = obj.current.cloud,
        pressure_mb = obj.current.pressure_mb,
        pressure_in = obj.current.pressure_in,
        wind_degree = obj.current.wind_degree,
        text = obj.current.condition.text,
        icon = obj.current.condition.icon;
        
  address.innerHTML = name;
  
  var html1 = '<div class="box-title text-center border-bottom">Local weather report</div>'+
            '<div class="today-forecast">'+
              '<div class="d-flex justify-content-between">'+
                '<span class="today text-uppercase">' + getTime().toUpperCase() +'</span>'+
                '<span class="condition text-uppercase">'+ text +'</span>'+
              '</div>'+
              '<img class="today-img" src="'+ icon +'" alt="'+ text +'">'+
              '<span class="today-temp d-block">Temperature '+ temp_c +'<sup>&deg;</sup>C</span>'+
            '</div>';
  
  box1.insertAdjacentHTML('beforeend',html1);
  
  var html2 = '<div class="box-title text-center border-bottom">Sea forecast report</div>'+
          ' <ul class="detail-info">'+
             '<li><span>Humidity</span><small>' + humidity +  ' %</small></li>'+
             '<li><span>Wind speed</span><small>'+ wind_kph + ' kph</small></li>'+
             '<li><span>Wind</span><small>' + wind_degree +'&deg; C</small></li>'+
             '<li><span>Pressure</span><small>'+ pressure_mb + ' mb</small></li>'+
             '<li><span>Cloud</span><small>' + cloud + '&deg; F</small></li>'+
           '</ul>';
  box2.insertAdjacentHTML('beforeend',html2);
  
  forecast(obj.forecast.forecastday);
  
}

function forecast(item=[]){
   const row = document.createElement('div');
   row.classList.add('row');
  
  item.forEach(function(el){
  
    
    const icon = el.day.condition.icon,
          avgtemp_c = el.day.avgtemp_c;
    
     var html3 = '<div class="col-md-4 p-0 text-center">'+
            '<div class="text-center mb-4">'+ getTime(new Date(el.date)).toUpperCase() +'</div>'+
            '<img src="'+ icon +'" alt="">'+
            '<span class="d-block text-center fs-3">'+ avgtemp_c + '<sup>&deg;</sup>C</span>'+
        '</div>' ;
  row.insertAdjacentHTML('beforeend',html3);
  });
  box3.appendChild(row);
}


function getTime(date = new Date(),status="weekday"){
  return date.toLocaleString('en-EN',{[status]:'long'});
}
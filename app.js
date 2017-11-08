var start = document.getElementById('start');
var stop = document.getElementById('stop');
var display = document.getElementById('distDisplay');
var timeDisplay = document.getElementById('timeDisplay');
var startTime;
var startPos;
start.addEventListener('click', function(event){
  navigator.geolocation.getCurrentPosition(function(position){
   startTime = moment();					
   startPos = position;
  });
});	
    
stop.addEventListener('click', function(){
  navigator.geolocation.getCurrentPosition(function(position){
    var endTime = moment(); 
					
    display.innerHTML = distance(startPos.coords.latitude, startPos.coords.longitude, position.coords.latitude, position.coords.longitude);
    timeDisplay.innerHTML = time(startTime, endTime);
  });
});


function distance(lat1, lon1, lat2, lon2, unit) {
 var radlat1 = Math.PI * lat1/180
 var radlat2 = Math.PI * lat2/180
 var theta = lon1-lon2
 var radtheta = Math.PI * theta/180
 var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
 dist = Math.acos(dist)
 dist = dist * 180/Math.PI
 dist = dist * 60 * 1.1515
 if (unit=="K") { dist = dist * 1.609344 }
 if (unit=="N") { dist = dist * 0.8684 }
 return dist;
}

function time(start, end){
	return moment(moment(end,"hh:mm:ss").diff(moment(start,"hh:mm:ss"))).format("hh:mm:ss");
}

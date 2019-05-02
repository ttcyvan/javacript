

const weatherIcons = {
	"Windy" : "wi wi-day-windy",
	"Storm" : "wi wi-day-storm",
	"Sunny" : "wi wi-day-sunny",
	"Cloudy" : "wi wi-day-cloudy",
	"Rain" : "wi wi-day-rain",
	"Clouds" : "wi wi-day-cloudy-gusts",
	"Clear" : "wi wi-sunny-overcast",
	"Snow" : "wi wi-day-snow",
	"Mist" : "wi wi-windy",
	"Drizzle" : "wi wi-day-sleet",
}

/* met la premier lettre en majuscule**/
function capitalize(str){
	return str[0].toUpperCase() + str.slice(1);
}



async function main(witpIp = true) 
{
	let ville;
	if(witpIp){
		const ip = await fetch('https://api.ipify.org?format=json')
	.then( resultat => resultat.json())
	.then(json => json.ip) /***on optient l'adress ip de la personne*/

					/* je fais appele a la librarie freegeoip*/

	 ville = await fetch('http://api.ipstack.com/'+ip+'?access_key=5b7cf92174394235583149ff0d966217')
	.then (resultat  => resultat.json())
	.then(json => json.city)
}


else{
	ville = document.querySelector('#ville').textContent;
}
					
													/* je fais appelle a openwearsermap*/
	const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+ville+'&lang=fr&appid=307cadcdfe005682b17ba8bc0e4b9a2a&lang=fr&units=metric')
	.then(resultat => resultat.json())
	.then(json => json)

	console.log(meteo);

donnesMeteo(meteo);
	
}


function donnesMeteo(donnes) {
	
	const temperature = donnes.main.temp;
	const name = donnes.name;
	const conditions = donnes.weather[0].main;
	const descriptions = donnes.weather[0].description;	

	document.querySelector('#ville').textContent=name;
	document.querySelector('#temperature').textContent= Math.round(temperature);
	document.querySelector('#condition').textContent= descriptions;
	
	document.querySelector('i.wi').className = weatherIcons[conditions]; /*celon les condition meteologique*/

	document.body.className = conditions.toLowerCase(); //*image*/
}

ville = document.querySelector('#ville');
ville.addEventListener('click', function(){
	ville.contentEditable = true;
});
/* tapez sur entrer*/
ville.addEventListener('keydown', (e) => {
	if(e.keyCode == 13){
		/* ne pas aller a la ligne*/
		e.preventDefault();
		ville.contentEditable = false;/***arret editer*/
		main(false);
	}
});

main();

function error () { return true; }
window.onerror = error;

/* l'adress ip pour la ville */


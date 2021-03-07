const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const iconcontainer = document.querySelector('.icon');


const updateUI = (data) =>{
    const cityDets = data.cityDets;
    const weather = data.weather;
    console.log(data);

    //update template
    let textdaynight = null;
    if(weather.IsDayTime){     
        textdaynight = 'Day Time'

    }else{
        textdaynight = 'Night Time'
    }

    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <p class="my-3 citydet">${cityDets.AdministrativeArea.LocalizedName},${cityDets.Country.EnglishName}</p>
    <p class="my-3 citydet">${textdaynight}</p>
    <div class="my-3">Weather : ${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSrc);


    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
        textdaynight = 'Day Time'

    }else{
        timeSrc = 'img/night.svg';
        textdaynight = 'Night Time'
    }

    time.setAttribute('src', timeSrc);







    //remove display none

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }


}

const updateCity = async (city) => {
    
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);


    return {
        cityDets: cityDets,
        weather: weather
    };

};











cityForm.addEventListener('submit', e=>{
    e.preventDefault();


    //get city value and clear the input
    const city = cityForm.city.value.trim();
    cityForm.reset();



    //update city data
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err=>console.log(err));

    


});
import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: '/Image/clouds.png',
    });
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=efbee88126a7b9c2926e3508a7e67c2a&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagepath = '';
                    const weatherCondition = res.data.weather && res.data.weather[0].main;
                    if (weatherCondition === "Clouds") {
                        imagepath = "/Image/clouds.png";
                    } else if (weatherCondition === "Clear") {
                        imagepath = "/Image/clear.png";
                    } else if (weatherCondition === "Rain") {
                        imagepath = "/Image/rain.png";
                    } else if (weatherCondition === "Drizzle") {
                        imagepath = "/Image/drizzle.png";
                    } else if (weatherCondition === "Mist") {
                        imagepath = "/Image/mist.png";
                    } else {
                        imagepath = '/Image/clouds.png';
                    }
                    setData({...data,celcius: res.data.main.temp,
                        name: res.data.name,
                        humidity: res.data.main.humidity,
                        speed: res.data.wind.speed,
                        image: imagepath,});
                    setError('');
                })
                .catch(err => {
                    if (err.response && err.response.status === 404) {
                        setError("Invalid City Name");
                    } else {
                        setError('');
                    }
                    console.log(err);
                });
        }
    }

    return (
        <div className='container'>
            <div className='weather'>
                <div className="search">
                    <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button><img src="/Image/search.png" onClick={handleClick} alt=" " /></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="" />
                    <h1>{Math.round(data.celcius)}°c</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="/Image/humidity.png" alt='' />
                            <div className='humidity'>
                                <p>{Math.round(data.humidity)}%</p>
                                <p>humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="/Image/wind.png" alt='' />
                            <div className='wind'>
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

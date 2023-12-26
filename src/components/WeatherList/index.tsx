import React, { useState } from 'react';
import { weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

interface CityWeather {
  id: number;
  city: string;
  temperature: number;
  description: string;
}

const WeatherList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const [searchResults, setSearchResults] = useState<CityWeather[]>([]);
  const [favorites, setFavorites] = useState<CityWeather[]>([]);

  const handleSearch = () => {
    const results = weatherData.filter((city) =>
      city.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };
  
  const addToFavorites = (city: CityWeather) => {
    if (!favorites.some((favCity) => favCity.city === city.city)) {
      setFavorites((prevFavorites) => [...prevFavorites, city]);
    }
  };

  const removeFromFavorites = (city: CityWeather) => {
    const updatedFavorites = favorites.filter((favCity) => favCity.city !== city.city);
    setFavorites(updatedFavorites);
  };
  
  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={(event) => setSearchQuery(event.target.value)}
            data-testid="search-input"
          />
          <button onClick={handleSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((city, index) => (
              <WeatherCard
                key={index}
                unit=''
                weather={city}
                onAddFavorite={() => addToFavorites(city)}
                onRemoveFavorite={() => removeFromFavorites(city)}
                isFavorite={favorites.some((favCity) => favCity.city === city.city)}
              />
            ))}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={toggleTemperatureUnit} data-testid="unit-change-button" className="outlined">
            Switch to {temperatureUnit === 'C' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((city, index) => (
              <WeatherCard
                key={index}
                weather={city}
                unit={temperatureUnit}
                onAddFavorite={() => addToFavorites(city)}
                onRemoveFavorite={() => removeFromFavorites(city)}
                isFavorite={true}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
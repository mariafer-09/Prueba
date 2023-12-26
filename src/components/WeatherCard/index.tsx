import React from 'react';

interface WeatherData {
  id: number;
  city: string;
  temperature: number;
  description: string;
}

interface WeatherCardProps {
  weather: WeatherData;
  unit: string;
  onAddFavorite: (city: WeatherData) => void;
  onRemoveFavorite: (city: WeatherData) => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  const { id, city, temperature, description } = weather;

  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(weather);
    } else {
      onAddFavorite(weather);
    }
  };

  const convertTemperature = (temp: number, targetUnit: string) => {
    if (targetUnit === 'Fahrenheit') {
      return ((temp * 9) / 5) + 32;
    }
    return temp;
  };

  const convertedTemperature = unit === 'Celsius' ? temperature : convertTemperature(temperature, 'Fahrenheit');

  return (
    <tr className="weather-card" data-testid={`weather-card-${id}`}>
      <td>{city}</td>
      <td>{`${convertedTemperature}°${unit === 'Celsius' ? 'C' : 'F'}`}</td>
      <td>{description}</td>
      <td>
        <button onClick={handleFavoriteClick} data-testid={`weather-card-action-${id}`}>
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </td>
    </tr>
  );
};

export default WeatherCard;

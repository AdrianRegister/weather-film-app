import MovieSearchWidget from './movie-search-widget/MovieSearchWidget.jsx';
import WeatherWidget from './weather-widget/WeatherWidget.jsx';

const App = () => {
  return (
    <div className="grid grid-cols-4">
      <WeatherWidget />
      <MovieSearchWidget />
    </div>
  );
};

export default App;

import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Scoreboard />
    </div>
  );
};

export default App;

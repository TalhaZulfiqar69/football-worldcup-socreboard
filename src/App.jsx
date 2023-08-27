import "./App.css";
import { Box, Container } from "@chakra-ui/react";
import Scoreboard from "./components/Scoreboard";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <Box className="App">
      <Navigation />
      <Box p={4}>
        <Container>
          <Scoreboard />
        </Container>
      </Box>
    </Box>
  );
};

export default App;

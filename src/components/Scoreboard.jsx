import React, { useState } from "react";
import Match from "./Match";

import { Button, Heading, Box } from "@chakra-ui/react";

const Scoreboard = () => {
  const [matches, setMatches] = useState([]);

  const handleStartMatch = (homeTeam, awayTeam, homeScore, awayScore) => {
    const newMatch = { homeTeam, awayTeam, homeScore: 0, awayScore: 0 };
    setMatches([...matches, newMatch]);
  };

  const handleUpdateScore = (
    index,
    homeScore,
    awayScore,
    homeTeam,
    awayTeam
  ) => {
    const updatedMatches = [...matches];
    updatedMatches[index].homeScore = homeScore;
    updatedMatches[index].homeTeam = homeTeam;
    updatedMatches[index].awayScore = awayScore;
    updatedMatches[index].awayTeam = awayTeam;
    setMatches(updatedMatches);
  };

  const handleFinishMatch = (index) => {
    const updatedMatches = matches.filter((_, i) => i !== index);
    setMatches(updatedMatches);
  };

  return (
    <Box alignItems="center">
      {matches.map((match, index) => (
        <span data-testid="match-summary" key={index}>
          <Match
            matches={matches}
            key={index}
            match={match}
            onUpdateScore={(homeScore, awayScore, homeTeam, awayTeam) =>
              handleUpdateScore(index, homeScore, awayScore, homeTeam, awayTeam)
            }
            onFinish={() => handleFinishMatch(index)}
          />
        </span>
      ))}

      <Heading as="h4" size="md" textAlign={"center"} mb={4}>
        Click Start Match Button To Start
      </Heading>

      <Button
        onClick={() => handleStartMatch()}
        textAlign={"center"}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        _hover={{
          bgGradient: "linear(to-l, #7928CA, #FF0080)",
        }}
        color={"#ffffff"}
      >
        Start Match
      </Button>
    </Box>
  );
};

export default Scoreboard;

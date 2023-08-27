import React from "react";
import { Heading, Box, OrderedList, ListItem } from "@chakra-ui/react";

const MatchSummary = ({ matches }) => {
  const sortedMatches = matches.slice().sort((a, b) => {
    if (a.homeScore + a.awayScore === b.homeScore + b.awayScore) {
      return b.startTimestamp - a.startTimestamp; // Adjust this as needed
    }
    return b.homeScore + b.awayScore - a.homeScore - a.awayScore;
  });

  return (
    <>
      <Heading as={"h2"} size={"md"}>
        Match Summaries
      </Heading>
      <Box mb={4}>
        <OrderedList data-testid="match-summary">
          {sortedMatches.map((match, index) => (
            <ListItem key={index}>
              {match.homeTeam} {match.homeScore} - {match.awayTeam}{" "}
              {match.awayScore}
            </ListItem>
          ))}
        </OrderedList>
      </Box>
    </>
  );
};

export default MatchSummary;

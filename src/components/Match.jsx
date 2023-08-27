import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Box,
  Grid,
  GridItem,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
} from "@chakra-ui/react";

import MatchSummary from "./MatchSummary";

const Match = ({ match, onUpdateScore, onFinish, matches }) => {
  const [homeScore, setHomeScore] = useState(0);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayScore, setAwayScore] = useState(0);
  const [awayTeam, setAwayTeam] = useState("");
  const [showSummaries, setShowSummaries] = useState(false);

  const handleUpdateScore = () => {
    onUpdateScore(homeScore, awayScore, homeTeam, awayTeam);
  };

  const handleToggleSummaries = () => {
    setShowSummaries(!showSummaries);
  };
  return (
    <Box>
      <Card mb={4}>
        <CardHeader>
          <Heading as="h4" size="md" textAlign={"center"}>
            {match.homeTeam} VS {match.awayTeam}
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Heading as={"h5"} size={"md"}>
              {match.homeTeam} {homeScore} - {match.awayTeam} {awayScore}
            </Heading>

            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel fontWeight={"bold"}>Home Team Name:</FormLabel>
                  <Input
                    placeholder="Enter home team name"
                    type="text"
                    value={homeTeam}
                    onChange={(e) => setHomeTeam(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel fontWeight={"bold"}>Home Team Score:</FormLabel>
                  <Input
                    type="number"
                    value={homeScore}
                    onChange={(e) => setHomeScore(e.target.value)}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel fontWeight={"bold"}>Away Team Name:</FormLabel>
                  <Input
                    placeholder="Enter away team name"
                    type="text"
                    value={awayTeam}
                    onChange={(e) => setAwayTeam(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel fontWeight={"bold"}>Away Team Score:</FormLabel>
                  <Input
                    type="number"
                    value={awayScore}
                    onChange={(e) => setAwayScore(e.target.value)}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <Flex mt={4} mb={4}>
              <Button
                onClick={handleUpdateScore}
                mr={14}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                _hover={{
                  bgGradient: "linear(to-l, #7928CA, #FF0080)",
                }}
                color={"#ffffff"}
              >
                Update Score
              </Button>
              <Button
                onClick={onFinish}
                mr={14}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                _hover={{
                  bgGradient: "linear(to-l, #7928CA, #FF0080)",
                }}
                color={"#ffffff"}
              >
                Finish Match
              </Button>
              {matches?.length ? (
                <Button
                  onClick={handleToggleSummaries}
                  mb={4}
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  _hover={{
                    bgGradient: "linear(to-l, #7928CA, #FF0080)",
                  }}
                  color={"#ffffff"}
                >
                  View Match Summaries
                </Button>
              ) : (
                ""
              )}
            </Flex>
          </Stack>
        </CardBody>
      </Card>

      {showSummaries && <MatchSummary matches={matches} />}
    </Box>
  );
};

export default Match;

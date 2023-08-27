import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import MatchSummary from "../components/MatchSummary";
import mockTheme from "../chakra-ui-mock-theme";

expect.extend(toHaveNoViolations);

const extendedTheme = extendTheme({ ...mockTheme });
// TESTCASE # 1: Check initial state rendering
// DESCRIPTION: Here I am testing if the component renders withour errors and the the initial state is set correctly or not.
test("should render match summary component", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <MatchSummary matches={[]} />
    </ChakraProvider>
  );
});

// TESTCASE # 2: Accessibility test
// DESCRIPTION:  Here I am testing the component for accessibility issues using tools like Jest Axe or React Testing Library's axe function.
test("component has no accessibility violations", async () => {
  const mockMatches = [
    { homeTeam: "Team A", awayTeam: "Team B", homeScore: 3, awayScore: 2 },
  ];

  const { container } = render(
    <ChakraProvider theme={extendedTheme}>
      <MatchSummary matches={mockMatches} />
    </ChakraProvider>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

// TESTCASE # 3: Match summaries
// DESCRIPTION:  Here I am testing that if match summaries are sorted correctly.
test("sorts match summaries correctly", () => {
  const mockMatches = [
    { homeTeam: "Team A", awayTeam: "Team B", homeScore: 3, awayScore: 2 },
    { homeTeam: "Team C", awayTeam: "Team D", homeScore: 1, awayScore: 1 },
  ];

  render(
    <ChakraProvider theme={extendedTheme}>
      <MatchSummary matches={mockMatches} />
    </ChakraProvider>
  );

  const matchSummaries = screen.getAllByTestId("match-summary");
  expect(matchSummaries[0]).toHaveTextContent("Team A 3 - Team B 2");
});

// TESTCASE # 3: Empty rendering without crash
// DESCRIPTION:  Here I am testing that the component renders without crashing with empty matches.
test("renders without crashing with empty matches", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <MatchSummary matches={[]} />
    </ChakraProvider>
  );
});

// TESTCASE # 5: Snapshot matching
// DESCRIPTION:  Here I am testing that if something change in component each time when testcases executes.
test("component snapshot matches", () => {
  const mockMatches = [
    { homeTeam: "Team A", awayTeam: "Team B", homeScore: 3, awayScore: 2 },
  ];

  const { container } = render(
    <ChakraProvider theme={extendedTheme}>
      <MatchSummary matches={mockMatches} />
    </ChakraProvider>
  );
  expect(container).toMatchSnapshot();
});

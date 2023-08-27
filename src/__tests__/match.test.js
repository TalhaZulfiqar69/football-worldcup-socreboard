import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Match from "../components/Match";
import mockTheme from "../chakra-ui-mock-theme";

const extendedTheme = extendTheme({ ...mockTheme });
// TESTCASE # 1: Check initial state rendering
// DESCRIPTION: Here I am testing if the component renders withour errors and the the initial state is set correctly or not.
test("renders component with initial state", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Match
        match={{}}
        onUpdateScore={() => {}}
        onFinish={() => {}}
        matches={[]}
      />
    </ChakraProvider>
  );

  // Assertions for home team input
  const homeTeamInput = screen.getByPlaceholderText("Enter home team name");
  expect(homeTeamInput).toBeInTheDocument();
  expect(homeTeamInput.value).toBe("");

  const homeScoreInput = screen.getByLabelText("Home Team Score:");
  expect(homeScoreInput).toBeInTheDocument();
  expect(homeScoreInput.value).toBe("0");

  // Assertions for away team input
  const awayTeamInput = screen.getByPlaceholderText("Enter away team name");
  expect(awayTeamInput).toBeInTheDocument();
  expect(awayTeamInput.value).toBe("");

  const awayScoreInput = screen.getByLabelText("Away Team Score:");
  expect(awayScoreInput).toBeInTheDocument();
  expect(awayScoreInput.value).toBe("0");
});

// TESTCASE # 2: Input and State Interaction
// DESCRIPTION: Here I am testing that input fields interact with state correctly or not.
test("input fields interact with state", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Match
        match={{}}
        onUpdateScore={() => {}}
        onFinish={() => {}}
        matches={[]}
      />
    </ChakraProvider>
  );

  // Simulate user input
  const homeTeamInput = screen.getByPlaceholderText("Enter home team name");
  fireEvent.change(homeTeamInput, { target: { value: "Home Team" } });
  expect(homeTeamInput.value).toBe("Home Team");

  const homeScoreInput = screen.getByLabelText("Home Team Score:");
  fireEvent.change(homeScoreInput, { target: { value: "2" } });
  expect(homeScoreInput.value).toBe("2");

  const awayTeamInput = screen.getByPlaceholderText("Enter away team name");
  fireEvent.change(awayTeamInput, { target: { value: "Away Team" } });
  expect(awayTeamInput.value).toBe("Away Team");

  const awayScoreInput = screen.getByLabelText("Away Team Score:");
  fireEvent.change(awayScoreInput, { target: { value: "2" } });
  expect(awayScoreInput.value).toBe("2");
});

// TESTCASE # 3: Button clicks
// DESCRIPTION: Here I am testing that button clicks trigger the expected functions or not.
test("button clicks trigger functions", () => {
  const mockUpdateScore = jest.fn();
  const mockOnFinish = jest.fn();
  const mockMatches = [];

  render(
    <ChakraProvider theme={extendedTheme}>
      <Match
        match={{}}
        onUpdateScore={mockUpdateScore}
        onFinish={mockOnFinish}
        matches={mockMatches}
      />
    </ChakraProvider>
  );

  // Simulate button clicks
  const updateScoreButton = screen.getByText("Update Score");
  fireEvent.click(updateScoreButton);
  expect(mockUpdateScore).toHaveBeenCalledTimes(1);

  const finishMatchButton = screen.getByText("Finish Match");
  fireEvent.click(finishMatchButton);
  expect(mockOnFinish).toHaveBeenCalledTimes(1);
});

// TESTCASE # 4: Toggle summaries
// DESCRIPTION: Here I am testing that when I click the button the match summaries are toggled correctly or not.
test("toggle summaries button works", () => {
  const mockMatches = [
    { homeScore: 1, awayScore: 2 },
    { homeScore: 3, awayScore: 4 },
  ];

  const { rerender } = render(
    <ChakraProvider theme={extendedTheme}>
      <Match
        match={{}}
        onUpdateScore={() => {}}
        onFinish={() => {}}
        matches={mockMatches}
      />
    </ChakraProvider>
  );

  // Initial state, summaries should be hidden
  const summariesComponent = screen.queryByTestId("match-summary");
  expect(summariesComponent).toBeNull();

  // Click on the toggle summaries button
  const toggleSummariesButton = screen.getByText("View Match Summaries");
  fireEvent.click(toggleSummariesButton);

  rerender(
    <ChakraProvider theme={extendedTheme}>
      <Match
        match={{}}
        onUpdateScore={() => {}}
        onFinish={() => {}}
        matches={mockMatches}
      />
    </ChakraProvider>
  );

  const visibleSummariesComponent = screen.getByTestId("match-summary");
  expect(visibleSummariesComponent).toBeInTheDocument();
});

// TESTCASE # 5: Performance test
// DESCRIPTION: Here I am testing the component's performance by rendering a large number of components and measuring the time it takes.
test("renders multiple components without performance issues", () => {
  const mockMatches = new Array(1000).fill({ homeScore: 0, awayScore: 0 });

  const startTime = performance.now();
  render(
    <ChakraProvider theme={extendedTheme}>
      <Match
        match={{}}
        onUpdateScore={() => {}}
        onFinish={() => {}}
        matches={mockMatches}
      />
    </ChakraProvider>
  );
  const endTime = performance.now();

  const renderTime = endTime - startTime;
  expect(renderTime).toBeLessThan(100);
});

// TESTCASE # 6: Accessibility test
// DESCRIPTION:  Here I am testing the component for accessibility issues using tools like Jest Axe or React Testing Library's axe function.
test("component has no accessibility violations", async () => {
  const { container } = render(
    <ChakraProvider theme={extendedTheme}>
      <Match
        match={{}}
        onUpdateScore={() => {}}
        onFinish={() => {}}
        matches={[]}
      />
    </ChakraProvider>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

// TESTCASE # 6: Snapshot matching
// DESCRIPTION:  Here I am testing that if something change in component each time when testcases executes.
test("component snapshot matches", () => {
  const mockMatch = {
    homeTeam: "Team A",
    awayTeam: "Team B",
  };

  const { container } = render(
    <ChakraProvider theme={extendedTheme}>
      <Match
        match={mockMatch}
        onUpdateScore={() => {}}
        onFinish={() => {}}
        matches={[]}
      />
    </ChakraProvider>
  );

  expect(container).toMatchSnapshot();
});

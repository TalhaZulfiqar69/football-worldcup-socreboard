import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Scoreboard from "../components/Scoreboard";
import mockTheme from "../chakra-ui-mock-theme";

expect.extend(toHaveNoViolations);
const extendedTheme = extendTheme({ ...mockTheme });

const measureRenderingTime = (callback) => {
  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  return endTime - startTime;
};

// TESTCASE # 1: Check initial state rendering
// DESCRIPTION: Here I am testing if the component renders without errors or not.
test("should render scoreboard component", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );
});

// TESTCASE # 2: Rendering and Starting a Match
// DESCRIPTION: Here I am testing if the component renders without errors and the match is starts correctly or not.
test("renders and starts a match", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );

  // Check if the "Start Match" button is present
  const startMatchButton = screen.getByText("Start Match");
  expect(startMatchButton).toBeInTheDocument();

  // Click the "Start Match" button
  fireEvent.click(startMatchButton);

  // Check if the match components are rendered after starting a match
  const matchSummaries = screen.getAllByTestId("match-summary");
  expect(matchSummaries.length).toBe(1);
});

// TESTCASE # 3: Accessibility Testing
// DESCRIPTION: Here I am testing the component for accessibility issues using tools like Jest Axe or React Testing Library's axe function.
test("component has no accessibility violations", async () => {
  const { container } = render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// TESTCASE # 4: Snapshot Testing
// DESCRIPTION: Here I am testing that if something change in component each time when testcases executes.
test("matches snapshot", () => {
  const { asFragment } = render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

// TESTCASE # 5: Starting Multiple Matches
// DESCRIPTION: Here I am testing if the after clicking on start match button multiple matches starts or not.
test("starts multiple matches", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );

  // Start two matches
  const startMatchButton = screen.getByText("Start Match");
  fireEvent.click(startMatchButton);
  fireEvent.click(startMatchButton);

  // Check if both match components are rendered
  const matchSummaries = screen.getAllByTestId("match-summary");
  expect(matchSummaries.length).toBe(2);
});

// TESTCASE # 6: Updating Score and Finishing a Match
// DESCRIPTION: Here I am testing if the component renders withour errors and the the initial state is set correctly or not.
test("updates score and finishes a match", async () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );

  // Start a match
  const startMatchButton = screen.getByText("Start Match");
  fireEvent.click(startMatchButton);

  // Update score for the match
  const homeScoreInput = screen.getByLabelText("Home Team Score:");
  const awayScoreInput = screen.getByLabelText("Away Team Score:");
  const updateScoreButton = screen.getByText("Update Score");

  fireEvent.change(homeScoreInput, { target: { value: "2" } });
  fireEvent.change(awayScoreInput, { target: { value: "1" } });
  fireEvent.click(updateScoreButton);

  // Check if the score is updated in the match summary
  const matchSummaries = screen.getAllByTestId("match-summary");
  expect(matchSummaries[0]).toHaveTextContent("2 - 1");

  // Finish the match
  const finishMatchButton = screen.getByText("Finish Match");
  fireEvent.click(finishMatchButton);

  await waitFor(() => {
    const updatedMatchSummaries = screen.queryAllByTestId("match-summary");
    expect(updatedMatchSummaries.length).toBe(0);
  });
});

// TESTCASE # 7: Updating Scores for Different Matches
// DESCRIPTION: Here I am testing if the component updating the score for different matches correctly or not.
test("updates scores for different matches", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );

  // Start two matches
  const startMatchButton = screen.getByText("Start Match");
  fireEvent.click(startMatchButton);
  fireEvent.click(startMatchButton);

  // Update scores for the first match
  const homeScoreInput1 = screen.getAllByLabelText("Home Team Score:")[0];
  const awayScoreInput1 = screen.getAllByLabelText("Away Team Score:")[0];
  const updateScoreButton1 = screen.getAllByText("Update Score")[0];

  fireEvent.change(homeScoreInput1, { target: { value: "2" } });
  fireEvent.change(awayScoreInput1, { target: { value: "1" } });
  fireEvent.click(updateScoreButton1);

  // Update scores for the second match
  const homeScoreInput2 = screen.getAllByLabelText("Home Team Score:")[1];
  const awayScoreInput2 = screen.getAllByLabelText("Away Team Score:")[1];
  const updateScoreButton2 = screen.getAllByText("Update Score")[1];

  fireEvent.change(homeScoreInput2, { target: { value: "3" } });
  fireEvent.change(awayScoreInput2, { target: { value: "2" } });
  fireEvent.click(updateScoreButton2);

  // Check if the scores are updated correctly in the match summaries
  const matchSummaries = screen.getAllByTestId("match-summary");
  expect(matchSummaries[0]).toHaveTextContent("2 - 1");
  expect(matchSummaries[1]).toHaveTextContent("3 - 2");
});

// TESTCASE # 8: Performance Testing
// DESCRIPTION: Here I am testing the component's performance by rendering a large number of components and measuring the time it takes.
test("renders multiple matches without performance issues", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );

  // Start multiple matches (e.g., 10 matches)
  const startMatchButton = screen.getByText("Start Match");
  for (let i = 0; i < 10; i++) {
    fireEvent.click(startMatchButton);
  }

  // Measure rendering performance
  const renderingTime = measureRenderingTime(() => {
    screen.getAllByTestId("match-summary"); // Use getAllByTestId instead of getByTestId
  });

  // Assert that rendering time is within an acceptable limit
  expect(renderingTime).toBeLessThan(100); // Example threshold in milliseconds
});

// TESTCASE # 9: Edge Case Testing
// DESCRIPTION: Here I am testing if the matches functionality is working perfectly if i am not providing any score or not.
test("handles edge cases gracefully", () => {
  // Test with empty matches array
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );
  const startMatchButton = screen.getByText("Start Match");
  fireEvent.click(startMatchButton);
  const matchSummary = screen.getByTestId("match-summary");
  expect(matchSummary).toBeInTheDocument();

  // Test without providing onUpdateScore or onFinish handlers
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );
  fireEvent.click(startMatchButton);

  // Get the specific update score and finish match buttons within the first match
  const matchButtons = within(matchSummary).getAllByText("Update Score");
  const updateScoreButton = matchButtons[0];
  const finishMatchButton = within(matchSummary).getByText("Finish Match");

  // Perform actions on the buttons
  fireEvent.click(updateScoreButton);
  fireEvent.click(finishMatchButton);
});

import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import "jest-axe/extend-expect";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import mockTheme from "../chakra-ui-mock-theme";

const extendedTheme = extendTheme({ ...mockTheme });

// TESTCASE # 1: Renders without crashing
// DESCRIPTION: Here I am testing if the component renders without any errors correctly or not.
test("renders without crashing", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Navigation />
    </ChakraProvider>
  );
});

// TESTCASE # 2: Component has no accessibility violations
// DESCRIPTION:  Here I am testing the component for accessibility issues using tools like Jest Axe or React Testing Library's axe function.
test("component has no accessibility violations", async () => {
  const { container } = render(
    <ChakraProvider theme={extendedTheme}>
      <Navigation />
    </ChakraProvider>
  );
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

// TESTCASE # 3: Displays correct heading text
// DESCRIPTION: Here I am testing if the component displaying the correct heading text as expected or not.
test("displays correct heading text", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Navigation />
    </ChakraProvider>
  );
  const headingElement = screen.getByText("Live Football World Cup Scoreboard");
  expect(headingElement).toBeInTheDocument();
});

// TESTCASE # 4: Matches snapshot
// DESCRIPTION:  Here I am testing that if something change in component each time when testcases executes.
test("matches snapshot", () => {
  const { asFragment } = render(
    <ChakraProvider theme={extendedTheme}>
      <Navigation />
    </ChakraProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

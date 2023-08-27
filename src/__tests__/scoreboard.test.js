import { render } from "@testing-library/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Scoreboard from "../components/Scoreboard";
import mockTheme from "../chakra-ui-mock-theme";

const extendedTheme = extendTheme({ ...mockTheme });

test("should render scoreboard component", () => {
  render(
    <ChakraProvider theme={extendedTheme}>
      <Scoreboard />
    </ChakraProvider>
  );
});

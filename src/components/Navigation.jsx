import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";

const Navigation = () => {
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Heading as="h3" size="md" color={"#ffffff"}>
              Live Football World Cup Scoreboard
            </Heading>
          </HStack>
          <Flex alignItems={"center"}></Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navigation;

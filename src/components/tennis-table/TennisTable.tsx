import { AspectRatio, Box, Flex, Text } from '@chakra-ui/react';

export const TennisTable = () => {
  return (
    <AspectRatio maxWidth="25em" ratio={1.525 / 1.4}>
      <Box
        bgColor="green.600"
        h="13.7em"
        w="15.25em"
        position="relative"
        border="4px solid white"
      >
        <Box bg="white" h="100%" w="4px" position="absolute" left="50%" />
        <Box
          bg="white"
          w="100%"
          h="6px"
          position="absolute"
          bottom="4%"
          overflow="hidden"
          borderRadius="2px"
        >
          <Box
            bg="gray.500"
            w="100%"
            h="3px"
            position="absolute"
            top="50%"
            left="0"
            transform="translateY(-50%)"
          />
        </Box>

        <Flex
          justifyContent="space-between"
          mt="50px"
          mx="10%"
          position="relative"
        >
          <Box
            bg="red.500"
            h="calc(33% - 10px)"
            w="calc(33% - 10px)"
            borderRadius="10px"
            cursor="pointer"
            _hover={{ bg: 'red.600' }}
          >
            <Text textAlign="center" color="white" fontWeight="bold" mt="50%">
              Target 1
            </Text>
          </Box>

          <Box
            bg="blue.500"
            h="calc(33% - 10px)"
            w="calc(33% - 10px)"
            borderRadius="10px"
            cursor="pointer"
            _hover={{ bg: 'blue.600' }}
          >
            <Text textAlign="center" color="white" fontWeight="bold" mt="50%">
              Target 2
            </Text>
          </Box>

          <Box
            bg="yellow.500"
            h="calc(33% - 10px)"
            w="calc(33% - 10px)"
            borderRadius="10px"
            cursor="pointer"
            _hover={{ bg: 'yellow.600' }}
          >
            <Text textAlign="center" color="white" fontWeight="bold" mt="50%">
              Target 3
            </Text>
          </Box>
        </Flex>
      </Box>
    </AspectRatio>
  );
};

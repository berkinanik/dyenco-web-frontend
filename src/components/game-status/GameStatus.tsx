import { useEffect, useState } from 'react';

import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { differenceInSeconds } from 'date-fns';

import { useGameContext } from '@/contexts/GameContext';
import { useBorderColor } from '@/hooks/useBorderColor';

export const GameStatus = () => {
  const { gameStatus } = useGameContext();
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (gameStatus) {
      const interval = setInterval(() => {
        setTimeElapsed(differenceInSeconds(new Date(), gameStatus.startedAt));
      }, 1000);

      return () => clearInterval(interval);
    }
  });

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      borderColor={useBorderColor()}
      borderStyle="solid"
    >
      <Flex justify="center" mb={2}>
        <Text fontSize="xl" fontWeight="bold">
          Game Status
        </Text>
      </Flex>

      <Divider />

      {gameStatus ? (
        <>
          <Flex alignItems="center" my={2}>
            <Text fontWeight="bold">Game Mode:</Text>
            <Text ml={2}>{gameStatus.mode}</Text>
          </Flex>

          <Divider />

          <Flex alignItems="center" mt={2}>
            <Text fontWeight="bold">Training:</Text>
            <Text ml={2}>{timeElapsed} s</Text>
          </Flex>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" mt={2}>
          <Text fontSize="xl" fontWeight="bold" color="gray.500">
            Start Training
          </Text>
        </Flex>
      )}
    </Box>
  );
};

import { Box, Flex, Text } from '@chakra-ui/react';

export const DeviceStatus: React.FC = () => {
  const isConnected = true;
  const isRunning = true;
  const stepperVoltage = 12;
  const servoVoltage = 5;
  const dcMotorVoltage = 24;

  return (
    <Box
      padding={4}
      borderWidth={1}
      borderColor="whiteAlpha.700"
      borderStyle="solid"
      borderRadius="md"
    >
      <Flex alignItems="center" mb={2}>
        <Text fontWeight="bold">Device Connection:</Text>
        <Text ml={2}>{isConnected ? 'Connected' : 'Disconnected'}</Text>
      </Flex>

      <Flex alignItems="center" mb={2}>
        <Text fontWeight="bold">Device Status:</Text>
        <Text ml={2}>{isRunning ? 'Running' : 'Stopped'}</Text>
      </Flex>

      <Flex alignItems="center" mb={2}>
        <Text fontWeight="bold">Stepper Motor Voltage:</Text>
        <Text ml={2}>{stepperVoltage} V</Text>
      </Flex>

      <Flex alignItems="center" mb={2}>
        <Text fontWeight="bold">Servo Motor Voltage:</Text>
        <Text ml={2}>{servoVoltage} V</Text>
      </Flex>

      <Flex alignItems="center" mb={2}>
        <Text fontWeight="bold">DC Motor Voltage:</Text>
        <Text ml={2}>{dcMotorVoltage} V</Text>
      </Flex>
    </Box>
  );
};

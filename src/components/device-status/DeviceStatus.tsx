import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineWifi } from 'react-icons/ai';
import { useQueryClient } from 'react-query';

import { useDeviceStatusContext } from '@/contexts/DeviceStatusContext';
import { useBorderColor } from '@/hooks/useBorderColor';
import { useGetCurrentSettings } from '@/services/queries/device/useGetCurrentSettings';
import { Query } from '@/services/queries/types';

export const DeviceStatus: React.FC = () => {
  const {
    status: {
      deviceConnected,
      running,
      horizontalAngle,
      verticalAngle,
      lowerMotorVoltage,
      stepperMotorRate,
      upperMotorVoltage,
    },
    changeStatus,
  } = useDeviceStatusContext();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { failureCount } = useGetCurrentSettings({
    refetchInterval: 1000,
    enabled: deviceConnected,
    retry: 2,
    onError: (error) => {
      changeStatus({ deviceConnected: false });
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
    onSuccess: (result) => changeStatus({ deviceConnected: true, ...result }),
  });

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      borderColor={useBorderColor()}
      borderStyle="solid"
    >
      <Flex alignItems="center" justify="space-between" mb={2}>
        <Flex>
          <Text fontWeight="bold">Device</Text>
          <Text
            ml={2}
            fontWeight="bold"
            color={deviceConnected ? 'green.600' : 'red.500'}
          >
            {deviceConnected ? 'Connected' : 'Disconnected'}
          </Text>
        </Flex>

        <IconButton
          aria-label="Connect to device"
          isDisabled={deviceConnected}
          isLoading={failureCount < 3 && failureCount !== 0}
          onClick={() => queryClient.refetchQueries(Query.CURRENT_SETTINGS)}
          icon={<Icon as={AiOutlineWifi} />}
        />
      </Flex>

      <Divider />

      <Flex alignItems="center" my={2}>
        <Text fontWeight="bold">Device Status:</Text>
        <Text ml={2}>{running ? 'Running' : 'Stopped'}</Text>
      </Flex>

      <Divider />

      <Flex alignItems="center" my={2}>
        <Text fontWeight="bold">Stepper Motor Rate:</Text>
        <Text ml={2}>{stepperMotorRate}</Text>
      </Flex>

      <Divider />

      <Flex alignItems="center" my={2}>
        <Text fontWeight="bold">Horizontal Servo Angle:</Text>
        <Text ml={2}>{horizontalAngle}</Text>
      </Flex>

      <Flex alignItems="center" mb={2}>
        <Text fontWeight="bold">Vertical Servo Angle:</Text>
        <Text ml={2}>{verticalAngle}</Text>
      </Flex>

      <Divider />

      <Flex alignItems="center" my={2}>
        <Text fontWeight="bold">Upper Motor Voltage:</Text>
        <Text ml={2}>{upperMotorVoltage} V</Text>
      </Flex>

      <Flex alignItems="center" mb={2}>
        <Text fontWeight="bold">Lower Motor Voltage:</Text>
        <Text ml={2}>{lowerMotorVoltage} V</Text>
      </Flex>
    </Box>
  );
};

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Slider } from '@/components/forms/slider/Slider';
import { useDeviceStatusContext } from '@/contexts/DeviceStatusContext';
import { useBorderColor } from '@/hooks/useBorderColor';
import { useStartAdvancedMutation } from '@/services/mutations/device/useStartAdvancedMutation';

const schema = z.object({
  stepperMotorRate: z.number().min(0).max(60),
  horizontalAngle: z.number().min(-90).max(90),
  verticalAngle: z.number().min(-90).max(90),
  upperMotorVoltage: z.number().min(0).max(12),
  lowerMotorVoltage: z.number().min(0).max(12),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  stepperMotorRate: 0,
  horizontalAngle: 0,
  verticalAngle: 0,
  upperMotorVoltage: 0,
  lowerMotorVoltage: 0,
};

export const AdvancedControlPage = () => {
  const toast = useToast();

  const {
    status: {
      deviceConnected,
      operationMode,
      stepperMotorRate,
      horizontalAngle,
      verticalAngle,
      upperMotorVoltage,
      lowerMotorVoltage,
    },
  } = useDeviceStatusContext();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutate, isLoading } = useStartAdvancedMutation({
    onSuccess: () => {
      toast({
        title: 'Session started',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack
        spacing={6}
        align="start"
        p={4}
        borderWidth={1}
        borderRadius="md"
        borderStyle="solid"
        borderColor={useBorderColor()}
      >
        <Controller<FormData, 'stepperMotorRate'>
          name="stepperMotorRate"
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="stepperMotorRate">Stepper Rate</FormLabel>
              <Box p={2}>
                <Slider
                  id="stepperMotorRate"
                  {...field}
                  min={0}
                  max={60}
                  step={0.5}
                />
              </Box>
              <FormErrorMessage>{error && error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller<FormData, 'horizontalAngle'>
          name="horizontalAngle"
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="horizontalAngle">Horizontal Angle</FormLabel>
              <Box p={2}>
                <Slider
                  id="horizontalAngle"
                  {...field}
                  min={-90}
                  max={90}
                  step={5}
                />
              </Box>
              <FormErrorMessage>{error && error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller<FormData, 'verticalAngle'>
          name="verticalAngle"
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="verticalAngle">Vertical Angle</FormLabel>
              <Box p={2}>
                <Slider
                  id="verticalAngle"
                  {...field}
                  min={-90}
                  max={90}
                  step={5}
                />
              </Box>
              <FormErrorMessage>{error && error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller<FormData, 'upperMotorVoltage'>
          name="upperMotorVoltage"
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="upperMotorVoltage">
                Upper Motor Voltage
              </FormLabel>
              <Box p={2}>
                <Slider
                  id="upperMotorVoltage"
                  {...field}
                  min={0}
                  max={12}
                  step={0.5}
                />
              </Box>
              <FormErrorMessage>{error && error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller<FormData, 'lowerMotorVoltage'>
          name="lowerMotorVoltage"
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="lowerMotorVoltage">
                Lower Motor Voltage
              </FormLabel>
              <Box p={2}>
                <Slider
                  id="lowerMotorVoltage"
                  {...field}
                  min={0}
                  max={12}
                  step={0.5}
                />
              </Box>
              <FormErrorMessage>{error && error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />

        <HStack width="100%" justify="center" spacing={6}>
          <Button
            type="button"
            colorScheme="gray"
            onClick={() =>
              reset(
                deviceConnected
                  ? {
                      stepperMotorRate,
                      horizontalAngle,
                      verticalAngle,
                      upperMotorVoltage,
                      lowerMotorVoltage,
                    }
                  : defaultValues,
              )
            }
          >
            Reset
          </Button>

          <Button
            type="submit"
            isLoading={isLoading}
            isDisabled={!deviceConnected}
            colorScheme={operationMode === 'idle' ? 'green' : 'teal'}
          >
            {operationMode === 'idle' ? 'Start' : 'Update'}
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

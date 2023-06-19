import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormBox } from '@/components/form-box/FormBox';
import { Slider } from '@/components/forms/slider/Slider';
import { useDeviceStatusContext } from '@/contexts/DeviceStatusContext';
import { useAdvancedModeMutation } from '@/services/mutations/device/useAdvancedModeMutation';
import { OperationMode } from '@/types/settings';

const schema = z.object({
  stepperMotorRate: z.number().min(0.1).max(10),
  horizontalAngle: z.number().min(-60).max(5),
  verticalAngle: z.number().min(-55).max(10),
  upperMotorVoltage: z.number().min(0).max(12),
  lowerMotorVoltage: z.number().min(0).max(12),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  stepperMotorRate: 0.1,
  horizontalAngle: -31,
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

  const { mutate, isLoading } = useAdvancedModeMutation({
    onSuccess: (data) => {
      toast({
        title: data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormBox>
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
                  min={0.1}
                  max={10}
                  step={0.1}
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
                  min={-60}
                  max={5}
                  step={1}
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
                  min={-55}
                  max={10}
                  step={1}
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
            colorScheme={
              operationMode === OperationMode.IDLE ? 'green' : 'teal'
            }
          >
            {operationMode === OperationMode.IDLE ? 'Start' : 'Update'}
          </Button>
        </HStack>
      </FormBox>
    </form>
  );
};

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Slider } from '@/components/forms/slider/Slider';
import { useBorderColor } from '@/hooks/useBorderColor';

const schema = z.object({
  stepperRate: z.number().min(0.1).max(60),
  horizontalAngle: z.number().min(-90).max(90),
  verticalAngle: z.number().min(-90).max(90),
  upperMotorVoltage: z.number().min(0).max(12),
  lowerMotorVoltage: z.number().min(0).max(12),
});

type FormData = z.infer<typeof schema>;

export const AdvancedControlPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      stepperRate: 0.1,
      horizontalAngle: 0,
      verticalAngle: 0,
      upperMotorVoltage: 0,
      lowerMotorVoltage: 0,
    },
  });

  const onSubmit: SubmitHandler<FormData> = () =>
    new Promise((resolve) => setTimeout(resolve, 3000));

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
        <Controller<FormData, 'stepperRate'>
          name="stepperRate"
          control={control}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="stepperRate">Stepper Rate</FormLabel>
              <Box p={2}>
                <Slider
                  id="stepperRate"
                  {...field}
                  min={0.1}
                  max={60}
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

        <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

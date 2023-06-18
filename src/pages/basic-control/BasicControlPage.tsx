import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineRedo, AiOutlineRight, AiOutlineUndo } from 'react-icons/ai';
import { z } from 'zod';

import { FormBox } from '@/components/form-box/FormBox';
import { RadioGroup } from '@/components/forms/radio-button/RadioGroup';
import { TennisTable } from '@/components/tennis-table/TennisTable';
import { useDeviceStatusContext } from '@/contexts/DeviceStatusContext';
import { useStartBasicMutation } from '@/services/mutations/device/useStartBasicMutation';

export enum Spin {
  Topspin = 'topspin',
  None = 'none',
  Backspin = 'backspin',
}

export enum BallFeedRate {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

const schema = z.object({
  targetArea: z.number().min(1).max(6),
  spin: z.nativeEnum(Spin),
  ballFeedRate: z.nativeEnum(BallFeedRate),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  targetArea: 2,
  spin: Spin.None,
  ballFeedRate: BallFeedRate.Medium,
};

export const BasicControlPage: React.FC = () => {
  const {
    status: { deviceConnected, operationMode },
  } = useDeviceStatusContext();

  const { handleSubmit, control, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const selectedArea = watch('targetArea');

  const { mutate, isLoading } = useStartBasicMutation();

  const onSubmit: SubmitHandler<FormData> = (data) => mutate(data);

  return (
    <Grid
      gridTemplateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
      }}
      gap={4}
    >
      <GridItem>
        <TennisTable
          selectedArea={selectedArea}
          setSelectedArea={(area) => setValue('targetArea', area)}
        />
      </GridItem>

      <GridItem>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBox>
            <Controller<FormData, 'spin'>
              name="spin"
              control={control}
              render={({ field: { ref, ...field }, fieldState: { error } }) => {
                const options = [
                  {
                    label: (
                      <HStack>
                        <Text>Topspin</Text>
                        <Icon as={AiOutlineRedo} />
                      </HStack>
                    ),
                    value: Spin.Topspin,
                  },
                  {
                    label: 'None',
                    value: Spin.None,
                  },
                  {
                    label: (
                      <HStack>
                        <Text>Backspin</Text>
                        <Icon as={AiOutlineUndo} />
                      </HStack>
                    ),
                    value: Spin.Backspin,
                  },
                ];

                return (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="spin">Spin</FormLabel>
                    <RadioGroup {...field} equalWidth options={options} />
                    <FormErrorMessage>{error?.message}</FormErrorMessage>
                  </FormControl>
                );
              }}
            />

            <Controller<FormData, 'ballFeedRate'>
              name="ballFeedRate"
              control={control}
              render={({ field: { ref, ...field }, fieldState: { error } }) => {
                const options = [
                  {
                    label: (
                      <HStack spacing={0}>
                        <Text>Slow</Text>
                        <Icon as={AiOutlineRight} ml={1} />
                      </HStack>
                    ),
                    value: BallFeedRate.Low,
                  },
                  {
                    label: (
                      <HStack spacing={0}>
                        <Text>Medium</Text>
                        <Icon as={AiOutlineRight} ml={1} />
                        <Icon as={AiOutlineRight} ml={-1.5} />
                      </HStack>
                    ),
                    value: BallFeedRate.Medium,
                  },
                  {
                    label: (
                      <HStack spacing={0}>
                        <Text>High</Text>
                        <Icon as={AiOutlineRight} ml={1} />
                        <Icon as={AiOutlineRight} ml={-1.5} />
                        <Icon as={AiOutlineRight} ml={-1.5} />
                      </HStack>
                    ),
                    value: BallFeedRate.High,
                  },
                ];

                return (
                  <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor="ballFeedRate">Ball Feed</FormLabel>
                    <RadioGroup {...field} equalWidth options={options} />
                    <FormErrorMessage>{error?.message}</FormErrorMessage>
                  </FormControl>
                );
              }}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={!deviceConnected}
              colorScheme={operationMode === 'idle' ? 'green' : 'teal'}
            >
              {operationMode === 'idle' ? 'Start' : 'Update'}
            </Button>
          </FormBox>
        </form>
      </GridItem>
    </Grid>
  );
};

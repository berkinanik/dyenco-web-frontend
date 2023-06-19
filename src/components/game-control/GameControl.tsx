import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Icon } from '@chakra-ui/icon';
import { Grid, GridItem, HStack, Text } from '@chakra-ui/layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineRedo, AiOutlineRight, AiOutlineUndo } from 'react-icons/ai';
import { z } from 'zod';

import { useDeviceStatusContext } from '@/contexts/DeviceStatusContext';
import { BallFeedRate, OperationMode, Spin } from '@/types/settings';

import { FormBox } from '../form-box/FormBox';
import { RadioGroup } from '../forms/radio-button/RadioGroup';
import { TennisTable } from '../tennis-table/TennisTable';

const schema = z.object({
  targetArea: z.number().min(1).max(6),
  spin: z.nativeEnum(Spin),
  ballFeedRate: z.nativeEnum(BallFeedRate),
});

export type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  targetArea: 2,
  spin: Spin.None,
  ballFeedRate: BallFeedRate.Medium,
};

type Props = {
  random?: boolean;
  onSubmit: SubmitHandler<FormData>;
  isLoading: boolean;
};

export const GameControl: React.FC<Props> = ({
  random,
  onSubmit,
  isLoading,
}) => {
  const {
    status: { deviceConnected, operationMode },
  } = useDeviceStatusContext();

  const { handleSubmit, control, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const selectedArea = watch('targetArea');

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
              colorScheme={
                operationMode === OperationMode.IDLE ? 'green' : 'teal'
              }
            >
              {operationMode === OperationMode.IDLE ? 'Start' : 'Update'}
            </Button>
          </FormBox>
        </form>
      </GridItem>
    </Grid>
  );
};

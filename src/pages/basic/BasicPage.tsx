import { useState } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineRedo, AiOutlineRight, AiOutlineUndo } from 'react-icons/ai';
import { z } from 'zod';

import { RadioGroup } from '@/components/forms/radio-button/RadioGroup';
import { TennisTable } from '@/components/tennis-table/TennisTable';

enum Spin {
  Topspin = 'topspin',
  None = 'none',
  Backspin = 'backspin',
}

enum BallFeedRate {
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

export const BasicPage: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState(defaultValues.targetArea);

  const { handleSubmit, control } = useForm<FormData>({ defaultValues });

  const onSubmit = () => console.log(selectedArea);

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
          setSelectedArea={setSelectedArea}
        />
      </GridItem>

      <GridItem>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
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
          </VStack>
        </form>
      </GridItem>
    </Grid>
  );
};

import { UseMutationOptions, useMutation } from 'react-query';

import { client } from '@/services/client';

import { BaseMutationResponse, Mutation } from '../types';

export const useStopGameMutation = (
  options?: UseMutationOptions<BaseMutationResponse, Error, void>,
) =>
  useMutation<BaseMutationResponse, Error, void>(
    () => client.post(Mutation.STOP).then((res) => res.data),
    options,
  );

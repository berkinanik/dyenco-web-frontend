import { UseMutationOptions, useMutation } from 'react-query';

import { client } from '@/services/client';

import { BaseMutationResponse, Mutation, BasicModePayload } from '../types';

export const useRandomModeMutation = (
  options?: UseMutationOptions<BaseMutationResponse, Error, BasicModePayload>,
) =>
  useMutation<BaseMutationResponse, Error, BasicModePayload>(
    (payload: BasicModePayload) =>
      client.post(Mutation.RANDOM_MODE, payload).then((res) => res.data),
    options,
  );

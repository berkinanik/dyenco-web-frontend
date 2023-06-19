import { UseMutationOptions, useMutation } from 'react-query';

import { client } from '@/services/client';

import { BaseMutationResponse, Mutation, BasicModePayload } from '../types';

export const useBasicModeMutation = (
  options?: UseMutationOptions<BaseMutationResponse, Error, BasicModePayload>,
) =>
  useMutation<BaseMutationResponse, Error, BasicModePayload>(
    (payload: BasicModePayload) =>
      client.post(Mutation.BASIC_MODE, payload).then((res) => res.data),
    options,
  );

import { UseMutationOptions, useMutation } from 'react-query';

import { client } from '@/services/client';

import { BaseMutationResponse, Mutation, AdvancedModePayload } from '../types';

export const useAdvancedModeMutation = (
  options?: UseMutationOptions<
    BaseMutationResponse,
    Error,
    AdvancedModePayload
  >,
) =>
  useMutation<BaseMutationResponse, Error, AdvancedModePayload>(
    (payload: AdvancedModePayload) =>
      client.post(Mutation.ADVANCED_MODE, payload).then((res) => res.data),
    options,
  );

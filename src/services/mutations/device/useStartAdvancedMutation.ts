import { UseMutationOptions, useMutation } from 'react-query';

import { client } from '@/services/client';

import { BaseMutationResponse, Mutation, StartAdvancedPayload } from '../types';

export const useStartAdvancedMutation = (
  options?: UseMutationOptions<
    BaseMutationResponse,
    Error,
    StartAdvancedPayload
  >,
) =>
  useMutation<BaseMutationResponse, Error, StartAdvancedPayload>(
    (payload: StartAdvancedPayload) =>
      client.post(Mutation.START_ADVANCED, payload).then((res) => res.data),
    options,
  );

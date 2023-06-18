import { UseMutationOptions, useMutation } from 'react-query';

import { client } from '@/services/client';

import { BaseMutationResponse, Mutation, StartBasicPayload } from '../types';

export const useStartBasicMutation = (
  options?: UseMutationOptions<BaseMutationResponse, Error, StartBasicPayload>,
) =>
  useMutation<BaseMutationResponse, Error, StartBasicPayload>(
    (payload: StartBasicPayload) =>
      client.post(Mutation.START_BASIC, payload).then((res) => res.data),
    options,
  );

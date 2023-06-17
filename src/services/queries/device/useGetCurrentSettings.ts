import { UseQueryOptions, useQuery } from 'react-query';

import { client } from '@/services/client';

import { CurrentSettingsResponse } from '../types';

export const useGetCurrentSettings = (
  options?: UseQueryOptions<CurrentSettingsResponse, Error>,
) => {
  return useQuery<CurrentSettingsResponse, Error>(
    'current-settings',
    () => client.get('current-settings').then((res) => res.data),
    options,
  );
};

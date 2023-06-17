import { UseQueryOptions, useQuery } from 'react-query';

import { client } from '@/services/client';

import { CurrentSettingsResponse, Query } from '../types';

export const useGetCurrentSettings = (
  options?: UseQueryOptions<CurrentSettingsResponse, Error>,
) => {
  return useQuery<CurrentSettingsResponse, Error>(
    'current-settings',
    () => client.get(Query.CURRENT_SETTINGS).then((res) => res.data),
    options,
  );
};

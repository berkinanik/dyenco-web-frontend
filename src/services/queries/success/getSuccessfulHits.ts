import { successClient } from '@/services/client';

import { Query, SuccessfulHitsResponse } from '../types';

export const getSuccessfulHits = async () => {
  return successClient
    .get<SuccessfulHitsResponse>(Query.SUCCESSFUL_HITS)
    .then((res) => res.data);
};

import { OperationMode } from '@/types/settings';

import { BaseMutationResponse } from './mutations/types';
import {
  CurrentSettingsResponse,
  SuccessfulHitsResponse,
} from './queries/types';

class APIMockInstance {
  get(_url: string) {
    return new Promise<{ data: CurrentSettingsResponse }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            operationMode: OperationMode.BASIC,
            stepperMotorRate: 5,
            horizontalAngle: -31,
            verticalAngle: 0,
            upperMotorVoltage: 12,
            lowerMotorVoltage: 12,
          },
        });
      }, 1000);
    });
  }
  post(_url: string, _data?: unknown) {
    return new Promise<{ data: BaseMutationResponse }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: 'Operation successful',
            status: 'success',
          },
        });
      }, 1000);
    });
  }
}

class SuccessAPIMockInstance {
  get<T = SuccessfulHitsResponse>(_url: string) {
    return new Promise<{ data: T }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            successfulHits: 20,
            message: 'Operation successful',
            status: 'success',
          } as T,
        });
      }, 1000);
    });
  }
}

export const client = new APIMockInstance();
export const successClient = new SuccessAPIMockInstance();

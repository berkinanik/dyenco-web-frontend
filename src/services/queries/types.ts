import { OperationMode } from '@/types/settings';

export enum Query {
  CURRENT_SETTINGS = 'current-settings',
  SUCCESSFUL_HITS = 'successful-hits',
}

interface BaseResponse {
  message: string;
  status: string;
}

export interface CurrentSettingsResponse {
  operationMode: OperationMode;
  stepperMotorRate: number;
  horizontalAngle: number;
  verticalAngle: number;
  upperMotorVoltage: number;
  lowerMotorVoltage: number;
}

export type SuccessfulHitsResponse = {
  successfulHits: number;
} & BaseResponse;

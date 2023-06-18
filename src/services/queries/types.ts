import { OperationMode } from '@/types/settings';

export enum Query {
  CURRENT_SETTINGS = 'current-settings',
}

export interface CurrentSettingsResponse {
  operationMode: OperationMode;
  stepperMotorRate: number;
  horizontalAngle: number;
  verticalAngle: number;
  upperMotorVoltage: number;
  lowerMotorVoltage: number;
}

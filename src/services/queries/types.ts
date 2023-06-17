export enum Query {
  CURRENT_SETTINGS = 'current-settings',
}

export interface CurrentSettingsResponse {
  operationMode: string;
  stepperMotorRate: number;
  horizontalAngle: number;
  verticalAngle: number;
  upperMotorVoltage: number;
  lowerMotorVoltage: number;
}

export enum Mutation {
  STOP = 'stop',
  START_ADVANCED = 'start-advanced',
}

export interface BaseMutationResponse {
  message: string;
  status: string;
}

export interface StartAdvancedPayload {
  stepperMotorRate: number;
  horizontalAngle: number;
  verticalAngle: number;
  upperMotorVoltage: number;
  lowerMotorVoltage: number;
}

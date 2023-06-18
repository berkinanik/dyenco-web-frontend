import { BallFeedRate, Spin } from '@/pages/basic-control/BasicControlPage';

export enum Mutation {
  STOP = 'stop',
  START_ADVANCED = 'start-advanced',
  START_BASIC = 'start-basic',
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

export interface StartBasicPayload {
  targetArea: number;
  spin: Spin;
  ballFeedRate: BallFeedRate;
}

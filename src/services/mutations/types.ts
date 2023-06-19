import { BallFeedRate, Spin } from '@/types/settings';

export enum Mutation {
  STOP = 'stop',
  ADVANCED_MODE = 'advanced-mode',
  BASIC_MODE = 'basic-mode',
  RANDOM_MODE = 'random-mode',
}

export interface BaseMutationResponse {
  message: string;
  status: string;
}

export interface AdvancedModePayload {
  stepperMotorRate: number;
  horizontalAngle: number;
  verticalAngle: number;
  upperMotorVoltage: number;
  lowerMotorVoltage: number;
}

export interface BasicModePayload {
  targetArea: number;
  spin: Spin;
  ballFeedRate: BallFeedRate;
}

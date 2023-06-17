import React, { createContext, useContext, useState } from 'react';

export type DeviceStatus = {
  deviceConnected: boolean;
  running: boolean;
  stepperMotorRate: number;
  horizontalAngle: number;
  verticalAngle: number;
  upperMotorVoltage: number;
  lowerMotorVoltage: number;
};

export type DeviceStatusContextType = {
  status: DeviceStatus;
  changeStatus: (newStatus: Partial<DeviceStatus>) => void;
};

export const DeviceStatusContext = createContext<DeviceStatusContextType>({
  status: {
    deviceConnected: false,
    running: false,
    stepperMotorRate: 0.1,
    horizontalAngle: 0,
    verticalAngle: 0,
    upperMotorVoltage: 0,
    lowerMotorVoltage: 0,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeStatus: () => {},
});

export const useDeviceStatusContext = () => useContext(DeviceStatusContext);

export const DeviceStatusProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [status, setStatus] = useState<DeviceStatus>({
    deviceConnected: false,
    running: false,
    stepperMotorRate: 0.1,
    horizontalAngle: 0,
    verticalAngle: 0,
    upperMotorVoltage: 0,
    lowerMotorVoltage: 0,
  });

  const handleStatusChange = (newStatus: Partial<DeviceStatus>) => {
    setStatus((prevStatus) => ({ ...prevStatus, ...newStatus }));
  };

  return (
    <DeviceStatusContext.Provider
      value={{ status, changeStatus: handleStatusChange }}
    >
      {children}
    </DeviceStatusContext.Provider>
  );
};

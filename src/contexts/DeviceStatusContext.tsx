import { createContext, useContext, useState } from 'react';

import { OperationMode } from '@/types/settings';

type DeviceStatus = {
  deviceConnected: boolean;
  operationMode: OperationMode;
  stepperMotorRate: number;
  horizontalAngle: number;
  verticalAngle: number;
  upperMotorVoltage: number;
  lowerMotorVoltage: number;
};

type DeviceStatusContextType = {
  status: DeviceStatus;
  changeStatus: (newStatus: Partial<DeviceStatus>) => void;
};

const initialStatus: DeviceStatus = {
  deviceConnected: false,
  operationMode: OperationMode.IDLE,
  stepperMotorRate: 0.1,
  horizontalAngle: -31,
  verticalAngle: 0,
  upperMotorVoltage: 0,
  lowerMotorVoltage: 0,
};

const DeviceStatusContext = createContext<DeviceStatusContextType>({
  status: initialStatus,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeStatus: () => {},
});

export const useDeviceStatusContext = () => useContext(DeviceStatusContext);

export const DeviceStatusContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [status, setStatus] = useState<DeviceStatus>(initialStatus);

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

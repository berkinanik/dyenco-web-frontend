import { StatusLayout } from '@/components/layout/StatusLayout';

export const withStatusLayout = (WrappedComponent: React.ComponentType) => {
  return (
    <StatusLayout>
      <WrappedComponent />
    </StatusLayout>
  );
};

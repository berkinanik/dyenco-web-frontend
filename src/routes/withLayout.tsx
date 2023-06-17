import { Layout } from '@/components/layout/Layout';

export const withLayout = (WrappedComponent: React.ComponentType) => {
  return (
    <Layout>
      <WrappedComponent />
    </Layout>
  );
};

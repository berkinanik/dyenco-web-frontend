import { Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';

import { Navbar } from './components/navbar/Navbar';
import { DeviceStatusContextProvider } from './contexts/DeviceStatusContext';
import { GameContextProvider } from './contexts/GameContext';
import { Routes } from './routes/Routes';
import { Query } from './services/queries/types';

export const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: (error) => {
          console.error('mutation error', error);
        },
        onMutate: (variables) => {
          // eslint-disable-next-line no-console
          console.log('sending mutation', variables);
        },
        onSuccess: (data) => {
          // eslint-disable-next-line no-console
          console.log('mutation success', data);

          queryClient.invalidateQueries(Query.CURRENT_SETTINGS);
        },
      },
    },
  });

  return (
    <Box display="flex" width="100%" height="100%" flexDirection="column">
      <QueryClientProvider client={queryClient}>
        <GameContextProvider>
          <DeviceStatusContextProvider>
            <HashRouter>
              <Navbar />

              <Routes />
            </HashRouter>
          </DeviceStatusContextProvider>
        </GameContextProvider>
      </QueryClientProvider>
    </Box>
  );
};

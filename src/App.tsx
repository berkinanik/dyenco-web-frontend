import { Box } from '@chakra-ui/react';
import { HashRouter } from 'react-router-dom';

import { Navbar } from './components/navbar/Navbar';
import { Routes } from './routes/Routes';

export const App: React.FC = () => {
  return (
    <Box display="flex" width="100%" height="100%" flexDirection="column">
      <HashRouter>
        <Navbar />

        <Routes />
      </HashRouter>
    </Box>
  );
};

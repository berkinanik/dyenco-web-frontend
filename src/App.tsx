import { Box } from '@chakra-ui/react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Navbar } from './components/navbar/Navbar';
import { HomePage } from './pages/home/HomePage';

export const App = () => {
  return (
    <Box display="flex" width="100%" height="100%" flexDirection="column">
      <HashRouter>
        <Navbar />

        <Box
          display="flex"
          maxWidth="1200px"
          padding={4}
          marginX="auto"
          width="100%"
        >
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/test">
              <Box>Test</Box>
            </Route>

            <Route path="*">
              <Box>404</Box>
            </Route>
          </Switch>
        </Box>
      </HashRouter>
    </Box>
  );
};

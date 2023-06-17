import { Box } from '@chakra-ui/react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { Navbar } from './components/navbar/Navbar';
import { HomePage } from './pages/home/HomePage';

export const App: React.FC = () => {
  return (
    <Box display="flex" width="100%" height="100%" flexDirection="column">
      <HashRouter>
        <Navbar />

        <Layout>
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
        </Layout>
      </HashRouter>
    </Box>
  );
};

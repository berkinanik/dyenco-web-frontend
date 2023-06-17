import { Box } from '@chakra-ui/react';

import { Navbar } from './components/navbar/Navbar';

export const App = () => {
  return (
    <Box display="flex" width="100%" height="100%" flexDirection="column">
      <Navbar />
      <Box
        display="flex"
        maxWidth="1200px"
        padding={4}
        marginX="auto"
        width="100%"
      >
        Content
      </Box>
    </Box>
  );
};

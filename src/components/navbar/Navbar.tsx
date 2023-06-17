import { Box } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box flex={1} backgroundColor="blackAlpha.500">
      <Box
        marginX="auto"
        maxWidth="1200px"
        display="flex"
        flexDirection="row"
        padding={4}
      >
        <div>Link1</div>
        <div>Link1</div>
      </Box>
    </Box>
  );
};

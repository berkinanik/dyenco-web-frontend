import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <Box textAlign="center" p={5}>
      <Text fontSize="xl" fontWeight="bold">
        Oops! Page not found.
      </Text>

      <Button as={Link} to="/" mt={5}>
        Go Home
      </Button>
    </Box>
  );
};

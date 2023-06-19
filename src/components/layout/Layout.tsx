import { Box } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth="90em"
      padding={4}
      marginX="auto"
      width="100%"
      flex={1}
    >
      {children}
    </Box>
  );
};

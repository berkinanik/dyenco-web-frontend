import { Link as ChakraLink, useColorModeValue } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
  to: string;
};

export const NavLink: React.FC<Props> = ({ children, to }) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <ChakraLink
      as={Link}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      fontWeight={isActive ? 'bold' : 'normal'}
      to={to}
    >
      {children}
    </ChakraLink>
  );
};

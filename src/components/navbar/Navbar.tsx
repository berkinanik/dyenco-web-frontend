import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  useColorMode,
} from '@chakra-ui/react';

import Logo from '@/assets/logo.jpg';

import { NavLink } from './NavbarLink';

const Links: { name: string; to: string }[] = [
  {
    name: 'Basic',
    to: '/',
  },
  {
    name: 'Random Game',
    to: '/random-game',
  },
  {
    name: 'Advanced Control',
    to: '/advanced-control',
  },
  {
    name: 'Game History',
    to: '/game-history',
  },
];

export const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          maxWidth="90em"
          mx="auto"
        >
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Image src={Logo} height="2em" />

            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <HStack spacing={4}>
              <IconButton
                aria-label={'Toggle Color Mode'}
                onClick={toggleColorMode}
                size={'md'}
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                variant="outline"
              />

              {/* Avatar */}
              {/* <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu> */}
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

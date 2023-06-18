import { Box, Text } from '@chakra-ui/react';

type Props = {
  value: number;
  selected: boolean;
  onClick: () => void;
};

export const TargetArea: React.FC<Props> = ({ value, selected, onClick }) => {
  return (
    <Box
      bg={selected ? 'blackAlpha.700' : 'blackAlpha.400'}
      _hover={{ bg: selected ? 'blackAlpha.800' : 'blackAlpha.600' }}
      onClick={onClick}
      cursor="pointer"
      w="100%"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="lg"
    >
      <Text fontSize="xl" fontWeight="bold" textColor="whiteAlpha.700">
        Area {value}
      </Text>
    </Box>
  );
};

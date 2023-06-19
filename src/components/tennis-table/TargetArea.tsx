import { Box, Text } from '@chakra-ui/react';

type Props = {
  value: number;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export const TargetArea: React.FC<Props> = ({
  value,
  selected,
  onClick,
  disabled = false,
}) => {
  return (
    <Box
      bg={selected ? 'blackAlpha.700' : 'blackAlpha.400'}
      _hover={
        disabled
          ? undefined
          : { bg: selected ? 'blackAlpha.800' : 'blackAlpha.600' }
      }
      onClick={disabled ? undefined : onClick}
      cursor={disabled ? 'default' : 'pointer'}
      w="100%"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="lg"
      userSelect="none"
    >
      <Text fontSize="xl" fontWeight="bold" textColor="whiteAlpha.700">
        Area {value}
      </Text>
    </Box>
  );
};

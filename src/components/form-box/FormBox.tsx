import { BoxProps, VStack } from '@chakra-ui/react';

import { useBorderColor } from '@/hooks/useBorderColor';

type Props = {
  children: React.ReactNode;
} & BoxProps;

export const FormBox: React.FC<Props> = ({ children, ...boxProps }) => {
  return (
    <VStack
      spacing={6}
      align="center"
      p={4}
      borderWidth={1}
      borderRadius="md"
      borderStyle="solid"
      borderColor={useBorderColor()}
      {...boxProps}
    >
      {children}
    </VStack>
  );
};

import { Box, RadioProps, useRadio } from '@chakra-ui/react';

type Props = {
  equalWidth?: boolean;
} & RadioProps;

export const RadioButton: React.FC<Props> = ({ equalWidth, ...props }) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" flex={equalWidth ? 1 : undefined}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600 !important',
          textColor: 'white',
          borderColor: 'teal.600 !important',
        }}
        _hover={{
          bg: 'teal.800',
          textColor: 'white',
          borderColor: 'teal.800',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={4}
        py={2}
        fontSize="md"
        display="flex"
        justifyContent="center"
      >
        {props.children}
      </Box>
    </Box>
  );
};

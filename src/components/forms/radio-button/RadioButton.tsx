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
        cursor={props.isDisabled ? 'default' : 'pointer'}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600 !important',
          textColor: 'white',
          borderColor: 'teal.600 !important',
        }}
        _hover={
          props.isDisabled
            ? undefined
            : {
                bg: 'teal.800',
                textColor: 'white',
                borderColor: 'teal.800',
              }
        }
        _focus={
          props.isDisabled
            ? undefined
            : {
                boxShadow: 'outline',
              }
        }
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

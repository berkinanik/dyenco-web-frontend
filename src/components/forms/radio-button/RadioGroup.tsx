import { HStack, useRadioGroup } from '@chakra-ui/react';

import { RadioButton } from './RadioButton';

type Props = {
  options: { label: React.ReactNode; value: string | number }[];
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  equalWidth?: boolean;
};

export const RadioGroup: React.FC<Props> = ({
  options,
  name,
  value,
  onChange,
  equalWidth,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value: value.toString(),
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((option) => {
        const radio = getRadioProps({ value: option.value });

        return (
          <RadioButton key={option.value} equalWidth={equalWidth} {...radio}>
            {option.label}
          </RadioButton>
        );
      })}
    </HStack>
  );
};

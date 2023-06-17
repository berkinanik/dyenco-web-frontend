import { useState } from 'react';

import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';

type Props = {
  id: string;
  inputRef?: React.Ref<HTMLInputElement>;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  value?: number;
  unit?: string;
  showTooltip?: boolean;
};

export const Slider: React.FC<Props> = ({
  id,
  inputRef,
  defaultValue,
  min,
  max,
  step,
  onChange,
  value,
  unit = '',
  showTooltip = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ChakraSlider
      id={id}
      ref={inputRef}
      defaultValue={defaultValue || value}
      value={value}
      min={min}
      max={max}
      step={step}
      colorScheme="teal"
      onChange={onChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {min !== undefined && max !== undefined ? (
        <>
          <SliderMark value={min} mt="2" ml="-2.5" fontSize="sm">
            {min}
            {unit}
          </SliderMark>

          <SliderMark value={max} mt="2" ml="-2.5" fontSize="sm">
            {max}
            {unit}
          </SliderMark>
        </>
      ) : null}
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        label={`${value}${unit}`}
        isOpen={showTooltip && value !== undefined && isHovered}
      >
        <SliderThumb />
      </Tooltip>
    </ChakraSlider>
  );
};

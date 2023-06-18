import { AspectRatio, Box, Grid, GridItem } from '@chakra-ui/react';

import { TargetArea } from './TargetArea';

type Props = {
  selectedArea: number;
  setSelectedArea: (area: number) => void;
};

export const TennisTable: React.FC<Props> = ({
  selectedArea,
  setSelectedArea,
}) => {
  return (
    <AspectRatio maxWidth="35em" ratio={1.525 / 1.4}>
      <Box
        bgColor="green.600"
        position="relative"
        border="4px solid"
        borderColor="whiteAlpha.900"
      >
        <Box
          bg="whiteAlpha.600"
          h="100%"
          w="4px"
          position="absolute"
          left="50%"
        />
        <Box
          bg="white"
          w="100%"
          h="6px"
          position="absolute"
          bottom="4%"
          overflow="hidden"
          borderRadius="2px"
        >
          <Box
            bg="gray.500"
            w="100%"
            h="3px"
            position="absolute"
            top="50%"
            left="0"
            transform="translateY(-50%)"
          />
        </Box>

        <Grid
          position="absolute"
          top="0"
          h="80%"
          w="100%"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={1}
          p={2}
        >
          {Array.from({ length: 6 }, (_, i) => i + 1).map((area) => (
            <GridItem key={area}>
              <TargetArea
                value={area}
                selected={selectedArea === area}
                onClick={() => setSelectedArea(area)}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </AspectRatio>
  );
};

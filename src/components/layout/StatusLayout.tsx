import { Box, Grid, GridItem } from '@chakra-ui/react';

import { DeviceStatus } from '../device-status/DeviceStatus';
import { GameStatus } from '../game-status/GameStatus';

type Props = {
  children?: React.ReactNode;
};

export const StatusLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      maxWidth="100em"
      padding={4}
      marginX="auto"
      width="100%"
    >
      <Grid
        templateColumns={{
          base: '1fr',
          lg: '2fr 1fr',
        }}
        gap={4}
        flex={1}
      >
        <GridItem>{children}</GridItem>

        <GridItem
          gridRowStart={{
            base: 1,
          }}
          gridColumnStart={{
            base: 1,
            lg: 2,
          }}
        >
          <Grid gridTemplateColumns="1fr" gap={4}>
            <GridItem>
              <DeviceStatus />
            </GridItem>

            <GridItem>
              <GameStatus />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
};

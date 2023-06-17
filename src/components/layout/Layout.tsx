import { Box, Grid, GridItem } from '@chakra-ui/react';

import { DeviceStatus } from '../device-status/DeviceStatus';

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      maxWidth="80em"
      padding={4}
      marginX="auto"
      width="100%"
    >
      <Grid templateColumns="3fr 1fr" gap={4} flex={1}>
        <GridItem>{children}</GridItem>

        <GridItem>
          <DeviceStatus />
        </GridItem>
      </Grid>
    </Box>
  );
};

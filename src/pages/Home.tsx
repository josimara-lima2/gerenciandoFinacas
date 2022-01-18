import { Box } from '@mui/material';

import welcome from '../assets/images/welcome.png';

export default function Home() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img width="40%" src={welcome} alt="welcome" />
    </Box>
  );
}

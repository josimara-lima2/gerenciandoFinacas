import { Box as MuiBox, styled } from '@mui/material';

const Box = styled(MuiBox)(({ theme: { spacing, palette } }) => ({
  height: spacing(4),
  backgroundColor: palette.background.paper,
}));

export default function Footer() {
  return <Box>Footer</Box>;
}

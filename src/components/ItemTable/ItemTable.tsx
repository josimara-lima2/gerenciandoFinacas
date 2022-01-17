import React from 'react';
import { styled, Tooltip, Typography as MuiTypography } from '@mui/material';
import Zoom from '@mui/material/Zoom';

const Typography = styled(MuiTypography)(({ theme }) => ({
  width: '25%',
  [theme.breakpoints.up('xs')]: {
    marginLeft: 0,
    width: '40%',
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: '5%',
  },
}));

type Props = {
  title: string;
  item: string | number;
};
const ItemTable = ({ title, item }: Props) => {
  return (
    <Tooltip title={title} TransitionComponent={Zoom} placement="top-start">
      <Typography>{item}</Typography>
    </Tooltip>
  );
};

export default ItemTable;

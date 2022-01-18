import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';

type Props = {
  title: string;
  children?: React.ReactNode;
  item?: string | number;
  md: number;
  xs: number;
  sm: number;
};
const ItemTable = ({ title, item, md, xs, sm, children }: Props) => {
  return (
    <Tooltip title={title} TransitionComponent={Zoom} placement="top-start">
      <Grid item md={md} xs={xs} sm={sm}>
        {children || item}
      </Grid>
    </Tooltip>
  );
};

export default ItemTable;

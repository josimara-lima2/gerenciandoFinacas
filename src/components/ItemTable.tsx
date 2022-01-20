import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import Zoom from '@mui/material/Zoom';

type Props = {
  title: string;
  children?: React.ReactNode;
  item?: string | number;
  md: number;
};
const ItemTable = ({ title, item, md, children }: Props) => {
  return (
    <Tooltip title={title} TransitionComponent={Zoom} placement="top-start">
      <Grid item md={md} xs={12} sm={12}>
        {children || item}
      </Grid>
    </Tooltip>
  );
};

export default ItemTable;

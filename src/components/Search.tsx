import React from 'react';
import { Box as MuiBox, FormControl, Input, styled } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import useColorBlue from 'hooks/useColorBlue';

type Props = {
  onChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => void;
};

const StyledFormControl = styled(FormControl)(() => ({
  display: 'flex',
  flexDirection: 'row',
  marginRight: '30px',
  marginTop: '10px',
}));

export default function Search({ onChange }: Props) {
  const { color } = useColorBlue();

  const changeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e, e.currentTarget.value);
  };

  return (
    <MuiBox
      component="form"
      className="container"
      noValidate
      sx={{ marginTop: '15px', display: 'flex' }}
    >
      <StyledFormControl>
        <Input
          placeholder="Search"
          sx={{ borderRadius: '10px' }}
          onChange={e => changeInput(e)}
          endAdornment={
            <InputAdornment position="start" sx={{ color }}>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </StyledFormControl>
    </MuiBox>
  );
}

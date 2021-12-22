import Cadastro from 'components/Cadastro/Cadastro';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiList, UserSelector } from 'store/reducers/user';
import { useSelector } from 'react-redux';

export default function TelaCadastro() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(UserSelector);
  const tokenString = localStorage.getItem('token');
  const token = tokenString?.replace(/^"(.*)"$/, '$1');

  return (
    <>
      <Cadastro />
      <Box>
        <title>Lista de Cadastrados</title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>
                <IconButton>
                  <DeleteOutline />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

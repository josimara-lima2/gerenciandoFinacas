import Modal from 'components/Modal/Modal';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiDelete,
  ClientInterface,
  fetchApiPage,
  PageSelector,
} from 'store/reducers/pageClient';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import imgDel from '../../assets/images/delete.png';

type Props = {
  client: ClientInterface;
};

const DeleteClient = ({ client }: Props) => {
  const dispatch = useAppDispatch();
  const { pageCliente } = useAppSelector(PageSelector);
  const handleDelete = (id: string) => {
    dispatch(fetchApiDelete(id))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 201) {
          dispatch(fetchApiPage(String(pageCliente.page)));
        }
      });
  };
  return (
    <Modal
      title=""
      buttonIcon={<DeleteOutline />}
      cadastrar={() => handleDelete(client.id)}
      deletar
      tamanho="xs"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          margin: 0,
        }}
      >
        <Typography variant="h6">Excluir cliente</Typography>
        <Typography variant="subtitle2">
          Deseja excluir {client.name} de sua lista?
        </Typography>
        <Typography variant="subtitle2">Essa ação é irreversível!</Typography>
        <img width="100px" src={imgDel} alt="delete img" />
      </Box>
    </Modal>
  );
};

export default DeleteClient;

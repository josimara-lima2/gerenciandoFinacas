import {
  Box as MuiBox,
  TextField as MuiTextField,
  styled,
} from '@mui/material';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import CreateIcon from '@mui/icons-material/Create';
import { PageSelector, fetchApiPage } from 'store/reducers/pages';
import { maskCpf } from 'utils/masks';
import { fetchApiPut, ClientInterface } from '../../store/reducers/clients';

const Box = styled(MuiBox)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

type Props = {
  client: ClientInterface;
};

export default function Editar({ client }: Props) {
  const dispatch = useAppDispatch();
  const { pageCliente } = useAppSelector(PageSelector);

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [telephone, setTelephone] = useState(client.telephone);
  const [cpf, setCpf] = useState(client.cpf);

  const handleClick = (id: string) => {
    dispatch(fetchApiPut({ id, name, email, telephone, cpf }))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 200) {
          dispatch(fetchApiPage(pageCliente.page));
        } else {
          alert(statusCode);
        }
      })
      .catch(e => e.message);
  };
  const styleTextField = {
    margin: '5px',
    width: '80%',
    borderRadius: '20px',
  };
  return (
    <MuiBox
      component="form"
      className="container"
      noValidate
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '25px',
        marginTop: 0,
        marginRight: 0,
        marginLeft: '-30%',
      }}
    >
      <Modal
        title="Cadastre-se"
        buttonIcon={<CreateIcon />}
        cadastrar={() => handleClick(client.id)}
      >
        <Box>
          <MuiTextField
            id="nome"
            label="Nome"
            variant="outlined"
            required
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            sx={styleTextField}
          />
          <MuiTextField
            id="email"
            label="Email"
            variant="outlined"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={styleTextField}
          />
          <MuiTextField
            id="telephone"
            label="Telephone"
            variant="outlined"
            required
            value={telephone}
            onChange={e => setTelephone(e.target.value)}
            sx={styleTextField}
          />
          <MuiTextField
            id="cpf"
            label="Cpf"
            variant="outlined"
            required
            value={cpf}
            onChange={e => setCpf(maskCpf(e))}
            sx={styleTextField}
          />
        </Box>
      </Modal>
    </MuiBox>
  );
}

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  PageSelector,
  fetchApiPage,
  addClient,
  fetchApiPost,
} from 'store/reducers/pageClient';
import { maskCpf } from 'utils/masks';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CallIcon from '@mui/icons-material/Call';
import ModalAdd from 'components/Register/ModalAdd/ModalAdd';
import TextFieldCadastro from '../TextFieldCadastro';

export default function Cadastro() {
  const dispatch = useAppDispatch();
  const { pageCliente } = useAppSelector(PageSelector);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [cpf, setCpf] = useState('');

  const handleClick = () => {
    dispatch(fetchApiPost({ name, email, telephone, cpf }))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 200) {
          dispatch(
            addClient({ id: 'idTemporario', name, email, telephone, cpf }),
          );
          setName('');
          setEmail('');
          setTelephone('');
          setCpf('');
        }
        dispatch(fetchApiPage(pageCliente.page));
      })
      .catch(e => e.message);
  };

  return (
    <ModalAdd title="cliente" cadastrar={handleClick} tamanho="sm">
      <TextFieldCadastro
        label="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        icon={<PermIdentityIcon />}
      />
      <TextFieldCadastro
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        icon={<MailOutlineIcon />}
      />
      <TextFieldCadastro
        label="Telephone"
        value={telephone}
        onChange={e => setTelephone(e.target.value)}
        icon={<CallIcon />}
      />
      <TextFieldCadastro
        label="Cpf"
        value={cpf}
        onChange={e => setCpf(maskCpf(e))}
      />
    </ModalAdd>
  );
}

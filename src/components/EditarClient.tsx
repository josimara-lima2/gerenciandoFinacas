import { TextField as MuiTextField } from '@mui/material';
import Modal from 'components/Modal';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import {
  PageSelector,
  fetchApiPage,
  fetchApiPut,
  ClientInterface,
} from 'store/reducers/clientes';
import { maskCpf } from 'utils/masks';
import TextFieldCadastro from './TextFieldCadastro';

type Props = {
  client: ClientInterface;
};

export default function EditarClient({ client }: Props) {
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
        }
      })
      .catch(e => e.message);
  };

  return (
    <Modal title="editar" cadastrar={() => handleClick(client.id)}>
      <TextFieldCadastro
        label="Nome"
        value={name}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <TextFieldCadastro
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextFieldCadastro
        label="Telephone"
        value={telephone}
        onChange={e => setTelephone(e.target.value)}
      />

      <TextFieldCadastro
        onChange={e => setCpf(maskCpf(e))}
        label="Cpf"
        value={cpf}
      />
    </Modal>
  );
}

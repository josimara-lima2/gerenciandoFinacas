import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiDelete,
  ClientInterface,
  fetchApiPage,
  PageSelector,
} from 'store/reducers/clientes';

import React from 'react';
import ModalDelete from 'components/ModalDelete';

type Props = {
  client: ClientInterface;
};

const DeleteClient = ({ client }: Props) => {
  const [message, setMessage] = React.useState('');
  const dispatch = useAppDispatch();
  const { pageCliente } = useAppSelector(PageSelector);

  const handleDelete = (id: string) => {
    dispatch(fetchApiDelete(id))
      .unwrap()
      .then(response => {
        const { statusCode } = response;
        if (statusCode === 201) {
          dispatch(fetchApiPage(pageCliente.page));
        }
      })
      .catch(error => setMessage(error.message));
  };

  const deleteProps = () => {
    handleDelete(client.id);
  };
  return <ModalDelete title="" deleteProps={deleteProps} name={client.name} />;
};

export default DeleteClient;

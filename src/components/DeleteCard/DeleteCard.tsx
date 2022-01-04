import Modal from 'components/Modal/Modal';
import { DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiDelete,
  CardInterface,
  fetchApiPageCard,
  PageCardSelector,
} from 'store/reducers/pageCard';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import imgDel from '../../assets/images/delete.png';

type Props = {
  card: CardInterface;
};

const DeleteCard = ({ card }: Props) => {
  const dispatch = useAppDispatch();
  const { pageCard } = useAppSelector(PageCardSelector);

  const deleteCardId = (code: string) => {
    const cardCode = pageCard.data.filter(card => card.code === code);

    if (cardCode[0].id) {
      dispatch(fetchApiDelete(cardCode[0].id))
        .unwrap()
        .then(response => {
          const { statusCode } = response;
          if (statusCode === 201) {
            dispatch(fetchApiPageCard(pageCard.page));
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };
  return (
    <Modal
      title=""
      buttonIcon={<DeleteOutline />}
      cadastrar={() => deleteCardId(card.code)}
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
        <Typography variant="h6">Excluir Cartão</Typography>
        <Typography variant="subtitle2">
          Deseja excluir {card.name} de sua lista?
        </Typography>
        <Typography variant="subtitle2">Essa ação é irreversível!</Typography>
        <img width="100px" src={imgDel} alt="delete img" />
      </Box>
    </Modal>
  );
};

export default DeleteCard;

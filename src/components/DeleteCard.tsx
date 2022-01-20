import { useAppDispatch, useAppSelector } from 'store';
import {
  fetchApiDelete,
  CardInterface,
  fetchApiPageCard,
  PageCardSelector,
} from 'store/reducers/cartoes';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ModalDelete from 'components/ModalDelete';
import imgDel from '../assets/images/delete.png';

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

  const deleteProps = () => {
    deleteCardId(card.code);
  };
  return <ModalDelete title="" deleteProps={deleteProps} name={card.name} />;
};

export default DeleteCard;

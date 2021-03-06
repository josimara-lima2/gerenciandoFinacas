import {
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
  CardActionArea,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import useColorBlue from 'hooks/useColorBlue';

type Props = {
  title: string;
  toLink: string;
  children?: React.ReactNode;
  img: string;
};

const Card = styled(MuiCard)(({ theme }) => ({
  maxWidth: 445,
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(2),
  },
}));

function CardPersonalizado({ title, toLink, children, img }: Props) {
  const { color } = useColorBlue();
  return (
    <Card>
      <CardActionArea sx={{ cursor: 'default' }}>
        <CardMedia component="img" height="350" image={img} alt="imagem card" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link style={{ textDecoration: 'none', color }} to={toLink}>
          Ver mais
        </Link>
      </CardActions>
    </Card>
  );
}

export default CardPersonalizado;

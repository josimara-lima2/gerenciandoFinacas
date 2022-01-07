import { IconButton, Alert, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
};
const Alerta = ({ open, setOpen, message }: Props) => {
  return (
    <Collapse in={open}>
      <Alert
        severity="error"
        color="error"
        action={
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mt: 10 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default Alerta;

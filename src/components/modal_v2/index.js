import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Icon from '../icon';

const Modal = forwardRef(
  (
    {
      title,
      children,
      onBackClose = true,
      maxWidth = 'md',
      popup,
      icon,
      dialogActions,
      keepMounted,
      fullWidth = true,
      sx
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useImperativeHandle(ref, () => ({
      open() {
        handleOpen();
      },
      close() {
        handleClose();
      }
    }));

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Dialog
        open={open}
        onClose={() => (onBackClose ? handleClose() : false)}
        maxWidth={maxWidth}
        fullScreen={popup ? false : fullScreen}
        fullWidth={fullWidth}
        keepMounted={keepMounted}
      >
        {title && (
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Grid container alignItems={'center'}>
              {!!icon && (
                <Icon size="35px" color="primary">
                  {icon}
                </Icon>
              )}
              <Typography variant="h6" color="inherit" component="div">
                {title}
              </Typography>
            </Grid>
            <IconButton aria-label="close" onClick={handleClose}>
              <Close />
            </IconButton>
          </DialogTitle>
        )}
        <DialogContent sx={sx} dividers>
          {children}
        </DialogContent>
        <DialogActions>{dialogActions}</DialogActions>
      </Dialog>
    );
  }
);

export default Modal;

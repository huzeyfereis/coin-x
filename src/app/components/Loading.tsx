import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/useTypedSelcetor';

const Loading = () => {
  const { isLoading } = useAppSelector((state) => state.coinsList);

  const [open, setOpen] = React.useState(isLoading);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default Loading;

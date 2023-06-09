import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { singleCoinActions } from '../../../features/singleCoinSlice';
import { fetchSingleCoin } from '../../../features/singleCoinSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/useTypedSelcetor';
import { Box, Divider } from '@mui/material';
import millify from 'millify';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const CoinDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { selectedCoinId } = useAppSelector((state) => state.coinsList);
  const { singleCoin } = useAppSelector((state) => state);
  const { fetchDataRequest } = singleCoinActions;
  const { name, rank, symbol, iconUrl, price, marketCap, change, description } =
    singleCoin.data;

  useEffect(() => {
    dispatch(fetchDataRequest());
    dispatch(fetchSingleCoin(selectedCoinId));
  }, [dispatch, fetchDataRequest, selectedCoinId]);

  return (
    <div>
      <Card sx={{ minWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: '#f5f5f5',
              }}
              aria-label='recipe'
            >
              <img src={iconUrl} width={30} height={30} alt='logo' />
            </Avatar>
          }
          title={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Typography sx={{ fontWeight: '700' }}>{name}</Typography>
              <Typography variant='body2'>{symbol}</Typography>
              <Box
                sx={{
                  border: '1px solid #8bdcfa',
                  backgroundColor: '#b1e8fc',
                  fontSize: '13px',
                  padding: '3px',
                  fontWeight: '600',
                }}
              >
                # {rank}
              </Box>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              Summary
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {description}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Price
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                $ {(+price).toFixed(2)}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Market Capacity
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                $ {millify(+marketCap)}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Change
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  color: `${
                    +change === 0 ? '#F1C40F' : +change > 0 ? 'green' : 'red'
                  }`,
                }}
              >
                {+change === 0 ? (
                  <HorizontalRuleIcon
                    fontSize='small'
                    style={{ color: '#F1C40F' }}
                  />
                ) : +change > 0 ? (
                  <ArrowUpwardIcon
                    fontSize='small'
                    style={{ color: 'green' }}
                  />
                ) : (
                  <ArrowDownwardIcon
                    fontSize='small'
                    style={{ color: 'red' }}
                  />
                )}
                &nbsp;
                {change}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoinDetailsPage;

import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/useTypedSelcetor';
import millify from 'millify';
import {
  coinsListActions,
  fetchAllCoins,
} from '../../../../features/coinsListSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CoinsList = () => {
  const navigate = useNavigate();
  const { coinsList } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { fetchDataRequest, setSelectedCoin } = coinsListActions;

  useEffect(() => {
    dispatch(fetchDataRequest());
    dispatch(fetchAllCoins());
  }, [fetchDataRequest, dispatch]);

  const handleGetCoinDetails = (id: string, symbol: string) => {
    dispatch(setSelectedCoin(id));
    navigate(`/details/${symbol}`);
  };

  if (coinsList.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: '800px' }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Ranking</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Market Cap</StyledTableCell>
              <StyledTableCell>Change</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinsList.data.map((coin) => (
              <StyledTableRow
                key={coin.uuid}
                id={coin.uuid}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: '#ede5e3',
                  },
                }}
                onClick={() => handleGetCoinDetails(coin.uuid, coin.symbol)}
              >
                <StyledTableCell>{coin.rank}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <img width={30} height={30} src={coin.iconUrl} alt='logo' />
                  {`${coin.name} (${coin.symbol})`}
                </StyledTableCell>
                <StyledTableCell>{`$ ${(+coin.price).toFixed(
                  2
                )}`}</StyledTableCell>
                <StyledTableCell>{millify(+coin.marketCap)}</StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    color: `${
                      +coin.change === 0
                        ? '#F1C40F'
                        : +coin.change > 0
                        ? 'green'
                        : 'red'
                    }`,
                  }}
                >
                  {+coin.change === 0 ? (
                    <HorizontalRuleIcon
                      fontSize='small'
                      style={{ color: '#F1C40F' }}
                    />
                  ) : +coin.change > 0 ? (
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
                  {coin.change}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CoinsList;

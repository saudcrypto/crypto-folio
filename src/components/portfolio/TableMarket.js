/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/forbid-prop-types: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';

import { FormattedPercentage, FormattedCurrency } from '../formatted';

const Container = styled.div`
  padding-top: 2%;
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.table`
  width: 405px;
  text-align: left;
  height: 500px;
  border-radius: 4px;
  font-family: ${props => theme[props.theme].fontFamily}, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: ${props => theme[props.theme].primaryColor};
  font-size: 15px;
  line-height: ${props => theme[props.theme].lineHeight}rem;
  letter-spacing: ${props => theme[props.theme].letterSpacing}rem;
  margin-bottom: 2rem;
  background-color: ${props => theme[props.theme].backgroundColor};
`;

const CoinContainer = styled.div`
  display: flex;
  padding-left: 20px;
  padding-top: 5px;
`;

const CoinLogo = styled.div`
  padding-top: 3px;
`;

const CoinName = styled.div`
  padding-left: 10px;
  padding-top: 3px;
`;

function TableMarket(props) {
  return (
    <Container>
      <TableContainer theme={props.theme}>
        <tbody>
          {
            props.coins.map((coin) => {
              const change24 = coin.percent_change_24h / 100;
              const percentageClass = coin.percent_change_24h < 0 ? 'negative' : 'positive';
              return (
                <tr key={coin.name}>
                  <td>
                    <CoinContainer>
                      <CoinLogo>{coin.icon}</CoinLogo>
                      <CoinName>{coin.symbol}</CoinName>
                    </CoinContainer>
                  </td>
                  <td>
                    <FormattedCurrency class={percentageClass} value={coin.price_usd} />
                  </td>
                  <td>
                    <FormattedPercentage value={change24} class={percentageClass} />
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </TableContainer>
    </Container>
  );
}

TableMarket.propTypes = {
  coins: PropTypes.array,
  theme: PropTypes.string,
};

TableMarket.defaultProps = {
  coins: [],
  theme: 'light',
};

export default TableMarket;

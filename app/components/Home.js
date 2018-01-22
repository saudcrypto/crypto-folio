import React, { Component } from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { connect } from 'react-redux';

import theme from '../utils/theme';
import wallet from '../config/wallet/';
import ThemeSwitcher from './ThemeSwitcher';
import Trend from './Trend';

import searchInformation from '../infrastructure/';
import { ResumePortfolio, TableMarket, TablePortfolio } from './portfolio';

import store from '../utils/store';

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin-top: 1%;
  font-family: ${props => theme[props.theme].fontFamily}, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: ${props => theme[props.theme].primaryColor};
  font-size: ${props => theme[props.theme].titleSize}px;
  line-height: ${props => theme[props.theme].lineHeight}rem;
  letter-spacing: ${props => theme[props.theme].letterSpacing}rem;
  text-align: center;
  > div {
    color: ${props => theme[props.theme].dotColor};
  }
`;

const Container = styled.div`
  background-color: ${props => theme[props.theme].bodyColor};
  padding-top: 2%;
  text-align: center;
`;

const ContentContainer = styled.div`
  div.slider-decorator-2,.slider-decorator-0,.slider-decorator-1{
    display: none;
  }
  display: flex;
  justify-content: space-around;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: wallet,
      totalPrice: 0,
      theme: 'light',
    };
    this.subscribeTheme = this.subscribeTheme.bind(this);
    this.subscribeTheme();
  }

  componentWillMount() {
    this.fetchInformations();
  }

  componentDidMount() {
    setInterval(
      () => this.fetchInformations(),
      (1000 * 60 * 2),
    );
  }

  subscribeTheme() {
    store.subscribe(() => {
      const lastTheme = store.getState().themeReducer.pop().theme;
      this.setState({ theme: lastTheme });
    });
  }

  fetchInformations() {
    return searchInformation(this.state.coins)
      .then((coins) => {
        this.setState({ coins, totalPrice: coins.reduce((a, b) => (a + b.totalPrice), 0) });
      });
  }

  render() {
    return (
      <Container theme={this.state.theme}>
        <Title theme={this.state.theme}>
          CRYPTO FOLIO
          <div>.</div>
        </Title>
        <Trend />
        <ContentContainer theme={this.state.theme}>
          <Carousel
            dragging
            swiping
          >
            <TableMarket theme={this.state.theme} coins={this.state.coins} />
            <TablePortfolio theme={this.state.theme} coins={this.state.coins} />
            <ResumePortfolio theme={this.state.theme} totalPrice={this.state.totalPrice} />
          </Carousel>
        </ContentContainer>
        <ThemeSwitcher />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(Home);

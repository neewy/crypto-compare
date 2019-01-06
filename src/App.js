import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import axios from 'axios';
import * as Api from './api.js';

import CurrencyPicker from './CurrencyPicker.js';
import RateChart from './RateChart.js';
import RateHistory from './RateHistory.js';

class App extends Component {

  state = {
    isLoading: true,
    fiatNames: [],
    cryptoNames: [],
    selectedFiat: '',
    selectedCrypto: ''
  }

  handleFiat = (fiatValue) => {
    this.setState({selectedFiat: fiatValue});
  }

  handleCrypto = (cryptoValue) => {
    this.setState({selectedCrypto: cryptoValue});
  }

  componentWillMount() {
    App = this;
    axios.all([Api.getFiatNames(), Api.getCryptoNames()])
    .then(axios.spread(function (fiat, crypto) {
      App.setState({
        fiatNames: Object.keys(fiat.data).sort(),
        cryptoNames: Object.keys(crypto.data.Data).sort(),
        isLoading: false
      });
    })).catch(e => console.error(e));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12}>
                <CurrencyPicker
                  isLoading={this.state.isLoading}
                  fiat={this.state.fiatNames}
                  crypto={this.state.cryptoNames}
                  onSelectFiat={this.handleFiat}
                  onSelectCrypto={this.handleCrypto} />
              </Col>

              <Col xs={12}>
                <RateChart />
              </Col>
            </Row>
          </Col>

          <Col xs={12} md={3}>
            <RateHistory />
          </Col>

        </Row>
      </Grid>
    );
  }
}

export default App;

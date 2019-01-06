import React, { Component } from 'react';
import styled from 'styled-components';
import 'bulma/css/bulma.css';
import * as Api from './api.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEquals } from '@fortawesome/free-solid-svg-icons'

library.add(faEquals)

const Picker = styled.form`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
`

const Field = styled.div`
    margin: 0 !important; //господи прости
`

class AssetSelector extends Component { 

    myRef = React.createRef();

    makeAsset = function(item, index) {
        return <option key={index} value={item}>{item}</option>;
    }

    handleChange = (event) => {
        this.props.onSelect(event.target.value);            
    }

    handleInput = (event) => {
        this.props.onInput(event.target.value);            
    }

    componentDidMount() {
        console.log(this.props); // не вызывается когда this.props.isLoading == false !!!
    }

    render() {
        return (
            <Field className="field has-addons">
            <p className="control">
                <span className={`select ${this.props.isLoading && 'is-loading'}`}>
                <select
                    onChange={this.handleChange}
                    ref={this.myRef}>
                        {!this.props.isLoading && this.props.assets.map(this.makeAsset)}
                </select>
                </span>
            </p>
            <p className="control">
            <input className="input"
                    type="text" 
                    placeholder='Amount of assets'
                    onChange={this.handleInput} />
            </p>
            </Field>
        );
    }
}

class CurrencyPicker extends Component {

    state = {
        fiat: '',
        crypto: ''
    }

    handleFiatSelection = (value) => {
        this.props.onSelectFiat(value);
        this.setState({fiat: value})            
    }

    handleCryptoSelection = (value) => {
        this.props.onSelectCrypto(value);
        this.setState({crypto: value})             
    }

    hangleFiatInput = (value) => {
        Api.getDailyAverage(this.state.fiat, this.state.crypto)
        .then(res => console.log(res.data))
        .catch(e => console.error(e))                   
    }

    hangleCryptoInput = (value) => {
        Api.getDailyAverage(this.state.crypto, this.state.fiat)
        .then(res => console.log(res.data))
        .catch(e => console.error(e))           
    }

    render() {
        return (
            <Picker>
                <AssetSelector 
                isLoading={this.props.isLoading} 
                assets={this.props.fiat}
                onSelect={this.handleFiatSelection}
                onInput={this.hangleFiatInput} />

                <span><FontAwesomeIcon icon="equals" /></span>

                <AssetSelector
                isLoading={this.props.isLoading} 
                assets={this.props.crypto}
                onSelect={this.handleCryptoSelection}
                onInput={this.hangleCryptoInput} />
            </Picker>
        );
    }
}


export default CurrencyPicker;
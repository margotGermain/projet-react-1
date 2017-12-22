import React, { Component } from 'react';
import logo from './css/picture.png';
import './css/Application.css';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { Switch, Link, Route } from "react-router-dom";

import StoreSelection from "./components/StoreSelection";
import Store from "./components/Store";

class App extends Component {

  state = {
    text:"",
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-title"><h1>{this.props.store.name}</h1></div>
        </header>
        <div className="body">
          {
            this.props.store.storeValid ?
              <Store/>
            :
              <StoreSelection/>
          }
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state) => ({
  store: state.store,
});


const mapActionsToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapActionsToProps)( App );

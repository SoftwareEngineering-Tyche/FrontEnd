import React, { Component } from 'react';
import axios from 'axios';

import Movies from './Movies';

class SearchBar extends Component {
  state = {
    nfts: null,
    loading: false,
    value: ''
  };

  search = async val => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    const nfts = await res.data.results;

    this.setState({ nfts, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderNfts() {
    let nfts = <h1>There's no nfts</h1>;
    if (this.state.nfts) {
      nfts = <Nfts list={this.state.nfts} />;
    }

    return nfts; 
  }
}
export default SearchBar;
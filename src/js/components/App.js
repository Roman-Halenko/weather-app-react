import React, { Component } from "react";
import Article from "./Article";
import data from "../Data";

const API =
  "https://api.openweathermap.org/data/2.5/weather?id=524901&APPID=1d0043e9a6077c0e96a2cea071bf251b";

export default class App extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    const { name } = this.state.data;
    return (
      <div className="container backdrop-blur">
        <h1 className="title">{name}</h1>
        <Article article={data[0]} foo="bar" />
      </div>
    );
  }
}

import logo from "./logo.svg";
import "./App.css";
import IRAnalysis from "./Pages/IRAnalysis";
import { Component } from "react";

class App extends Component {
  // defines class attributes
  state = {
    table: [] as (string | number)[],
    header: [] as string[],
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>IR data analysis</h1>
          <div className="main-element">
            <IRAnalysis />
          </div>
        </header>
      </div>
    );
  }
}

export default App;

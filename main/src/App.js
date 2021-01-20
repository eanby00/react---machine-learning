import React, { Component } from "react";
import './App.css';
import "./components/ModelDatas";
import ModelDatas from "./components/ModelDatas";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      datas: [
        {
          id: 1,
          name: "샘플1",
          type: "회귀",
          loss_type: "mse",
          loss: 0.05,
          accuracy: 99.5,
          language: "파이썬"
        },
        {
          id: 2,
          name: "샘플2",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬"
        },
        {
          id: 3,
          name: "샘플3",
          type: "회귀",
          loss_type: "mse",
          loss: 0.5,
          accuracy: 99,
          language: "파이썬"
        },
        {
          id: 4,
          name: "샘플4",
          type: "회귀",
          loss_type: "mse",
          loss: 2,
          accuracy: 97,
          language: "파이썬"
        }
      ]
    };
  }

  render(){
    return(
      <div className="App">
        <ModelDatas datas={this.state.datas}></ModelDatas>
      </div>
    )
  }
}

export default App;

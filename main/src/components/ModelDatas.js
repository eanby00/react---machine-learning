import React, { Component } from "react";
import ModelData from "./ModelData";

class ModelDatas extends Component{
  constructor(props){
    super(props);
    this.state = {
      datas: this.props.datas
    }
  }
    render(){
      var lists = [];
      for (var i in this.state.datas){
        console.log(this.state.datas[i]);
        lists.push(<ModelData key={this.state.datas[i].id} data={this.state.datas[i]}></ModelData>)
      }
      return(
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>회귀/분류</th>
            <th>loss 종류</th>
            <th>loss</th>
            <th>정확도</th>
            <th>언어 종류</th>
            <th>확인</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
      );
    }
}

export default ModelDatas;
import React, { Component } from "react";
import ModelData from "./ModelData";
// import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>회귀/분류</TableCell>
            <TableCell>loss 종류</TableCell>
            <TableCell>loss</TableCell>
            <TableCell>정확도</TableCell>
            <TableCell>언어 종류</TableCell>
            <TableCell>확인</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lists}
        </TableBody>
      </Table>
      );
    }
}

export default ModelDatas;
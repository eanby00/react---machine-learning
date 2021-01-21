import React, { Component } from "react";
import ModelData from "./ModelData";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: theme.spacing(3),
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  table: {
    minwidth: 1080
  },
  tableHead: {
    fontSize: "1.0rem"
  }
});

class ModelDatas extends Component{
  
    render(){
      const { classes } = this.props;
      var lists = [];
      for (var i in this.props.datas){
        lists.push(<ModelData key={this.props.datas[i].id} data={this.props.datas[i]}></ModelData>)
      }
      

      return(
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead className={classes.TableHead}>
                <TableRow>
                  <TableCell>이름</TableCell>
                  <TableCell>회귀/분류</TableCell>
                  <TableCell>loss 종류</TableCell>
                  <TableCell>loss</TableCell>
                  <TableCell>정확도</TableCell>
                  <TableCell>언어 종류</TableCell>
                  <TableCell>생성 날짜</TableCell>
                  <TableCell>수정 날짜</TableCell>
                  <TableCell>확인</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lists}
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }
}

export default withStyles(styles) (ModelDatas);
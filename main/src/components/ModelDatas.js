import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ModelData from "./ModelData";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
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
}));

const ModelDatas = (props) => {

    const ChangeData = (e) => {
        props.onChangeData(e);
    }

    const classes = useStyles();
    var lists = [];
    for (var i in props.datas){
      lists.push(<ModelData key={props.datas[i].id} data={props.datas[i]} onChangeData={ChangeData}></ModelData>)
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
                    <TableCell>삭제</TableCell>
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

export default ModelDatas;
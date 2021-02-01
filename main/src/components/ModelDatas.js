import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import ModelData from "./ModelData";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      margin: theme.spacing(3),
      overflowX: "auto",
      marginLeft: 18,
      marginRight: 18
    },
    table: {
      minwidth: 1080
    },
    tableHead: {
      fontSize: "1.0rem",
      overflowX: "auto"
    }
}));

const ModelDatas = (props) => {

    const [dataType, setDataType] = useState("id");
    const [sortType, setSortType] = useState(true);

    const changeSortType = (event, type) => {
        event.preventDefault();
        if (dataType === type) {
            setSortType(!sortType);
        } else {
            setDataType(type);
            setSortType(true);
        }
        props.onChangeSortType(dataType, sortType);
    }

    const ChangeData = (e) => {
        props.onChangeData(e);
    }

    const classes = useStyles();
    var lists = [];
    for (var i in props.datas){
      lists.push(<ModelData key={props.datas[i].id} data={props.datas[i]} onChangeData={ChangeData}></ModelData>)
    }
    
    return(
      <Box conponent="div" className={classes.root}>
            <Table className={classes.table}>
              <TableHead className={classes.TableHead}>
                <TableRow>
                  <TableCell><Button onClick={(event) => changeSortType(event, "name")}>이름</Button></TableCell>
                  <TableCell><Button onClick={(event) => changeSortType(event, "type")}>회귀/분류</Button></TableCell>
                  <TableCell><Button onClick={(event) => changeSortType(event, "loss_type")}>loss 종류</Button></TableCell>
                  <TableCell><Button onClick={(event) => changeSortType(event, "loss")}>loss</Button></TableCell>
                  <TableCell><Button onClick={(event) => changeSortType(event, "accuracy")}>정확도</Button></TableCell>
                  <TableCell><Button onClick={(event) => changeSortType(event, "language")}>언어 종류</Button></TableCell>
                  <TableCell><Button onClick={(event) => changeSortType(event, "date_create")}>생성 날짜</Button></TableCell>
                  <TableCell><Button onClick={(event) => changeSortType(event, "date_modify")}>수정 날짜</Button></TableCell>
                  <TableCell>확인</TableCell>
                  <TableCell>삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lists}
              </TableBody>
            </Table>
      </Box>
    );
}

export default ModelDatas;
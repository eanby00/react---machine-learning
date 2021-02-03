import React, { useState } from "react";

// 컴포넌트 import
import DeleteData from "./DeleteData";
import ConfirmData from "./ConfirmData";

// material-ui/core에서 import
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";


const theme = unstable_createMuiStrictModeTheme();

const useStyles = makeStyles((theme) => ({
    tableCell_low: {
      [theme.breakpoints.down('xs')]: {
        display: "none"
      },
    },
    tableCell_medium: {
      [theme.breakpoints.down('sm')]: {
        display: "none"
      },
    },
    tableCell_high: {
      [theme.breakpoints.down('md')]: {
        display: "none"
      },
    },
}));

const ModelData = (props) => {
    const classes = useStyles();
    const [data] = useState(props.data);

    const deleteData = (id) => {
        props.onChangeData(id)
    }

    const restoreData = (e) => {
        e.preventDefault();
        props.onChangeData(data.id)
    }

    var button = null;

    if (data.isDeleted === false){
        button = <ThemeProvider theme={theme}>
                    <DeleteData data={data} onChangeData={deleteData}/>
                    </ThemeProvider>;
    } else {
        button = <Button variant="contained" color="secondary" onClick={restoreData}>복원</Button>;
    }

    return(
        
            <TableRow>
                <TableCell>{data.name}</TableCell>
                <TableCell className={classes.tableCell_low}>{data.type}</TableCell>
                <TableCell className={classes.tableCell_medium}>{data.loss_type}</TableCell>
                <TableCell className={classes.tableCell_low}>{data.loss}</TableCell>
                <TableCell className={classes.tableCell_medium}>{data.accuracy}</TableCell>
                <TableCell className={classes.tableCell_medium}>{data.language}</TableCell>
                <TableCell className={classes.tableCell_high}>{data.date_create}</TableCell>
                <TableCell className={classes.tableCell_high}>{data.date_modify}</TableCell>
                <TableCell>
                    <ThemeProvider theme={theme}>
                        <ConfirmData data={data}></ConfirmData>
                    </ThemeProvider>
                </TableCell>
                <TableCell>
                    {button}
                </TableCell>
            </TableRow>
    );
}

export default ModelData;
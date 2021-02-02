import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DeleteData from "./DeleteData";
import { makeStyles } from '@material-ui/core/styles';

import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

import ConfirmData from "./ConfirmData";
import Paper from "@material-ui/core/Paper";

const theme = unstable_createMuiStrictModeTheme();

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      margin: theme.spacing(3),
      overflowX: "auto",
      marginLeft: 18,
      marginRight: 18
    }
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
                <TableCell>{data.type}</TableCell>
                <TableCell>{data.loss_type}</TableCell>
                <TableCell>{data.loss}</TableCell>
                <TableCell>{data.accuracy}</TableCell>
                <TableCell>{data.language}</TableCell>
                <TableCell>{data.date_create}</TableCell>
                <TableCell>{data.date_modify}</TableCell>
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
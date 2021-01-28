import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DeleteData from "./DeleteData";

import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

import * as tf from "@tensorflow/tfjs";

const theme = unstable_createMuiStrictModeTheme();

const ModelData = (props) => {
    const [data] = useState(props.data);

    const deleteData = (id) => {
        props.onChangeData(id)
    }

    const restoreData = (e) => {
        e.preventDefault();
        props.onChangeData(data.id)
    }

    const openData = () => {
        if (data.language === "파이썬"){
            if(data.model_json !== "") {
                tf.loadLayersModel("./model_data/model.json").then(function(model){
                    model.predict().print();
                })
            }
        } else {

        }
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
            <TableCell><Button variant="contained" color="primary" onClick={openData}>확인</Button></TableCell>
            <TableCell>
                {button}
            </TableCell>
        </TableRow>
    );
}

export default ModelData;
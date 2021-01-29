import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DeleteData from "./DeleteData";

import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

import * as tf from "@tensorflow/tfjs";
import Papa from "papaparse";

const theme = unstable_createMuiStrictModeTheme();

const ModelData = (props) => {
    const [data] = useState(props.data);
    const [rows, setRows] = useState([]);
    const [code, setCode] = useState([]);

    React.useEffect(() => {
        async function getData() {
            const response = await fetch(data.data);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value);
            const results = Papa.parse(csv, {header:true});
            const rows = results.data;
            setRows(rows);
        }

        async function getCode() {
            const response = await fetch(data.code);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const code = decoder.decode(result.value);
            setCode(code);
        }

        getData();
        getCode();
    }, [data])

    const deleteData = (id) => {
        props.onChangeData(id)
    }

    const restoreData = (e) => {
        e.preventDefault();
        props.onChangeData(data.id)
    }

    const openData = () => {
        console.log(rows[0]["medv"])
        console.log(rows[0]['crim', 'zn', 'indus', 'chas', 'nox', 'rm', 'age', 'dis', 'rad', 'tax', 'ptratio', 'b', 'lstat'])
        if (data.language === "파이썬"){
            if(data.model_json !== "") {
                tf.loadLayersModel(data.model_json).then(function(model){
                    model.predict(tf.tensor([0.00632,18.0,2.31,0,0.538,6.575,65.2,4.09,1,296,15.3,396.9,4.98], [1,13])).print();
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
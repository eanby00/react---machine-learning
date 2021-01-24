import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DeleteData from "./DeleteData";

import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

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
            <TableCell><Button variant="contained" color="primary">확인</Button></TableCell>
            <TableCell>
                {button}
            </TableCell>
        </TableRow>
    );
}

export default ModelData;
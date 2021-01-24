import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DeleteData from "./DeleteData";

import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

const theme = unstable_createMuiStrictModeTheme();


class ModelData extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render(){
        var button = null;
        if (this.state.data.isDeleted === false){
            button = <ThemeProvider theme={theme}>
                        <DeleteData data={this.props.data} onChangeData={function(e) {
                        this.props.onChangeData(e)}.bind(this)}/>
                     </ThemeProvider>;
        } else {
            button = <Button variant="contained" color="secondary" onClick={function(e) {
                        e.preventDefault();
                        this.props.onChangeData(this.state.data.id)
                     }.bind(this)}>복원</Button>;
        }
        return(
            <TableRow>
                <TableCell>{this.state.data.name}</TableCell>
                <TableCell>{this.state.data.type}</TableCell>
                <TableCell>{this.state.data.loss_type}</TableCell>
                <TableCell>{this.state.data.loss}</TableCell>
                <TableCell>{this.state.data.accuracy}</TableCell>
                <TableCell>{this.state.data.language}</TableCell>
                <TableCell>{this.state.data.date_create}</TableCell>
                <TableCell>{this.state.data.date_modify}</TableCell>
                <TableCell><Button variant="contained" color="primary">확인</Button></TableCell>
                <TableCell>
                    {button}
                </TableCell>
            </TableRow>
        );
    }
}

export default ModelData;
import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

class ModelData extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render(){
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
                    <Button variant="contained" color="primary" onClick={function(e) {
                                e.preventDefault();
                                this.props.onDeleteData(this.state.data.id)
                            }.bind(this)}>삭제</Button>
                </TableCell>
            </TableRow>
        );
    }
}

export default ModelData;
import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

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
                <TableCell><button>확인</button></TableCell>
            </TableRow>
        );
    }
}

export default ModelData;
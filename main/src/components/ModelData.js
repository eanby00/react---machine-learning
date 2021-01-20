import React, { Component } from "react";

class ModelData extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };
    }
    render(){
        return(
            <tr>
                <td>{this.state.data.name}</td>
                <td>{this.state.data.type}</td>
                <td>{this.state.data.loss_type}</td>
                <td>{this.state.data.loss}</td>
                <td>{this.state.data.accuracy}</td>
                <td>{this.state.data.language}</td>
                <td><button>확인</button></td>
            </tr>
        );
    }
}

export default ModelData;
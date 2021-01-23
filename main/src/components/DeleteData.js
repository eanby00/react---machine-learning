import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class DeleteData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: this.props.data
        }
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen.bind(this)}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose.bind(this)}>
                    <DialogTitle onClose={this.handleClose.bind(this)}>삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>선택한 데이터가 삭제됩니다.</Typography>
                    </DialogContent>
                    <DialogActions>
                    <Button variant="contained" color="primary" onClick={function(e) {
                                e.preventDefault();
                                this.props.onChangeData(this.state.data.id)
                            }.bind(this)}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose.bind(this)}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DeleteData
import React, { Component } from  "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class DataDelete extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            open: false
        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClickClose() {
        this.setState({open: false});
    }

    render() {
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle onClose={this.handleClickClose}>삭제 경고</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 데이터가 삭제됩니다.
                        </Typography>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={function(e) {
                                e.preventDefault();
                                this.props.onDeleteData(this.state.data.id)
                            }.bind(this)}>삭제</Button>
                            <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default DataDelete;
import React, { useState } from "react";

// material-ui/core에서 import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const DeleteData = (props) => {
    const [open, setOpen] = useState(false);
    const [data] = useState(props.data);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = (e) => {
        e.preventDefault();
        props.onChangeData(data.id);
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>삭제</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}>삭제 경고</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>선택한 데이터가 삭제됩니다.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={deleteData}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DeleteData;
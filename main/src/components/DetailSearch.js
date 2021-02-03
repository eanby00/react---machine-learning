import React, {useState} from "react";

// material-ui/core에서 import
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 10
    },
    input: {
        margin: theme.spacing(1),
        width: '25ch',
    }
}))

const langs = ["", "파이썬", "자바스크립트"];
const modelTypes = ["", "회귀", "분류"];

const DetailSearch = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [loss_type, setLossType] = useState("");
    const [date_create, setDateCreate] = useState("");
    const [date_modify, setDateModify] = useState("");
    const [lang, setLang] = useState("");
    const [modelType, setModelType] = useState("");
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    } 

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleLossType = (event) => {
        setLossType(event.target.value);
    }

    const handleDateCreate = (event) => {
        setDateCreate(event.target.value);
    }

    const handleDateModify = (event) => {
        setDateModify(event.target.value);
    }

    const handleLangChange = (event) => {
        setLang(event.target.value);
    }

    const handleModelTypeChange = (event) => {
        setModelType(event.target.value);
    }

    const onSendSearchKeyword = (event) => {
        setOpen(false);
        props.onChangeSearchKeyword({name: name, type: modelType, loss_type: loss_type, language: lang, date_create: date_create, date_modify: date_modify});
    }

    return(
        <div className={classes.root}>
            <Button variant="contained" onClick={handleClickOpen} className={classes.word}>상세검색</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}>상세 검색</DialogTitle>
                <DialogContent>
                    <TextField className={classes.input} id="name" label="이름" variant="outlined" onChange={handleName}/>
                    <TextField
                        className={classes.input}
                        id="type"
                        select
                        label="회귀/분류"
                        value={modelType}
                        onChange={handleModelTypeChange}
                        variant="outlined"
                        >
                        {modelTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField className={classes.input} id="loss_type" label="Loss 종류" variant="outlined" onChange={handleLossType}/>
                    <TextField
                        className={classes.input}
                        id="language"
                        select
                        label="언어 종류"
                        value={lang}
                        onChange={handleLangChange}
                        variant="outlined"
                        >
                        {langs.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField className={classes.input} id="date_create" label="생성 날짜" variant="outlined" onChange={handleDateCreate}/>
                    <TextField className={classes.input} id="date_modify" label="수정 날짜" variant="outlined" onChange={handleDateModify}/>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={onSendSearchKeyword}>검색</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DetailSearch;
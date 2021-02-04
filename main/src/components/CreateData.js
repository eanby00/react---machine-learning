import React, { useState } from "react";

// material-ui/core에서 import
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 10
    },
    input: {
        margin: theme.spacing(1),
        width: '40%',
    }
}))

const CreateData = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [data] = useState(props.data);
    const [id, setId] = useState(data.length);
    const [name, setName] = useState("");
    const [type, setType] = useState("회귀");
    const [loss_type, setLossType] = useState("");
    const [loss, setLoss] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [language, setLanguage] = useState("파이썬");
    const [code, setCode] = useState("");
    const [dataSource, setDataSource] = useState("");
    const [desc, setDesc] = useState("");
    const [data_link, setDataLink] = useState("");
    const [model_json, setModelJson] = useState("");
    const [independent, setIndependent] = useState([]);
    const [dependent, setDependent] = useState([]);
    const [sampledata, setSampledata] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const currentTime = () => {
        let now = new Date();
        let year = String(now.getFullYear());
        let month = String(now.getMonth() + 1);
        if (month.length === 1) {
          month = "0"+month;
        }
        let date = String(now.getDate());
        return year+month+date;
    }

    const handleDataChange = () => {
        const newData = {
            id: id,
            name: name,
            type: type,
            loss_type: loss_type,
            loss: loss,
            accuracy: accuracy,
            language: language,
            date_create: currentTime(),
            date_modify: currentTime(),
            isDeleted: false,
            deleted_date: 0,
            code: code,
            dataSource: dataSource,
            desc: desc,
            data: data_link,
            model_json: model_json,
            independent: independent,
            dependent: dependent,
            sampledata: sampledata
        };
        setId(id+1);
        props.onCreateData(newData);
        handleClose();
    }

    return (
        <div>
            <Button className={classes.root} variant="contained" onClick={handleClickOpen}>추가</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}>데이터 추가</DialogTitle>
                <DialogContent>
                    <Paper>
                        <TextField className={classes.input} label="이름" variant="outlined" onChange={(event) => setName(event.target.value)}/>
                        <TextField
                            className={classes.input}
                            select
                            label="회귀/분류"
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            variant="outlined"
                            >
                            <MenuItem key="regression" value="회귀">회귀</MenuItem>
                            <MenuItem key="classification" value="분류">분류</MenuItem>
                        </TextField>
                        <TextField className={classes.input} label="loss 종류" variant="outlined" onChange={(event) => setLossType(event.target.value)}/>
                        <TextField className={classes.input} label="loss" variant="outlined" onChange={(event) => setLoss(isNaN(parseFloat(event.target.value))? 0 : event.target.value)}/>
                        <TextField className={classes.input} label="정확도" variant="outlined" onChange={(event) => setAccuracy(isNaN(parseFloat(event.target.value))? 0 : event.target.value)}/>
                        <TextField
                            className={classes.input}
                            select
                            label="언어 종류"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                            variant="outlined"
                            >
                            <MenuItem key="python" value="파이썬">파이썬</MenuItem>
                            <MenuItem key="javascript" value="자바스크립트">자바스크립트</MenuItem>
                        </TextField>
                        <TextField className={classes.input} label="코드 링크" variant="outlined" onChange={(event) => setCode(event.target.value)}/>
                        <TextField className={classes.input} label="데이터 출처" variant="outlined" onChange={(event) => setDataSource(event.target.value)}/>
                        <TextField className={classes.input} label="설명" variant="outlined" onChange={(event) => setDesc(event.target.value)}/>
                        <TextField className={classes.input} label="데이터 링크" variant="outlined" onChange={(event) => setDataLink(event.target.value)}/>
                        <TextField className={classes.input} label="모델 링크" variant="outlined" onChange={(event) => setModelJson(event.target.value)}/>
                        <TextField className={classes.input} label="독립 변수" variant="outlined" onChange={(event) => setIndependent(event.target.value.split(" "))}/>
                        <TextField className={classes.input} label="종속 변수" variant="outlined" onChange={(event) => setDependent(event.target.value.split(" "))}/>
                        <TextField className={classes.input} label="샘플 데이터 링크" variant="outlined" onChange={(event) => setSampledata(event.target.value)}/>
                    </Paper>
                    <Typography>독립 변수와 종속 변수는 빈칸을 통해 구분하십시오.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleDataChange}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateData;
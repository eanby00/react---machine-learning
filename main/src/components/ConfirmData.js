import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";

import * as tf from "@tensorflow/tfjs";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    child: {
        display: "inline-block"
    },
    independent: {
        textAlign: "left"
    },
    dependent: {
        textAlign: "right"
    },
    input: {
        margin: theme.spacing(1),
        width: '25ch',
    }
}))

const ConfirmData = (props) => {
    const classes = useStyles();
    const [data] = useState(props.data);
    const [open, setOpen] = useState(false);
    var tests = [];
    
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    } 

    const handleChange = (e, id) => {
        tests[id] = parseFloat(e.target.value);
        console.log(tests)
    }
    

    const openData = () => {

        if (data.language === "파이썬"){
            if(data.model_json !== "") {
                tf.loadLayersModel(data.model_json).then(function(model){
                    console.log(tests)
                    let predict =  model.predict(tf.tensor(tests, [1,data.independent.length]))

                    predict.print()
                    
                })
            }
        } else {

        }

    }
    // code
    // data
    // model_json
        // independent
        // dependent

    let deleted = null;
    if(data.isDeleted === true) {
        deleted = <Typography variant="subtitle1">삭제된 데이터입니다. 삭제 날짜: {data.deleted_date}</Typography>
    }

    var texts = []; 
    for (let i in data.independent){
        texts.push(<TextField key={i} className={classes.input} id={data.independent[i]} label={data.independent[i]} variant="outlined" onChange={(event) => handleChange(event, i)}/>)
    }
    

    return(
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>확인</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}>{data.name} by {data.language}</DialogTitle>
                <DialogContent>
                    {deleted}
                    <Typography variant="subtitle2">{data.type} 분석의 loss 형식은 {data.loss_type} 입니다.</Typography>
                    <Typography variant="subtitle2">loss: {data.loss} || accuracy: {data.accuracy}</Typography>
                    <Typography variant="subtitle2">생성 날짜: {data.date_create} || 수정 날짜: {data.date_modify}</Typography>
                    <hr/>
                        {texts}
                    <hr/>
                    <Typography variant="body2">데이터 출처: <a href={data.dataSource} target="_blank" rel="noreferrer">{data.dataSource}</a></Typography>
                    <Typography variant="body2">데이터 링크: <a href={data.data} target="_blank" rel="noreferrer">{data.data}</a></Typography>
                    <Typography variant="body2">코드 링크: <a href={data.code} target="_blank" rel="noreferrer">{data.code}</a></Typography>



                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={openData}>테스트</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmData;
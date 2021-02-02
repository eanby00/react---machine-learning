import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";

import PaPa from "papaparse";
import * as tf from "@tensorflow/tfjs";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
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
    },
    root: {
        width: '100%',
    },
    accoHeading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    detail: {
        display: "flex",
        alignItems : "flex-start",
        flexDirection : "column"
    },
    paper: {
        width: "100%",
        overflowX: "auto",
        
    },
}))

const ConfirmData = (props) => {
    const classes = useStyles();
    const [data] = useState(props.data);
    const [open, setOpen] = useState(false);
    var tests = Array.from({length: data.independent.length}, () => 0);
    const [rows, setRows] = useState([]);
    const [result, setResult] = useState([]);
    
    React.useEffect(() => {
        async function getData() {
            const response = await fetch(data.sampleData);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value);
            const results = PaPa.parse(csv, {header: false});
            const row = results.data;
            setRows(row)
        }
        if (data.sampleData !== ""){
            getData()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    } 

    const handleChange = (e, id) => {
        tests[id] = parseFloat(e.target.value);
    }

    const openData = () => {

        if(data.model_json !== "") {
            let temp = [];
            for (let i in tests){
                temp.push(<TableCell key={"result"+temp.length}>{tests[i]}</TableCell>)
            }
            tf.loadLayersModel(data.model_json).then(function(model){
                let predict =  model.predict(tf.tensor(tests, [1,data.independent.length]))

                temp.push(<TableCell key={"result"+temp.length}>{predict.arraySync()[0][0]}</TableCell>);
                setResult(result.concat(<TableRow key={"result"+result.length}>{temp}</TableRow>))
            })
        }
    }

    let deleted = null;
    if(data.isDeleted === true) {
        deleted = <Typography variant="subtitle1">삭제된 데이터입니다. 삭제 날짜: {data.deleted_date}</Typography>
    }

    var texts = []; 
    for (let i in data.independent){
        texts.push(<TextField key={i} className={classes.input} id={data.independent[i]} label={data.independent[i]} variant="outlined" onClick={(event) => {event.target.value = null}} onChange={(event) => handleChange(event, i)}/>)
    }
    
    let tableHead = [];
    for (let cell in data.independent){
        tableHead.push(<TableCell key={"head"+cell}>{data.independent[cell]}</TableCell>)
    }
    
    for (let cell in data.dependent){
        tableHead.push(<TableCell key={"head"+cell+data.independent.length} >{data.dependent[cell]}</TableCell>)
    }
    
    let tableBody = [];
    for (let row in rows){
        let tableCells = []
        for (let cell in rows[row]){
            tableCells.push(<TableCell key={"body"+cell} >{rows[row][cell]}</TableCell>)
        }
        tableBody.push(<TableRow key={row}>{tableCells}</TableRow>)
    }

    return(
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>확인</Button>
            <Dialog className={classes.root} open={open} onClose={handleClose} color="primary">
                <DialogTitle onClose={handleClose}>{data.name} by {data.language}</DialogTitle>
                <DialogContent>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.accoHeading}>모델 정보 확인</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.detail}>
                            {deleted}
                            <Typography variant="subtitle2">{data.type} 분석의 loss 형식은 {data.loss_type} 입니다.</Typography>
                            <Typography variant="subtitle2">loss: {data.loss} || accuracy: {data.accuracy}</Typography>
                            <Typography variant="subtitle2">생성 날짜: {data.date_create} || 수정 날짜: {data.date_modify}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.accoHeading}>샘플 데이터로 모델 확인</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.detail}>
                            <Paper className={classes.paper}>
                                {rows? <Table><TableHead><TableRow>{tableHead}</TableRow></TableHead><TableBody>{tableBody}</TableBody></Table> : ""}
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.accoHeading}>모델로 테스트하기</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.detail}>
                            <Typography variant="h6">데이터 입력</Typography>
                            <Paper className={classes.paper}>{texts}</Paper>
                            <Paper className={classes.paper}>
                                <Table><TableHead><TableRow>{tableHead}</TableRow></TableHead><TableBody>{result}</TableBody></Table>
                            </Paper>

                        </AccordionDetails>
                    </Accordion>
                
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.accoHeading}>출처</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.detail}>
                            <Typography variant="body2">데이터 출처: <a href={data.dataSource} target="_blank" rel="noreferrer">{data.dataSource}</a></Typography>
                            <Typography variant="body2">데이터 링크: <a href={data.data} target="_blank" rel="noreferrer">{data.data}</a></Typography>
                            <Typography variant="body2">코드 링크: <a href={data.code} target="_blank" rel="noreferrer">{data.code}</a></Typography>

                        </AccordionDetails>
                    </Accordion>
                    
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
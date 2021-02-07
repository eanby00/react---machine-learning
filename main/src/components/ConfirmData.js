import React, { useState } from "react";

// 기타 기능을 위한 import
import PaPa from "papaparse";
import * as tf from "@tensorflow/tfjs";

// material-ui/core에서 import
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from "@material-ui/core/Paper";

// material-ui/icons에서 import
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        width: '40%',
    },
    root: {
        width: '100%',
    },
    accordion: {
        marginBottom: theme.spacing(2),
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
    text: {
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
        padding: theme.spacing(0.5),
        textOverflow: "ellipsis"
    },
    blue: {
        background: "#3f51b5",
        color: "white"
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
            console.log(rows)
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
                for (let i in predict.arraySync()[0]){
                    temp.push(<TableCell key={"result"+temp.length}>{predict.arraySync()[0][i].toFixed(2)}</TableCell>);
                }
                setResult(result.concat(<TableRow key={"result"+result.length}>{temp}</TableRow>))
            })
        }
        
        for (let i in data.independent){
            document.getElementById(data.independent[i]).value = null;
        }

    }

    let deleted = null;
    if(data.isDeleted === true) {
        deleted = <Typography variant="body2">삭제된 데이터입니다. 삭제 날짜: {data.deleted_date}</Typography>
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
                <DialogTitle className={classes.blue} onClose={handleClose}>{data.name} by {data.language}</DialogTitle>
                <DialogContent>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.accoHeading}>모델 정보 확인</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.detail}>
                            <Paper className={classes.text}>
                                {deleted}
                                <Typography variant="body2">분석 타입: {data.type}</Typography>
                                <Typography variant="body2">loss 형식: {data.loss_type}</Typography>
                                <Typography variant="body2">loss: {data.loss}</Typography>
                                <Typography variant="body2">accuracy: {data.accuracy}</Typography>
                                <Typography variant="body2">생성 날짜: {data.date_create}</Typography>
                                <Typography variant="body2">수정 날짜: {data.date_modify}</Typography>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                    
                    <Accordion className={classes.accordion}>
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
                
                    <Accordion className={classes.accordion}>
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
                
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography className={classes.accoHeading}>출처</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.detail}>
                            <Paper className={classes.text}>
                                <Typography variant="body2">데이터 출처: <a href={data.dataSource} target="_blank" rel="noreferrer">{data.dataSource}</a></Typography>
                                <Typography variant="body2">데이터 링크: <a href={data.data} target="_blank" rel="noreferrer">{data.data}</a></Typography>
                                <Typography variant="body2">코드 링크: <a href={data.code} target="_blank" rel="noreferrer">{data.code}</a></Typography>
                            </Paper>

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
import React, { Component } from "react";
import './App.css';
import "./components/ModelDatas";
import ModelDatas from "./components/ModelDatas";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchKeyword: "",
      datas: [
        {
          id: 1,
          name: "샘플1",
          type: "회귀",
          loss_type: "mse",
          loss: 0.05,
          accuracy: 99.5,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN
        },
        {
          id: 2,
          name: "샘플2",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN
        },
        {
          id: 3,
          name: "샘플3",
          type: "회귀",
          loss_type: "mse",
          loss: 0.5,
          accuracy: 99,
          language: "파이썬",
          date_create: "20210119",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN
        },
        {
          id: 4,
          name: "샘플4",
          type: "회귀",
          loss_type: "mse",
          loss: 2,
          accuracy: 97,
          language: "파이썬",
          date_create: "20210120",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN
        }
      ]
    };

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  currentTime() {
    let now = new Date();
    let year = String(now.getFullYear());
    let month = String(now.getMonth() + 1);
    if (month.length === 1) {
      month = "0"+month;
    }
    let date = String(now.getDate());
    return year+month+date;
  }

  render(){
    const { classes } = this.props;

    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.isDeleted === false;
      })
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      })
      return data;
    }

    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              머신 러닝 데이터 분석 관리
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
        
        <ModelDatas
          datas={filteredComponents(this.state.datas)}
          searchKeyword={this.state.searchKeyword}
          onDeleteData={function(e){
            for (let i in this.state.datas){
              let newDatas = Array.from(this.state.datas);
              if (newDatas[i].id === e){
                newDatas[i].isDeleted = true;
                newDatas[i].deleted_date = this.currentTime();
                this.setState({
                  datas: newDatas
                });
              }
            }
          }.bind(this)}>
        </ModelDatas>
      </div>
    )
  }
}

export default withStyles(styles) (App);

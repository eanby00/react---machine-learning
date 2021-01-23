import React, { Component } from "react";
import './App.css';
import ModelDatas from "./components/ModelDatas";

// import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
          deleted_date: NaN,
          code: ""
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
          deleted_date: NaN,
          code: ""
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
          deleted_date: NaN,
          code: ""
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
          deleted_date: NaN,
          code: ""
        },
        {
          id: 5,
          name: "샘플5",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 6,
          name: "샘플6",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 7,
          name: "샘플7",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 8,
          name: "샘플8",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 9,
          name: "샘플9",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 10,
          name: "샘플10",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 11,
          name: "샘플11",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 12,
          name: "샘플12",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 13,
          name: "샘플13",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 14,
          name: "샘플14",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        },
        {
          id: 15,
          name: "샘플15",
          type: "회귀",
          loss_type: "mse",
          loss: 1,
          accuracy: 98,
          language: "파이썬",
          date_create: "20210121",
          date_modify: "20210121",
          isDeleted: false,
          deleted_date: NaN,
          code: ""
        }
      ],
      menu_type: "data",
      open: false
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen() {
    this.setState({open: true});
  }
  handleDrawerClose() {
    this.setState({open: false})
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
      if(this.state.menu_type === "data"){
        data = data.filter((c) => {
          return c.isDeleted === false;
        })
      } else if (this.state.menu_type === "removed"){
        data = data.filter((c) => {
          return c.isDeleted === true;
        })
      }
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      })
      return data;
    }
    var menu_type_list = ["all", "data", "removed"];
    return(
      <div className={classes.root}>
        <AppBar
          position="static"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
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
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {styles.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['전체보기', '데이터 확인', '휴지통'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} onClick={function(){
                  this.setState({menu_type:menu_type_list[index]})
                }.bind(this)}/>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
        })}>
          <div className={classes.drawerHeader} />
          <ModelDatas
            datas={filteredComponents(this.state.datas)}
            searchKeyword={this.state.searchKeyword}
            onChangeData={function(e){
              for (let i in this.state.datas){
                let newDatas = Array.from(this.state.datas);
                if (newDatas[i].id === e){
                  if (newDatas[i].isDeleted === false) {
                    newDatas[i].isDeleted = true;
                    newDatas[i].deleted_date = this.currentTime();
                  } else {
                    newDatas[i].isDeleted = false;
                    newDatas[i].deleted_date = NaN;
                  }
                  this.setState({
                    datas: newDatas
                  });
                }
              }
            }.bind(this)}>
          </ModelDatas>
        </main>
      </div>
    )
  }
}

export default withStyles(styles) (App);

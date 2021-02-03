import React, { useState } from "react";

// 기타 기능을 위한 import
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from "lodash";

// 컴포넌트와 데이터 import
import arrayDatas from "./mainData.json"
import ModelDatas from "./components/ModelDatas";
import DetailSearch from "./components/DetailSearch";

// material-ui/core에서 import
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Box from "@material-ui/core/Box";
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

// material-ui/icons에서 import
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const drawerWidth = 240;

const theme_preventerror = unstable_createMuiStrictModeTheme();

const useStyles = makeStyles((theme) => ({
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
    
      drawerMenu: {
        marginLeft: 20
      },
    
      drawerSubMenu: {
        marginLeft: 50
      },

      marginleft: {
        marginLeft: 10
      },
      upBotton: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.upBotton}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const App = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    
    const [searchKeyword, setSearchKeyword] = useState({
      name: "",
      type: "",
      loss_type: "",
      language: "",
      date_create: "",
      date_modify: ""
    });
    const [datas, setDatas] = useState(arrayDatas);

    const [menu_type, setMenuType] = useState("data");
    const [open, setOpen] = useState(false);
    const [searchType, setSearchType] = useState("name");

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }
    
    const handleSearchKeywordNameChange = (e) => {
        setSearchKeyword({name: e.target.value, type: "", loss_type: "", language: "", date_create: "", date_modify: ""});
        setSearchType("name");
    }

    const onChangeSearchKeyword = (e) => {
      setSearchKeyword(e);
      setSearchType("all");
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

    const onChangeData = (e) => {
        let newDatas = Array.from(datas);
        for (let i in datas){
            if (newDatas[i].id === e){
                if (newDatas[i].isDeleted === false) {
                newDatas[i].isDeleted = true;
                newDatas[i].deleted_date = currentTime();
                } else {
                newDatas[i].isDeleted = false;
                newDatas[i].deleted_date = NaN;
                }
                setDatas(newDatas);
            }
        }
    }

    const filteredComponents = (data) => {
        if( menu_type === "data"){
            data = data.filter((c) => {
            return c.isDeleted === false;
            })
        } else if (menu_type === "removed"){
            data = data.filter((c) => {
            return c.isDeleted === true;
            })
        }
        if (searchType === "name") {
          data = data.filter((c) => {
            return c.name.indexOf(searchKeyword.name) > -1;
          })
        }
        else {
          data = data.filter((c) => {
            return c.name.indexOf(searchKeyword.name) > -1;
          })
          data = data.filter((c) => {
              return c.type.indexOf(searchKeyword.type) > -1;
          })
          data = data.filter((c) => {
              return c.loss_type.indexOf(searchKeyword.loss_type) > -1;
          })
          data = data.filter((c) => {
              return c.language.indexOf(searchKeyword.language) > -1;
          })  
          data = data.filter((c) => {
              return c.date_create.indexOf(searchKeyword.date_create) > -1;
          })
          data = data.filter((c) => {
              return c.date_modify.indexOf(searchKeyword.date_modify) > -1;
          })
        }
        
        return data;
    }

    const onChangeType = (e, index) => {
        let menu_type_list = ["all", "data", "removed"];
        setMenuType(menu_type_list[index]);
    }

    const onChangeSort = (dataType, sortType) => {
      let newDatas = Array.from(datas);
      if (sortType){
        newDatas = _.orderBy(newDatas, [dataType], ["asc"])
      } else {
        newDatas = _.orderBy(newDatas, [dataType], ["desc"])
      }
      setDatas(newDatas);
    }

    const handleSaveFile = () => {
      let newDatas = Array.from(datas);
      newDatas = _.orderBy(newDatas, ["id"], ["asc"]);
      let fileData = JSON.stringify(newDatas);
      fileData = fileData.replace(/},/gi, "},\n");
      const blob = new Blob([fileData], {type: "text/plain"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'mainData.json';
      link.href = url;
      link.click();

    }

    return(
        <div className={classes.root}>
          <Box component="div"className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}>
            <AppBar
            position="static"
            
            >
                <Toolbar id="back-to-top-anchor">

                  <Box component="div" className={clsx(classes.menuButton, open && classes.hide)}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                  </Box>

                  <Box component="div" className={classes.title} >
                    <Typography variant="h6" noWrap>
                        머신 러닝 데이터 분석 관리
                    </Typography>
                  </Box>

                  <Box component="div" className={classes.search}>
                    <div>
                      <div className={classes.searchIcon}>
                        <SearchIcon/>
                      </div>
                      <InputBase
                          placeholder="검색하기"
                          classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                          }}
                          name="searchKeyword"
                          value={searchKeyword.name}
                          onChange={handleSearchKeywordNameChange}
                          inputProps={{ 'aria-label': 'search' }}
                      />
                    </div>
                  </Box>

                  <Box component="div">
                    <ThemeProvider theme={theme_preventerror}>
                      <DetailSearch onChangeSearchKeyword={onChangeSearchKeyword}></DetailSearch>
                    </ThemeProvider>
                  </Box>

                  <Box component="div" className={classes.marginleft}>
                    <Button variant="contained" onClick={handleSaveFile}>저장</Button>
                  </Box>
                </Toolbar>
            </AppBar>
          </Box>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                    <List>
                        <ListItemText primary="보기" className={classes.drawerMenu}/>
                        <List>
                            {['전체보기', '데이터 확인', '휴지통'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemText primary={text} className={classes.drawerSubMenu} onClick={(event) => onChangeType(event, index)}/>
                            </ListItem>
                            ))}
                        </List>
                    </List>
                <Divider />
            </Drawer>

            <Box
              conponent="div"
                className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.drawerHeader} />
                <ModelDatas
                    datas={filteredComponents(datas)}
                    searchKeyword={searchKeyword}
                    onChangeData={onChangeData}
                    onChangeSortType={onChangeSort}>
                </ModelDatas>
            </Box >

            <ScrollTop {...props}>
              <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
        </div>
    );
}

export default App;

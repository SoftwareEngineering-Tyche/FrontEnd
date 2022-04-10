import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StarIcon from '@mui/icons-material/Star';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '50ch' },
  },
}));

function Header() {

  const [state, setState] = React.useState({top: false, left: false, bottom: false, right: false,});
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
      return;
    setState({ ...state, [anchor]: open });
  };
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} keepMounted open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <div style={{minWidth:'100px'}}>
        <div style={{display:'flex', justifyContent:'center'}}>ساخت</div>
        <div style={{display:'flex', justifyContent:'center'}}>دسته‌بندی‌ها</div>
        <div style={{display:'flex', justifyContent:'center'}}>درباره ما</div>
      </div>
    </Menu>
  );
  const list = (anchor) => (
    <Box sx={{ width: 250, direction:'ltr !important' }} onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <Link href='/profile' underline='none' color="inherit">
          <ListItem button>
              <ListItemIcon sx={{minWidth:'unset', marginRight:'8px'}}><AccountCircle/></ListItemIcon>
              <span>پروفایل</span>
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon sx={{minWidth:'unset', marginRight:'8px'}}><AccountBalanceWalletIcon/></ListItemIcon>
          <span>کیف پول</span>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{minWidth:'unset', marginRight:'8px'}}><StarIcon/></ListItemIcon>
          <span>علاقه‌مندی‌ها</span>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{minWidth:'unset', marginRight:'8px'}}><ShoppingBasketIcon/></ListItemIcon>
          <span>دارایی‌های من</span>
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{minWidth:'unset', marginRight:'8px'}}><SettingsIcon/></ListItemIcon>
          <span>تنظیمات</span>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <SwipeableDrawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)} sx={{direction:'rtl'}}>
          {list('left')}
        </SwipeableDrawer>
        <Toolbar sx={{backgroundColor:'#2F3A8F'}}>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon onClick={toggleDrawer('left', true)}/>
          </IconButton>
          <span style={{marginLeft: '12px'}}>تایکی</span>
          <div style={{display:'flex', justifyContent:'center', width:'100%'}}>
            <Search>
              <SearchIconWrapper><SearchIcon sx={{padding:'0px'}}/></SearchIconWrapper>
              <StyledInputBase placeholder="جستجو... " inputProps={{ 'aria-label': 'search' }}/>
            </Search>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <span style={{marginLeft:'10px', cursor:'pointer'}}>ساخت</span>
            <span style={{marginLeft:'10px', cursor:'pointer'}}>دسته‌بندی‌ها</span>
            <span style={{marginLeft:'10px', width:'58px', cursor:'pointer'}}>درباره ما</span>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
export default Header;
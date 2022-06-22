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
import NotificationIcon from "@mui/icons-material/Notifications";

import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate, useHistory } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { callAPI } from "../components/api-call";
import { hostUrl } from "../host-url";

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

var createNotifElements = () => {
  const elements = [];
  for (var i=0; i < 5; i++) {
    elements.push(<Link key={i} href='/profile' underline='none' color="inherit">
   
      <ListItem button>
        <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><AccountCircle /></ListItemIcon>
        <span>اعلان</span>
      </ListItem>
    </Link>
  
)
  } 
  return elements;
}

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

  const [state, setState] = React.useState({ top: false, left: false, bottom: false, right: false, });
  const [stateNotif, setStateNotif] = React.useState({ top: false, left: false, bottom: false, right: false, });

  const [searchText, setSearchText] = React.useState(null);
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
      return;
    setState({ ...state, [anchor]: open });
  };
  const toggleNotif = (notif_anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
      return;
      setStateNotif({ ...stateNotif, [notif_anchor]: open });
  };
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let navigate = useNavigate();
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleSearchText = () => {
    navigate(`/search/${searchText}`);
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} keepMounted open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <div style={{ minWidth: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>ساخت</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>دسته‌بندی‌ها</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>درباره ما</div>
      </div>
    </Menu>
  );
  const list = (anchor) => (
    <Box sx={{ width: 250, direction: 'ltr !important' }} onClick={toggleDrawer(anchor, false)} onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <Link href='/profile' underline='none' color="inherit">
          <ListItem button>
            <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><AccountCircle /></ListItemIcon>
            <span>پروفایل</span>
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><AccountBalanceWalletIcon /></ListItemIcon>
          <span>کیف پول</span>
        </ListItem>
        <Link href='/profile/favorites' underline='none' color="inherit">
          <ListItem button>
            <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><StarIcon /></ListItemIcon>
            <span>علاقه‌مندی‌ها</span>
          </ListItem>
        </Link>
        <Link href='/profile/collections' underline='none' color="inherit">
          <ListItem button>
            <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><ShoppingBasketIcon /></ListItemIcon>
            <span>دارایی‌های من</span>
          </ListItem>
        </Link>
        <Link href='/profile/creations' underline='none' color="inherit">
          <ListItem button>
            <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><DashboardIcon /></ListItemIcon>
            <span>ساخته شده‌ها</span>
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><SettingsIcon /></ListItemIcon>
          <span>تنظیمات</span>
        </ListItem>
      </List>
    </Box>
  );
  const an = 5
  const notifList = (anchor) => (
    <Box sx={{ width: 250, direction: 'ltr !important' }} onClick={toggleNotif(anchor, false)} onKeyDown={toggleNotif(anchor, false)}>
      <List>

        {createNotifElements()}
      
        {/* <ListItem button>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><AccountBalanceWalletIcon /></ListItemIcon>
          <span>کیف پول</span>
        </ListItem>
        <Link href='/profile/favorites' underline='none' color="inherit">
          <ListItem button>
            <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><StarIcon /></ListItemIcon>
            <span>علاقه‌مندی‌ها</span>
          </ListItem>
        </Link>
        <Link href='/profile/collections' underline='none' color="inherit">
          <ListItem button>
            <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><ShoppingBasketIcon /></ListItemIcon>
            <span>دارایی‌های من</span>
          </ListItem>
        </Link>
        <Link href='/profile/creations' underline='none' color="inherit">
          <ListItem button>
            <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><DashboardIcon /></ListItemIcon>
            <span>ساخته شده‌ها</span>
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}><SettingsIcon /></ListItemIcon>
          <span>تنظیمات</span>
        </ListItem> */}
      </List>
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <SwipeableDrawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)} sx={{ direction: 'rtl' }}>
          {list('left')}
        </SwipeableDrawer>
        <SwipeableDrawer anchor={'left'} open={stateNotif['left']} onClose={toggleNotif('left', false)} onOpen={toggleNotif('left', true)} sx={{ direction: 'rtl' }}>
          {notifList('left')}
        </SwipeableDrawer>
        <Toolbar sx={{ backgroundColor: '#2F3A8F' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon onClick={toggleDrawer('left', true)} />
          </IconButton>
          <IconButton size="large" edge="start" color="inherit" aria-label="open box">
            <NotificationIcon onClick={toggleNotif('left', true)} />
          </IconButton>
          <RouterLink to="/" style={{ marginLeft: '12px', color: '#fff', textDecoration: 'none' }}>تایکی</RouterLink>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Search>
              <SearchIconWrapper><SearchIcon sx={{ padding: '0px' }} /></SearchIconWrapper>
              <StyledInputBase
                placeholder="جستجو... "
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    handleSearchText()
                  }
                }}
              />
            </Search>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <span style={{ marginLeft: '10px', cursor: 'pointer' }}>ساخت</span>
            <span style={{ marginLeft: '10px', cursor: 'pointer' }}>دسته‌بندی‌ها</span>
            <span style={{ marginLeft: '10px', width: '58px', cursor: 'pointer' }}>درباره ما</span>
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
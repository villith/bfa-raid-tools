import {
  AppBar,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import * as React from 'react';

class NavBar extends React.Component {
  public state = {
    anchorElement: undefined,
    loggedIn: false,
  };

  public handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({ loggedIn: checked });
  };

  public handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorElement: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ anchorElement: undefined });
  };

  public render() {
    const { anchorElement, loggedIn } = this.state;
    const open = Boolean(anchorElement);

    return (
      <div className='root'>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={loggedIn} onChange={this.handleChange} aria-label='LoginSwitch' />
            }
            label={loggedIn ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position='static'>
          <Toolbar>
            <IconButton color='inherit' aria-label='Menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit'>
              BFA Raid Tools
            </Typography>
            {loggedIn && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup='true'
                  onClick={this.handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorElement}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                  }}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',                    
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                </Menu>
              </div>
            )}
            <Button color='inherit'>Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export { NavBar };

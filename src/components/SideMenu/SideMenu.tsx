import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Drafts as DraftsIcon, Inbox as InboxIcon } from '@material-ui/icons';
import * as React from 'react';

export interface ISideMenuProps {
  closeMenu: (() => void);
  open: boolean;
}

export interface ISideMenuState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  list: {
    width: 250,
  },
});

class SideMenu extends React.Component<WithStyles<any> & ISideMenuProps, ISideMenuState> {
  public render() {
    const { classes, closeMenu, open } = this.props;

    return (
      <div>
        <Drawer open={open} onClose={closeMenu}>
          <div
            tabIndex={0}
            role='button'
            onClick={closeMenu}
            onKeyDown={closeMenu}
          >
            <div className={classes.list}>
              <List>
                <ListItem button={true}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary='Inbox' />
                </ListItem>
                <ListItem button={true}>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Drafts' />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button={true}>
                  <ListItemText primary='Trash' />
                </ListItem>
                <ListItem button={true}>
                  <ListItemText primary='Spam' />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(SideMenu)
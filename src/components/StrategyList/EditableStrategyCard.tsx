import {
  Button,
  CardActions,
  CardContent,
  FormControl,
  StyleRulesCallback,
  TextField,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { IStrategyDescriptors } from 'src/classes/Strategy';

import { Aux } from '../winAux';

export interface IEditableStrategyCardProps {
  id: string;
  description: string;
  handleDisableEditable: () => void;
  handleEditStrategyDescriptors: (a: IStrategyDescriptors) => void;
  title: string;
}

export interface IEditableStrategyCardState {
  description: string;
  title: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  actions: {
    float: 'right'
  },
  favorite: {
    marginLeft: 'auto'
  },
  cardHeader: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  spacer: {
    flex: '1 1 100%',
  },
  cardTitle: {
    flex: '0 0 auto',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  link: {
    textDecoration: 'none',
    textOverflow: 'ellipsis'
  }
});

class EditableStrategyCard extends React.Component<WithStyles<any> & IEditableStrategyCardProps, IEditableStrategyCardState> {
  public state = {
    title: '',
    description: ''
  }

  public componentDidMount() {
    const { description, title } = this.props;
    this.setState({ description, title });
  }
  public handleTitleChange = (event: any) => {
    this.setState({ title: event.target.value });
  }

  public handleDescriptionChange = (event: any) => {
    this.setState({ description: event.target.value });
  }

  public submitStrategyDescriptorsChange = () => {
    const { description, title } = this.state;
    const { handleEditStrategyDescriptors, handleDisableEditable, id } = this.props;

    const descriptors: IStrategyDescriptors = { id, description, title };
    handleEditStrategyDescriptors(descriptors);
    handleDisableEditable();
  }

  public render() {
    const { description, title } = this.state;
    const { classes, handleDisableEditable } = this.props;
    return (
      <Aux>
        <CardContent>
          <div className={classes.cardHeader}>
            <FormControl className={classes.formControl}>
              <TextField
                id='strategy-title'
                value={title}
                onChange={this.handleTitleChange}
                required={true}
                inputProps={{
                  maxLength: 30
                }}
              />
            </FormControl>
          </div>
          <FormControl className={classes.formControl}>
            <TextField
              id='strategy-description'
              value={description}
              onChange={this.handleDescriptionChange}
              required={false}
              inputProps={{
                maxLength: 150
              }}
              multiline={true}
              rows={4}
              rowsMax={4}
            />
          </FormControl>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button size='small' color='primary' onClick={handleDisableEditable}>
            Cancel
          </Button>
          <Button size='small' color='secondary' onClick={this.submitStrategyDescriptorsChange}>
            Save
          </Button>
        </CardActions>
      </Aux>
    );
  }
}

export default withStyles(styles)(EditableStrategyCard)
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Input,
  InputLabel,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import axios from 'axios';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import * as React from 'react';

import { auth } from '../../firebase/firebase';
import { Aux } from '../winAux';

// tslint:disable-next-line:no-var-requires
const reactFirebaseui = require('react-firebaseui');


interface IDialogText {
  submitText: string;
  toggleText: string;
  linkText: string;
}
export interface IAuthenticationProps {
  open: boolean;
  closeDialog: (() => void);
  handleSignIn: ((email: string, password: string) => void);
  handleSignUp: ((email: string, password: string) => void);
  user: firebase.User | null;
}

export interface IAuthenticationState {
  email: string;
  password: string;
  loading: boolean;
  active: 'signIn' | 'signUp' | 'resetPassword';
  signUp: IDialogText;
  signIn: IDialogText;
  resetPassword: IDialogText;
}

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      authMethod: 'https://accounts.google.com',
      clientId: '836078052823-7ua37cl65bblfe79ahqsaciacvqit5ng.apps.googleusercontent.com',          
    }
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  extraActions: {
    display: 'flex',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing.unit,
  },
  formControl: {
    marginBottom: theme.spacing.unit * 2
  },
  forgotPassword: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  hidden: {
    display: 'none'
  },
  signUp: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  separator: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

class Authentication extends React.Component<WithStyles<any> & IAuthenticationProps, IAuthenticationState> {
  public state: IAuthenticationState = {
    email: '',
    password: '',
    loading: false,
    active: 'signIn',
    signIn: {
      submitText: 'Log In',
      toggleText: 'Don\'t have an account?',
      linkText: 'Register',
    },
    signUp: {
      submitText: 'Register',
      toggleText: 'Already have an account?',
      linkText: 'Log In',
    },
    resetPassword: {
      submitText: 'Send Reset Link',
      toggleText: 'Remember your password?',
      linkText: 'Log In',
    }
  }

  public handleEmailChange = (event: any) => {
    this.setState({ email: event.target.value });
  }

  public handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  }

  public submitForm = () => {
    const { active } = this.state;
    if (active === 'signIn') { this.props.handleSignIn(this.state.email, this.state.password) }
    if (active === 'signUp') { this.props.handleSignUp(this.state.email, this.state.password) }
    if (active === 'resetPassword') { this.sendPasswordReset() }
  }

  public sendPasswordReset = () => {
    const payload = {
      requestType: 'PASSWORD_RESET',
      email: this.state.email,
    };
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyAEriQFaLDbLuyhz0chlMeLQREMM0mLaJk', payload)
      .then(resp => {
        this.handleSendPasswordResetSuccess(resp.data);
      })
      .catch(err => {
        this.handleSendPasswordResetError(err);
      });
  }

  public handleSendPasswordResetSuccess = (data: any) => {
    console.log(`Password reset sent to ${data.email}`);
  }
  public handleSendPasswordResetError = (error: any) => {
    console.log(error);
  }

  public showPasswordReset = () => {
    this.setState({ active: 'resetPassword' });
  }

  public toggleSignUp = () => {
    this.state.active === 'signIn'
    ? this.setState({ active: 'signUp' })
    : this.setState({ active: 'signIn' });
  }

  public render() {
    const { active, email, password } = this.state;
    const { classes, open, closeDialog } = this.props;
    const activeText = this.state[active];
    return (
      <Dialog
        open={open}
        onClose={closeDialog}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogContent>
          <form className={classes.authForm} id='auth-form'>
            <FormControl fullWidth={true} className={classes.formControl}>
              <InputLabel htmlFor='inputEmail'>Email Address</InputLabel>
              <Input 
                id='inputEmail'
                value={email}
                required={true}
                autoFocus={true}
                type={'email'}
                autoComplete={'email'}
                onChange={this.handleEmailChange}
              />
            </FormControl>
            {this.state.active !== 'resetPassword' &&
              <FormControl fullWidth={true} className={classes.formControl}>
                <InputLabel htmlFor='inputPassword'>Password</InputLabel>
                <Input 
                  id='inputPassword'
                  value={password}
                  required={true}
                  type={'password'}
                  autoComplete={'current-password'}
                  onChange={this.handlePasswordChange}
                />
              </FormControl>
            }
          </form>
          {this.state.active === 'signIn' &&
            <div className={classes.hidden}>
              <reactFirebaseui.StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' fullWidth={true} onClick={this.submitForm}>
            {activeText.submitText}
          </Button>
        </DialogActions>
          <div className={classes.extraActions}>
            {this.state.active !== 'resetPassword' &&
              <Aux>
                <div role='button' className={classes.forgotPassword} onClick={this.showPasswordReset}>
                  <Typography color='primary' variant={'caption'}>Forgot Password?</Typography>
                </div>
                <Typography className={classes.separator} variant={'caption'}>&#8226;</Typography>
              </Aux>
            }
            <Typography variant={'caption'}>{activeText.toggleText}</Typography>
            <div role='button' className={classes.signUp} onClick={this.toggleSignUp}>
              <Typography color='primary' variant={'caption'}>&nbsp;{activeText.linkText}</Typography>
            </div>
          </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Authentication)
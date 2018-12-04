import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';

import { Aux } from '../winAux';

interface IDialogState {
  submitText: string;
  toggleText: string;
  linkText: string;
  errorText: string;
  state: SignInState | ResetPasswordState | null;
}

enum SignInState {
  SIGNED_IN,
  SIGNED_OUT,
  SIGNING_IN
}

enum ResetPasswordState {
  NO_REQUEST,
  SENDING_REQUEST,
  RESQUEST_SENT
}

export type AuthDialogState = 'signIn' | 'signUp' | 'resetPassword';

export interface IAuthenticationProps {
  authCredential: firebase.auth.AuthCredential | null;
  authDialogState: AuthDialogState;
  open: boolean;
  closeDialog: () => void;
  handleChangeAuthDialogState: (newState: AuthDialogState) => void;
  handleSignIn: (email: string, password: string) => void;
  handleSignUp: (email: string, password: string, credential?: firebase.auth.AuthCredential) => void;
  user: firebase.User | null;
}

export interface IAuthenticationState {
  email: string;
  password: string;
  loading: boolean;
  states: { [key in AuthDialogState]: IDialogState };
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
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
    states: {
      signIn: {
        submitText: 'Log In',
        toggleText: 'Don\'t have an account?',
        linkText: 'Register',
        errorText: '',
        state: SignInState.SIGNED_OUT
      },
      signUp: {
        submitText: 'Register',
        toggleText: 'Already have an account?',
        linkText: 'Log In',
        errorText: '',
        state: null
      },
      resetPassword: {
        submitText: 'Send Reset Link',
        toggleText: 'Remember your password?',
        linkText: 'Log In',
        errorText: '',
        state: ResetPasswordState.NO_REQUEST
      }
    }
  }

  public handleEmailChange = (event: any) => {
    this.setState({ email: event.target.value });
  }

  public handlePasswordChange = (event: any) => {
    this.setState({ password: event.target.value });
  }

  public submitForm = () => {
    const { authDialogState } = this.props;
    if (authDialogState === 'signIn') { this.props.handleSignIn(this.state.email, this.state.password) }
    if (authDialogState === 'signUp') {
      if (this.props.authCredential) {
        this.props.handleSignUp(this.state.email, this.state.password, this.props.authCredential)
      }
      else {
        this.props.handleSignUp(this.state.email, this.state.password);
      }
    }
    if (authDialogState === 'resetPassword') { this.sendPasswordReset() }
  }

  public sendPasswordReset = () => {
    const payload = {
      requestType: 'PASSWORD_RESET',
      email: this.state.email,
    };
    axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=${process.env.REACT_APP_FB_RESET_PW_KEY}`, payload)
      .then(resp => {
        this.handleSendPasswordResetSuccess(resp.data);
      })
      .catch(err => {
        this.handleSendPasswordResetError(err);
      });
  }

  public handleSendPasswordResetSuccess = (data: any) => {
    // console.log(`Password reset sent to ${data.email}`);
  }
  
  public handleSendPasswordResetError = (error: any) => {
    // console.log(error);
  }

  public showPasswordReset = () => {
    const { handleChangeAuthDialogState } = this.props;
    handleChangeAuthDialogState('resetPassword');
  }

  public toggleSignUp = () => {
    const { authDialogState, handleChangeAuthDialogState } = this.props;
    authDialogState === 'signIn'
    ? handleChangeAuthDialogState('signUp')
    : handleChangeAuthDialogState('signIn')
  }

  public render() {
    const { email, password, states } = this.state;
    const { authDialogState, classes, open, closeDialog } = this.props;
    const activeText = states[authDialogState];
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
                error={activeText.errorText.length > 0}
              />
              <FormHelperText id='inputEmailError'>{activeText.errorText}</FormHelperText>
            </FormControl>
            {authDialogState !== 'resetPassword' &&
              <FormControl fullWidth={true} className={classes.formControl}>
                <InputLabel htmlFor='inputPassword'>Password</InputLabel>
                <Input 
                  id='inputPassword'
                  value={password}
                  required={true}
                  type={'password'}
                  autoComplete={'current-password'}
                  onChange={this.handlePasswordChange}
                  error={activeText.errorText.length > 0}
                />
                <FormHelperText id='inputPasswordError'>{activeText.errorText}</FormHelperText>
              </FormControl>
            }
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' fullWidth={true} onClick={this.submitForm}>
            {activeText.submitText}
          </Button>
        </DialogActions>
          <div className={classes.extraActions}>
            {authDialogState !== 'resetPassword' &&
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
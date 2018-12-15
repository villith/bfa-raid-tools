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

import {
  FirebaseCreateUserWithEmailAndPasswordErrorCodes,
  FirebaseLinkWithCredentialErrorCodes,
  FirebaseSignInWithEmailAndPasswordErrorCodes,
} from '../../firebase/db';
import { Aux } from '../winAux';

interface IDialogState {
  toggleText: string;
  linkText: string;
  errorText: string;
  state: SignInState | SignUpState | ResetPasswordState | null;
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

enum SignUpState {
  SIGNED_UP,
  SIGNING_UP,
  SIGNED_OUT
}

export type AuthDialogState = 'signIn' | 'signUp' | 'resetPassword';

const signInText: { [key in SignInState]: string } = {
  [SignInState.SIGNED_IN]: 'Logged In',
  [SignInState.SIGNED_OUT]: 'Log In',
  [SignInState.SIGNING_IN]: 'Logging In',
};

const signUpText: { [key in SignUpState]: string } = {
  [SignUpState.SIGNED_UP]: 'Registered',
  [SignUpState.SIGNING_UP]: 'Registering',
  [SignUpState.SIGNED_OUT]: 'Register'
};

const resetPasswordText: { [key in ResetPasswordState]: string } = {
  [ResetPasswordState.NO_REQUEST]: 'Reset Password',
  [ResetPasswordState.SENDING_REQUEST]: 'Sending',
  [ResetPasswordState.RESQUEST_SENT]: 'Password Reset Sent'
};

const signInErrorCodes: { [key in FirebaseSignInWithEmailAndPasswordErrorCodes]: string } = {
  'auth/invalid-email': 'Invalid Email',
  'auth/user-disabled': 'User is disabled',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password'
};

const signUpErrorCodes: { [key in FirebaseCreateUserWithEmailAndPasswordErrorCodes]: string } = {
  'auth/email-already-in-use': 'Email is already in use',
  'auth/invalid-email': 'Invalid Email',
  'auth/operation-not-allowed': 'Operation not allowed',
  'auth/weak-password': 'Password is too weak'
};

const linkErrorCodes: { [key in FirebaseLinkWithCredentialErrorCodes]: string } = {
  'auth/provider-already-linked': 'Provider is already linked',
  'auth/invalid-credential': 'Invalid credential',
  'auth/credential-already-in-use': 'Credential is already in use',
  'auth/email-already-in-use': 'Email is already in use',
  'auth/operation-not-allowed': 'Operation not allowed',
  'auth/invalid-email': 'Invalid Email',
  'auth/wrong-password': 'Wrong Password',
  'auth/invalid-verification-code': 'Invalid verification code',
  'auth/invalid-verification-id': 'Invalid verification ID'
};

export interface IAuthenticationProps {
  authCredential: firebase.auth.AuthCredential | null;
  authDialogState: AuthDialogState;
  open: boolean;
  closeDialog: () => void;
  handleChangeAuthDialogState: (newState: AuthDialogState) => void;
  handleSignIn: (email: string, password: string) => Promise<any>;
  handleSignUp: (email: string, password: string, user?: firebase.User) => Promise<any>;
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
        toggleText: 'Don\'t have an account?',
        linkText: 'Register',
        errorText: '',
        state: SignInState.SIGNED_OUT
      },
      signUp: {
        toggleText: 'Already have an account?',
        linkText: 'Log In',
        errorText: '',
        state: SignUpState.SIGNED_OUT
      },
      resetPassword: {
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
    const { email, password, states } = this.state;
    const { signIn, signUp } = states;
    const { authDialogState, closeDialog } = this.props;
    if (authDialogState === 'signIn') {
      signIn.state = SignInState.SIGNING_IN;
      this.setState({ states }, () => {
        this.props.handleSignIn(email, password)
          .then(result => {
            signIn.state = SignInState.SIGNED_IN;
            this.setState({ states }, () => closeDialog());
            console.log(result);
          })
          .catch(reason => {
            const { code } = reason;
            signIn.state = SignInState.SIGNED_OUT;
            signIn.errorText = signInErrorCodes[code];
            this.setState({ states });
          });
      });
    }
    if (authDialogState === 'signUp') {
      signUp.state = SignUpState.SIGNING_UP;
      this.setState({ states }, () => {
        const existingUser = this.props.user;
        if (existingUser) {
          this.props.handleSignUp(email, password)
            .then(result => {
              console.log(result);
            })
            .catch(reason => {
              const { code } = reason;
              signUp.state = SignUpState.SIGNED_OUT;
              signUp.errorText = signUpErrorCodes[code] || linkErrorCodes[code];
              this.setState({ states });
            });
        }
      });
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

  public getActiveText = (s: (SignInState | SignUpState | ResetPasswordState | null), a: AuthDialogState) => {
    let activeText = '';
    console.log(s, a);
    if (s !== null) {
      switch (a) {
        case 'signIn':
          activeText = signInText[s];
          break;
        case 'signUp':
          activeText = signUpText[s];
          break;
        case 'resetPassword':
          activeText = resetPasswordText[s];
          break;
        default:
          break;
      }
    }
    else {
      console.log('aaaa');
    }
    return activeText;
  }

  public render() {
    const { email, password, states } = this.state;
    const { authDialogState, classes, open, closeDialog } = this.props;
    const activeState = states[authDialogState].state;
    const errorText = states[authDialogState].errorText;
    const toggleText = states[authDialogState].toggleText;
    const linkText = states[authDialogState].linkText;
    const activeText = this.getActiveText(activeState, authDialogState);
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
                error={errorText.length > 0}
              />
              <FormHelperText id='inputEmailError'>{errorText}</FormHelperText>
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
                  error={errorText.length > 0}
                />
                <FormHelperText id='inputPasswordError'>{errorText}</FormHelperText>
              </FormControl>
            }
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='secondary' fullWidth={true} onClick={this.submitForm}>
            {activeText}
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
            <Typography variant={'caption'}>{toggleText}</Typography>
            <div role='button' className={classes.signUp} onClick={this.toggleSignUp}>
              <Typography color='primary' variant={'caption'}>&nbsp;{linkText}</Typography>
            </div>
          </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Authentication)
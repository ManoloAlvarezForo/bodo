import React from 'react';
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../../Utils/Constans/Communication';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from './AuthenticationMutations';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FiLock } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi';

//Styles
import './Authentication.css';
import { Typography } from '@material-ui/core';

class Authentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true, // switch between Login and SignUp
            email: '',
            password: '',
            repeatPassword: '',
            name: ''
        }
    }

    render() {

        const {
            login,
            email,
            password,
            name
        } = this.state;

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                height: '100%',
                justifyContent: 'center'
            }}>
                <div className="title-logo" style={{ width: '50%' }}>
                    <Typography
                        style={{
                            fontFamily: 'Pacifico',
                            fontSize: '7rem',
                            fontWeight: 'normal'
                        }}
                        component="h4"
                        variant="h4"
                        gutterBottom>
                        Bodo
                    </Typography>
                    <Typography
                        style={{
                            fontFamily: 'Pacifico',
                            fontSize: '7rem',
                            fontWeight: 'normal',
                            color: '#e91e63'
                        }}
                        component="h4"
                        variant="h4"
                        gutterBottom>+
                    </Typography>
                </div>
                <div className="auth-container" style={{ height: '100%', width: '50%' }}>
                    <div className="auth-form-container">
                        <div>
                            <div style={{ textAlign: 'center', fontSize: '2rem', margin: '60px 0' }} className="mv3">
                                <Typography component="h4" style={{ fontWeight: 'bold' }} variant="h4" gutterBottom>Welcome</Typography>
                            </div>
                            <div className="space custom-input" style={{ display: 'flex', flexDirection: 'column', margin: '20px 0' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ margin: '0 12px', display: 'flex', alignItems: 'center' }}>
                                        <FiMail style={{ fontSize: '24px', color: 'gray' }} />
                                    </div>
                                    <TextField style={{ margin: '10px 0', width: '100%' }}
                                        value={email}
                                        onChange={e => this.setState({ email: e.target.value })}
                                        label="Email"
                                        variant="outlined"
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ margin: '0 12px', display: 'flex', alignItems: 'center' }}>
                                        <FiLock style={{ fontSize: '24px', color: 'gray' }} />
                                    </div>
                                    <TextField style={{ margin: '10px 0', width: '100%', borderRadius: '5px' }}
                                        value={password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Mutation
                                    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                                    variables={{ email, password, name }}
                                    onCompleted={data => this._confirm(data)}>
                                    {mutation => (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="large"
                                            style={{ marginLeft: 'auto', color: 'white' }}
                                            onClick={mutation}>
                                            LOGIN
                                        </Button>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
                            <div
                                onClick={() => console.log('Term of use. Privacy policy pressed.')}
                                style={{ marginTop: '30px', textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant="caption">Term of use. Privacy policy</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup;
        this._saveUserData(token);
        this.props.history.push('/');
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}


export default Authentication;
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogConsumer } from '../../Context/DialogContext'
import { FiMail } from 'react-icons/fi';

export default class FormDialog extends React.Component {
    state = {
        email: ''
    }
    render() {
        const { email } = this.state
        return (
            <DialogConsumer>
                {
                    context => (
                        <Dialog
                            open={context.dialogEnabled}
                            onClose={context.closeDialog}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To subscribe to this website, please enter your email address here. We will send
                                    updates occasionally.
                                </DialogContentText>
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
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={context.closeDialog} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={context.closeDialog} color="primary">
                                    Subscribe
                                </Button>
                            </DialogActions>
                        </Dialog>
                    )
                }
            </DialogConsumer>
        );
    }
}
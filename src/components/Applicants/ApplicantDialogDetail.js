import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { FiX } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { FiPhone } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';
import { FiAward } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Query } from "react-apollo";
import { GET_APPLICANT_BY_ID } from './ApplicantsQueries'
import Divider from '@material-ui/core/Divider';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'row'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes } = props;
    return (
        <MuiDialogTitle className={classes.root} disableTypography>
            {children}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const HeaderContent = ({ avatar, title = 'None' }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {
                avatar.length === 1 ?
                    <Avatar style={{ margin: 10, width: 60, height: 60 }}>{avatar}</Avatar> :
                    <Avatar src={avatar} style={{ margin: 10, width: 60, height: 60 }}></Avatar>
            }
            <Typography style={{ margin: '0px 10px' }} variant="h6">{title}</Typography>
        </div>
    )
}

const ApplicantDialogOptions = ({ onClose, onOpenDialogContent }) => {
    return (
        <div style={{ alignSelf: 'center', marginLeft: 'auto' }}>
            <IconButton aria-label="Edit" onClick={onOpenDialogContent} >
                <FiEdit2 color="#afafaf" />
            </IconButton>
            <IconButton aria-label="Trash" >
                <FiTrash2 color="#afafaf" />
            </IconButton>
            <IconButton aria-label="Close" onClick={onClose} >
                <FiX color="#afafaf" />
            </IconButton>
        </div>
    )
}

const evaluateValue = (value) => {
    if (value instanceof Object) {
        if (Array.isArray(value.list)) {
            return (
                value.list.map((phone, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', flexDirection: 'row', marginLeft: '15px', margin: '6px 0' }}>
                            <Typography variant="body2" style={{ display: 'flex', alignItems: 'center' }}>
                                {phone[value.keyName]}
                            </Typography>
                            <Typography variant="caption" style={{ display: 'flex', alignItems: 'end', color: 'gray' }}>
                                &nbsp; • &nbsp;
                            </Typography>
                            <Typography variant="body2" style={{ display: 'flex', alignItems: 'center' }}>
                                {phone.label}
                            </Typography>
                        </div>
                    )
                })
            )
        }
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '15px', margin: '6px 0' }}>
                <Typography variant="body2" style={{ display: 'flex', alignItems: 'end' }}>
                    {value}
                </Typography>
            </div>
        )
    }
}

const DetailItem = ({ value, icon }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginTop: '7px' }}>
                    {
                        icon
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '30px', justifyContent: 'center' }}>
                    {
                        evaluateValue(value)
                    }
                </div>
            </div>
            <Divider style={{ marginLeft: 0 }} variant="inset" />
        </div>
    )
}

const ApplicantDetailContent = ({ applicant }) => {
    return (
        <DialogContent style={{ marginLeft: '40px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
                    <Typography variant='subtitle1' style={{ textAlign: 'center', margin: '0 10px' }} gutterBottom>
                        Details
                </Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
                    {applicant.phones.list.length > 0 && (<DetailItem value={applicant.phones} icon={<FiPhone color="grey" style={{ fontSize: '20px' }} />} />)}
                    {applicant.mails.list.length > 0 && (<DetailItem value={applicant.mails} icon={<FiMail color="grey" style={{ fontSize: '20px' }} />} />)}
                    {applicant.accounts.list.length > 0 && (<DetailItem value={applicant.accounts} icon={<FiUsers color="grey" style={{ fontSize: '20px' }} />} />)}
                    {applicant.position !== "" && (<DetailItem value={applicant.position} icon={<FiAward color="grey" style={{ fontSize: '20px' }} />} />)}
                    {applicant.address !== "" && (<DetailItem value={applicant.address} icon={<FiMapPin color="grey" style={{ fontSize: '20px' }} />} />)}
                </div>
            </div>
        </DialogContent>
    )
}

class ApplicantDialogDetail extends React.Component {

    _closeDialog = () => {
        // this.props.handleDialog('detail', false);
        // this.props.clearApplicantSelectedId();
    }

    _openDialog = () => {
        // this.props.handleDialog('detail', false);
        this.props.handleDialog('content', true);
    }

    render() {
        const { fullScreen } = this.props;
        const id = this.props.applicantSelectedId
        return (
            <Query query={GET_APPLICANT_BY_ID} variables={{ id }} skip={id === ""} fetchPolicy="cache-and-network">
                {({ loading, error, data }) => {
                    if (loading) return <div>Loading...</div>
                    if (error) return `Error!: ${error}`
                    return (
                        data !== undefined && (
                            <Dialog
                                fullScreen={fullScreen}
                                fullWidth={true}
                                maxWidth={"sm"}
                                onClose={this._closeDialog}
                                aria-labelledby="customized-dialog-title"
                                open={this.props.isEnabled || false}
                            >
                                <DialogTitle id="customized-dialog-title" onClose={this._closeDialog}>
                                    <HeaderContent
                                        avatar={(data.applicantById.avatar !== "") ? data.applicantById.avatar : data.applicantById.name[0]}
                                        title={data.applicantById.name + ' ' + data.applicantById.lastName}
                                    />
                                    <ApplicantDialogOptions
                                        onClose={this._closeDialog}
                                        onOpenDialogContent={this._openDialog}
                                    />
                                </DialogTitle>
                                <ApplicantDetailContent applicant={data.applicantById} />
                            </Dialog>
                        )
                    )
                }}
            </Query>
        )
    }
}

export default withMobileDialog()(ApplicantDialogDetail);

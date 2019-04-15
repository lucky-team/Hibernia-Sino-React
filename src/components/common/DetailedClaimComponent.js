import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Paper, Grid, Typography, TextField
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import * as Utils from '../../shared/Utils';
import * as BaseUrl from '../../shared/BaseUrl';
import Draggable from 'react-draggable';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
    },
    content: {
        padding: theme.spacing.unit * 10,
    },
    actionsBtns: {
        margin: theme.spacing.unit * 1
    }
})

function PaperComponent(props) {
    return (
      <Draggable>
        <Paper {...props} />
      </Draggable>
    );
  }

const RenderClaimInformation = ({ claim }) => {
    if (claim) {
        return (
            <>
                <Grid container item spacing={8} xs={12}>
                    <Grid item xs={12}><Typography variant='h5' gutterBottom>Claim Information</Typography></Grid>
                    <Grid container item xs={12}>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="ID"
                                defaultValue={claim._id}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="STATUS"
                                defaultValue={claim.status}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="TYPE"
                                defaultValue={claim.type}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="AMOUNT"
                                defaultValue={claim.amount}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="ACCIDENT DATE"
                                defaultValue={Utils.parseISODate(claim.date)}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="APPLIED AT"
                                defaultValue={Utils.parseISODate(claim.createdAt)}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="ACCIDENT LOCATION"
                                defaultValue={claim.location}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="CLAIM REASON"
                                defaultValue={claim.reason}
                                multiline
                                rows="4"
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    } else {
        return (<></>);
    }
}

const RenderInsuredInformation = ({ insurance }) => {
    if (insurance) {
        let insured = insurance.insured;
        return (
            <>
                <Grid container item spacing={8} xs={12}>
                    <Grid item xs={12}><Typography variant='h5' gutterBottom>Insured Information</Typography></Grid>
                    <Grid container item xs={12}>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="LASTNAME"
                                defaultValue={insured.lastname}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="FIRSTNAME"
                                defaultValue={insured.firstname}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="SOCIAL ID"
                                defaultValue={insured.socialId}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={4} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="AGE"
                                defaultValue={insured.age}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="PHONE"
                                defaultValue={insured.phone}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="GENDER"
                                defaultValue={insured.gender}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="EMAIL"
                                defaultValue={insured.email}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    } else {
        return (<></>);
    }
}

const RenderBasicInformation = ({ insurance }) => {
    if (insurance) {
        return (
            <>
                <Grid container item spacing={8} xs={12}>
                    <Grid item xs={12}><Typography variant='h5' gutterBottom>Basic Information</Typography></Grid>
                    <Grid container item xs={12} spacing={16}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="ID"
                                defaultValue={insurance._id}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <TextField
                                id="standard-read-only-input"
                                label="PLAN"
                                defaultValue={insurance.plan}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <TextField
                                id="standard-read-only-input"
                                label="LEVEL"
                                defaultValue={insurance.level}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="START FROM"
                                defaultValue={Utils.parseISODate(insurance.createdAt)}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="DURATION (days)"
                                defaultValue={insurance.duration}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container item md={6} xs={12}>
                            <TextField
                                id="standard-read-only-input"
                                label="EXPIRE AT"
                                defaultValue={Utils.parseISODate(insurance.expireDate)}
                                margin="normal"
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    } else {
        return (<></>);
    }
}

const RenderActions = ({ classes, claim, handleClose, assignClaim, acceptClaim, toggleRejectDialog }) => {
    if (claim) {
        switch(claim.status) {
            case 'pending':
                return (
                    <>
                        <Button className={classes.actionsBtns} variant='outlined' onClick={handleClose} color="primary">
                            BACK
                        </Button>
                        <Button className={classes.actionsBtns} variant='outlined' onClick={assignClaim} color="primary">
                            TAKE CLAIM
                        </Button>
                    </>
                );
            case 'processing':
                return (
                    <>
                        <Button className={classes.actionsBtns} variant='outlined' onClick={handleClose} color="primary">
                            BACK
                        </Button>
                        <Button className={classes.actionsBtns} variant='outlined' onClick={toggleRejectDialog} color="primary">
                            REJECT
                        </Button>
                        <Button className={classes.actionsBtns} variant='outlined' onClick={acceptClaim} color="primary">
                            ACCEPT
                        </Button>
                    </>
                );
            default:
                return (
                    <Button className={classes.actionsBtns} variant='outlined' onClick={handleClose} color="primary">
                        BACK
                    </Button>
                );
        }
    } else {
        return (
            <Button variant='outlined' onClick={handleClose} color="primary">
                BACK
            </Button>
        );
    }
}

const RenderRejectDialog = ({ handleClose, open, rejectClaim, rejectReason, changeRejectReason }) => {
    return (
        <Dialog open={open} onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Claim Rejection</DialogTitle>
        <DialogContent onMouseDown={(e) => {e.stopPropagation()}}>
          <DialogContentText>
            To reject this claim, you should give a reasonable message illustrating why this claim is not accepted.
          </DialogContentText>
          <TextField
            autoFocus
            id="rejectReason"
            label="REJECT REASON"
            value={rejectReason}
            onChange={(event) => changeRejectReason(event.target.value)}
            multiline
            fullWidth
            rows="4"
            margin="normal"
            variant='outlined'
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={rejectClaim} color="primary">
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    );
}

class DraggableDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRejectDialogOpen: false
        }
    }

    toggleRejectDialog = (state) => {
        this.setState({
            isRejectDialogOpen: state,
            rejectReason: ''
        })
    }

    changeRejectReason = rejectReason => {
        this.setState({
            rejectReason: rejectReason
        })
    }

    rejectClaim = () => {
        if (this.state.rejectReason !== '') {
            const bearer = 'Bearer ' + localStorage.getItem('token');
            const data = {rejectReason: this.state.rejectReason};
            alert(JSON.stringify(data));
    
            fetch(BaseUrl.baseUrl + 'claims/reject/' + this.props.claim._id, {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),

            })
            .then(response => {
                return response;
            }, error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(response => {
                if  (response.err) {
                    var error = new Error(response.err.name + ': ' + response.err.message);
                    error.response = response;
                    throw error;
                } else if (response.success) {
                    this.props.enqueueSnackbar(response.msg);
                    this.props.handleClose();
                    setTimeout(() => this.props.fetchClaims(), 2000);
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .catch(error => this.props.enqueueSnackbar(error.message, {variant: 'warning'}));
        } else {
            this.props.enqueueSnackbar('Please enter reject reason');
        }
        
    }

    acceptClaim = () => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
    
        fetch(BaseUrl.baseUrl + 'claims/accept/' + this.props.claim._id, {
            headers: {
                'Authorization': bearer
            }
        })
        .then(response => {
            return response;
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            if  (response.err) {
                var error = new Error(response.err.name + ': ' + response.err.message);
                error.response = response;
                throw error;
            } else if (response.success) {
                this.props.handleClose();
                this.props.enqueueSnackbar(response.msg);
                setTimeout(() => this.props.fetchClaims(), 2000);
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .catch(error => this.props.enqueueSnackbar(error.message, {variant: 'warning'}));
    }

    assignClaim = () => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
    
        fetch(BaseUrl.baseUrl + 'claims/assign/' + this.props.claim._id, {
            headers: {
                'Authorization': bearer
            }
        })
        .then(response => {
            return response;
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => {
            if  (response.err) {
                var error = new Error(response.err.name + ': ' + response.err.message);
                error.response = response;
                throw error;
            } else if (response.success) {
                this.props.handleClose();
                this.props.enqueueSnackbar(response.msg);
                setTimeout(() => this.props.fetchClaims(), 2000);
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        })
        .catch(error => this.props.enqueueSnackbar(error.message, {variant: 'warning'}));
    }

    render() {
        const { insurance, claim, handleClose, open, classes } = this.props;

        return (
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                PaperComponent={PaperComponent}
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle id="draggable-dialog-title" disableTypography={true}><Typography variant='h4'>Insurance Details</Typography></DialogTitle>
                <DialogContent onMouseDown={(e) => {e.stopPropagation()}}>
                    <Grid container spacing={32}>
                        <RenderClaimInformation
                            claim={claim}
                        />
                        <RenderBasicInformation
                            insurance={insurance}
                        />
                        <RenderInsuredInformation
                            insurance={insurance}
                        />
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <RenderActions
                        classes={classes}
                        claim={claim}
                        handleClose={handleClose}
                        assignClaim={this.assignClaim}
                        acceptClaim={this.acceptClaim}
                        toggleRejectDialog={() => this.toggleRejectDialog(true)}
                    />
                </DialogActions>
                <RenderRejectDialog
                    handleClose={() => this.toggleRejectDialog(false)}
                    open={this.state.isRejectDialogOpen}
                    rejectClaim={this.rejectClaim}
                    rejectReason={this.state.rejectReason}
                    changeRejectReason={this.changeRejectReason}
                />
            </Dialog>
        );
    }
}

export default withStyles(styles)(DraggableDialog);
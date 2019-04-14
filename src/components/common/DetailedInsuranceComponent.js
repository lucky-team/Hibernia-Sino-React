import React from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Paper, Grid, Typography, TextField
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import * as Utils from '../../shared/Utils';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit * 2,
    },
    content: {
        padding: theme.spacing.unit * 10,
    }
})

const RenderClaimInformation = ({ insurance }) => {
    if (insurance && insurance.claim) {
        let claim = insurance.claim;
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


class DraggableDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { insurance, handleClose, open } = this.props;

        return (
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle id="draggable-dialog-title" disableTypography={true}><Typography variant='h4'>Insurance Details</Typography></DialogTitle>
                <DialogContent>
                    <Grid container spacing={32}>
                        <RenderClaimInformation
                            insurance={insurance}
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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(DraggableDialog);
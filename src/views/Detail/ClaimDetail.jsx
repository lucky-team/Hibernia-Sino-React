import React, { useState } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper, Dialog, DialogTitle, DialogContent,FormControl, InputLabel } from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Datetime from "react-datetime";
import moment from 'moment';
import Draggable from 'react-draggable';

import insuranceDetailStyle from 'assets/jss/material-kit-pro-react/views/insuranceDetailStyle.jsx';

function PaperComponent(props) {
    return (
      <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

const ClaimDetail = ({ ...props }) => {
    const {
        t,
        claim,
        fetchInsurance,
        open,
        handleClose,
        classes,
        acceptClaim,
        rejectClaim
    } = props;

    const [rejectReason, setRejectReason] = useState('');

    if (claim === null) {
        return null;
    } else {
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                onClose={handleClose}
                open={open}
                PaperComponent={PaperComponent}
            >
                <DialogTitle>{t('claimDetail.title')}</DialogTitle>
                <DialogContent onClick={(e) => e.stopPropagation()}>
                    <div className={classes.main}>
                        <GridContainer spacing={16}>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText={t('claimDetail.claimId')}
                                    id="claimId"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        name: 'claimId',
                                        value: claim._id
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText={t('claimDetail.type')}
                                    id="type"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        name: 'type',
                                        value: claim.type
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText={t('claimDetail.location')}
                                    id="location"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        name: 'location',
                                        value: claim.location
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                            <InputLabel className={classes.label}>
                                    {t('claimProcessPage.form.date')}
                                </InputLabel>
                                <br />
                                <FormControl fullWidth>
                                    <Datetime
                                        value={moment(claim.date).format('LL').toString()}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText={t('claimDetail.status')}
                                    id="status"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        name: 'status',
                                        value: claim.status
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText={t('claimDetail.amount')}
                                    id="amount"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        name: 'amount',
                                        value: claim.amount
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText={t('claimDetail.reason')}
                                    id="reason"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        name: 'reason',
                                        value: claim.reason,
                                        multiline: true,
                                        rows: 7
                                    }}
                                />
                            </GridItem>
                            {claim.status === 'processing' && (
                                <GridItem xs={12}>
                                    <GridContainer>
                                        <GridItem xs={4}>
                                            <CustomInput
                                                labelText={t('claimDetail.rejectReason')}
                                                id="rejectReason"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                inputProps={{
                                                    name: 'rejectReason',
                                                    value: rejectReason,
                                                    onChange: (e) => setRejectReason(e.target.value),
                                                    multiline: true,
                                                    rows: 7
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={4}>
                                            <Button
                                                round
                                                onClick={() => {
                                                    acceptClaim(claim._id);
                                                    handleClose();
                                                    setRejectReason('');
                                                }}
                                            >
                                                {t('claimDetail.accept')}
                                            </Button>
                                        </GridItem>
                                        <GridItem xs={4}>
                                            <Button
                                                round
                                                onClick={() => {
                                                    rejectClaim(claim._id, rejectReason);
                                                    handleClose();
                                                    setRejectReason('');
                                                }}
                                            >
                                                {t('claimDetail.reject')}
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </GridItem>
                            )}
                        </GridContainer>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
    
};

export default withStyles(insuranceDetailStyle)(ClaimDetail);
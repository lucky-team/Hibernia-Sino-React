import React, { useState } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper, Dialog, DialogTitle, DialogContent,FormControl, InputLabel } from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Datetime from "react-datetime";
import moment from 'moment';
import Draggable from 'react-draggable';
import { baseUrl } from 'routes/BaseUrl';

import insuranceDetailStyle from 'assets/jss/material-kit-pro-react/views/insuranceDetailStyle.jsx';

function PaperComponent(props) {
    return (
      <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

const fetchClaimFile = (claimId, filename) => {
    const bearer = 'Bearer ' +  localStorage.getItem('token');
    const url = baseUrl + `res/claim-files/${claimId}/${filename}`;

    return fetch(url, {
        headers: {
            'Authorization': bearer
        },
        method: 'GET'
    })
    .then((response) => response.blob())
    .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    });
}

const ClaimDetail = ({ ...props }) => {
    const {
        t,
        claim,
        insurance,
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
                            <GridItem xs={12}>
                                <h5><strong>{t('claimDetail.basic')}</strong></h5>
                            </GridItem>
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
                            <GridItem xs={8}>
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
                            <GridItem xs={12}>
                                <h5><strong>{t('claimDetail.supportingFiles')}</strong></h5>
                            </GridItem>
                            {claim.files.length !== 0 && (
                                <GridItem xs={12} md={8}>
                                    {claim.files.map((filename, key) => (
                                        <Button
                                            key={key}
                                            round
                                            onClick={() => fetchClaimFile(claim._id, filename)}
                                        >{filename}</Button>
                                    ))}
                                </GridItem>
                            )}
                            <GridItem xs={12}>
                                <h5><strong>{t('insuranceDetail.title')}</strong></h5>
                            </GridItem>
                            {insurance !== null && (
                                <>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuranceDetail.insuranceId')}
                                        id="insuranceId"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: '_id',
                                            value: insurance._id
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuranceDetail.plan')}
                                        id="plan"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'plan',
                                            value: insurance.plan
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuranceDetail.level')}
                                        id="level"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'level',
                                            value: insurance.level
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuranceDetail.duration')}
                                        id="duration"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'duration',
                                            value: insurance.duration
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuranceDetail.start')}
                                        id="startDate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'startDate',
                                            value: moment(insurance.startDate).format('LL').toString()
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuranceDetail.expire')}
                                        id="expireDate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'expireDate',
                                            value: moment(insurance.expireDate).format('LL').toString()
                                        }}
                                    />
                                </GridItem>
                                </>
                            )}
                            <GridItem xs={12}>
                                <h5><strong>{t('insuredDetail.title')}</strong></h5>
                            </GridItem>
                            {insurance !== null && (
                                <>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuredDetail.insured')}
                                        id="insured"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'insured',
                                            value: `${insurance.insured.firstname} ${insurance.insured.lastname}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuredDetail.socialId')}
                                        id="socialId"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'socialId',
                                            value: `${insurance.insured.socialId} ${insurance.insured.lastname}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuredDetail.gender')}
                                        id="gender"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'gender',
                                            value: insurance.insured.gender
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuredDetail.age')}
                                        id="age"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'age',
                                            value: insurance.insured.age
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuredDetail.phone')}
                                        id="phone"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'phone',
                                            value: insurance.insured.phone
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('insuredDetail.email')}
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'email',
                                            value: insurance.insured.email
                                        }}
                                    />
                                </GridItem>
                                </>
                            )}
                            <GridItem xs={12}>
                                <h5><strong>{t('bankDetail.title')}</strong></h5>
                            </GridItem>
                            {insurance !== null && (
                                <>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('bankDetail.bankName')}
                                        id="bankName"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'bankName',
                                            value: insurance.insured.bankName
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('bankDetail.bankAccount')}
                                        id="bankAccount"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'bankAccount',
                                            value: insurance.insured.bankAccount
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4}>
                                    <CustomInput
                                        labelText={t('bankDetail.bankUsername')}
                                        id="bankUsername"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            name: 'bankUsername',
                                            value: insurance.insured.bankUsername
                                        }}
                                    />
                                </GridItem>
                                </>
                            )
                            }
                            {claim.status === 'processing' && (
                                <>
                                <GridItem xs={12}>
                                    <h4><strong>{t('claimDetail.handle')}</strong></h4>
                                </GridItem>
                                <GridItem xs={12}>
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
                                <GridItem xs={12}>
                                    <GridContainer>
                                        <GridItem xs={2}>
                                            <Button
                                                round
                                                color='rose'
                                                onClick={() => {
                                                    acceptClaim(claim._id);
                                                    handleClose();
                                                    setRejectReason('');
                                                }}
                                            >
                                                {t('claimDetail.accept')}
                                            </Button>
                                        </GridItem>
                                        <GridItem xs={2}>
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
                                </>
                            )}
                        </GridContainer>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
    
};

export default withStyles(insuranceDetailStyle)(ClaimDetail);
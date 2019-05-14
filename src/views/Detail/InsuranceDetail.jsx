import React, { useState } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { Paper, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
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
};

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
};

const InsuranceDetail = ({ ...props }) => {
    const {
        t,
        insurance,
        open,
        handleClose,
        classes,
    } = props;

    if (insurance === null) {
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
                <DialogTitle>{t('insuranceDetail.title')}</DialogTitle>
                <DialogContent
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={classes.main}>
                        <GridContainer spacing={16}>
                            <GridItem xs={12}>
                                <h5><strong>{t('insuranceDetail.basic')}</strong></h5>
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText={t('insuranceDetail.insuranceId')}
                                    id="_id"
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
                                    id="start"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        name: 'startAt',
                                        value: moment(insurance.startAt).format('LL').toString()
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={4}>
                                <CustomInput
                                    labelText={t('insuranceDetail.expire')}
                                    id="expire"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        name: 'expireAt',
                                        value: moment(insurance.expireAt).format('LL').toString()
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12}>
                                <h5><strong>{t('bankDetail.title')}</strong></h5>
                            </GridItem>
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
                            <GridItem xs={12}>
                                <h5><strong>{t('insuredDetail.title')}</strong></h5>
                            </GridItem>
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
                                        value: insurance.insured.socialId
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
                            {insurance.claim !== undefined && (
                                <>
                                    <GridItem xs={12}>
                                        <h5><strong>{t('claimDetail.title')}</strong></h5>
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
                                                value: insurance.claim._id
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
                                                value: insurance.claim.type
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
                                                value: insurance.claim.location
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={4}>
                                        <CustomInput
                                            labelText={t('claimDetail.date')}
                                            id="date"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                name: 'date',
                                                value: moment(insurance.claim.date).format('LL').toString()
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
                                                value: insurance.claim.amount
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
                                                value: insurance.claim.reason,
                                                multiline: true,
                                                rows: 7
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12}>
                                        <h5><strong>{t('claimDetail.supportingFiles')}</strong></h5>
                                    </GridItem>
                                    {insurance.claim.files.length !== 0 && (
                                        <GridItem xs={12} md={8}>
                                            {insurance.claim.files.map((filename, key) => (
                                                <Button
                                                    key={key}
                                                    round
                                                    onClick={() => fetchClaimFile(insurance.claim._id, filename)}
                                                >{filename}</Button>
                                            ))}
                                        </GridItem>
                                    )}
                                </>
                            )}
                        </GridContainer>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
};

export default withStyles(insuranceDetailStyle)(InsuranceDetail);
import React from 'react';
import classNames from 'classnames';
import { FormControl, InputLabel } from '@material-ui/core';
import { Layers } from '@material-ui/icons';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";
import Datetime from "react-datetime";
import CustomFileInput from "components/CustomFileInput/CustomFileInput.jsx";

const FillingDetailsSection = ({ ...props }) => {
    const {
        classes,
        t,
        handleChange,
        handleBack,
        handleNext,
        claim
    } = props;


    return (
        <GridContainer>
            <GridItem sm={12}>
                <h2 className={classes.subTitle}>{t('claimProcessPage.form.informationTitile')}</h2>
            </GridItem>
            <GridItem sm={8}>
                <GridContainer spacing={32}>
                    <GridItem md={4} sm={6}>
                        <CustomInput
                            disabled
                            labelText={t('claimProcessPage.form.insurance')}
                            id="insurance"
                            formControlProps={{
                                fullWidth: true,
                            }}
                            inputProps={{
                                name: 'insurance',
                                value: claim.insurance,
                                onChange: handleChange,
                                disabled: true
                            }}
                        />
                    </GridItem>
                    <GridItem md={4} sm={6}>
                        <CustomInput
                            labelText={t('claimProcessPage.form.location')}
                            id="location"
                            formControlProps={{
                                fullWidth: true,
                                required: true
                            }}
                            inputProps={{
                                name: 'location',
                                value: claim.location,
                                onChange: handleChange
                            }}
                        />
                    </GridItem>
                    <GridItem md={4} sm={6}>
                        <InputLabel className={classes.label}>
                            Datetime Picker
                        </InputLabel>
                        <br />
                        <FormControl fullWidth>
                            <Datetime
                                inputProps={{
                                    placeholder: "Datetime Picker Here",
                                    required: true
                                }}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem sm={12}>
                        <CustomInput
                            labelText={t('claimProcessPage.form.reason')}
                            id="reason"
                            formControlProps={{
                                fullWidth: true,
                                required: true
                            }}
                            inputProps={{
                                name: 'reason',
                                value: claim.reason,
                                onChange: handleChange,
                                multiline: true,
                                rows: 7
                            }}
                        />
                    </GridItem>
                    <GridItem sm={12} md={8}>
                        <CustomFileInput
                            multiple
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                placeholder: "Multiple File..."
                            }}
                            endButton={{
                                buttonProps: {
                                round: true,
                                color: "info",
                                justIcon: true,
                                fileButton: true
                                },
                                icon: <Layers />
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </GridItem>

        </GridContainer>
    );
}

export default FillingDetailsSection;
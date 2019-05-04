import React, { Component } from 'react';
import { FormControl, InputLabel } from '@material-ui/core';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";
import Popover from 'components/Popover/Popover.jsx';
import Datetime from "react-datetime";
import FilePond from 'components/FilePond/FilePond.jsx';

class FillingDetailsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopoverOpen: false,
            
        }
        this.setPopover = this.setPopover.bind(this);
    }
    anchorElTop = null;
    
    setPopover(popoverState) {
        this.setState({
            isPopoverOpen: popoverState
        });
    }

    render() {
        const {
            classes,
            t,
            handleChange,
            handleUpdateFiles,
            handleSubmit,
            handleBack,
            handleNext,
            claim
        } = this.props;

        const popoverHeader = t(`claimProcessPage.chooseTypeSection.type${claim.type}.title`);
      
        let filelist = [];
        switch (claim.type) {
            case 1:
                for (let i = 1; i <= 11; i++) {
                    filelist.push(`${i}. ` + t(`claimProcessPage.filelist${claim.type}.${i}`));
                }
                break;
            case 2:
                for (let i = 1; i <= 3; i++) {
                    filelist.push(`${i}. ` + t(`claimProcessPage.filelist${claim.type}.${i}`));
                }
                break;
            case 3:
                for (let i = 1; i <= 6; i++) {
                    filelist.push(`${i}. ` + t(`claimProcessPage.filelist${claim.type}.${i}`));
                }
                break;
            default:
                break;
        }
        const popoverBody = filelist.map((item, key) => {
            return (
                <p key={key}>{item}</p>
            );
        })

        return (
            <GridContainer>
                <GridItem sm={12}>
                    <h2 className={classes.subTitle}>{t('claimProcessPage.form.informationTitile')}</h2>
                </GridItem>
                <GridItem sm={8}>
                    <form onSubmit={(e) => {
                        handleSubmit(e);
                        handleNext();
                    }}>
                        <GridContainer spacing={32}>
                            <GridItem md={4} sm={6}>
                                <CustomInput
                                    labelText={t('claimProcessPage.form.insurance')}
                                    id="insurance"
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true,
                                        disabled: true
                                    }}  
                                    inputProps={{
                                        name: 'insurance',
                                        value: claim.insurance,
                                        onChange: handleChange
                                    }}
                                />
                            </GridItem>
                            <GridItem md={4} sm={6}>
                                <CustomSelect
                                    labelText={t('claimProcessPage.form.type')}
                                    id="type" 
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true
                                    }}
                                    inputProps={{
                                        name: 'type',
                                        value: claim.type,
                                        onChange: handleChange
                                    }}
                                    menuItems={[
                                        {name: t('claimProcessPage.chooseTypeSection.type1.title'), value: 1},
                                        {name: t('claimProcessPage.chooseTypeSection.type2.title'), value: 2},
                                        {name: t('claimProcessPage.chooseTypeSection.type3.title'), value: 3}
                                    ]}
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
                                    {t('claimProcessPage.form.date')}
                                </InputLabel>
                                <br />
                                <FormControl fullWidth>
                                    <Datetime
                                        onChange={(date) => handleChange({
                                            target: {
                                                name: 'date',
                                                value: date
                                            }
                                        })}
                                        value={claim.date}
                                        formControlProps={{
                                            required: true
                                        }}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem md={4} sm={6}>
                                <CustomInput
                                    labelText={t('claimProcessPage.form.amount')}
                                    id="amount"
                                    formControlProps={{
                                        fullWidth: true,
                                        required: true
                                    }}
                                    inputProps={{
                                        name: 'amount',
                                        value: claim.amount,
                                        onChange: handleChange
                                    }}
                                />
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
                            <GridItem sm={12} md={4}>
                                <Button
                                    round
                                    buttonRef={node => {
                                        this.anchorElTop = node;
                                    }}
                                    onClick={() => this.setPopover(true)}
                                >
                                    {t(`claimProcessPage.chooseTypeSection.type${claim.type}.title`) + ': ' + t('claimProcessPage.form.filelist')}
                                </Button>
                                <Popover
                                    open={this.state.isPopoverOpen}
                                    anchorEl={this.anchorElTop}
                                    anchorReference={"anchorEl"}
                                    onClose={() => this.setPopover(false)}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "center"
                                    }}
                                    transformOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center"
                                    }}
                                    header={popoverHeader}
                                    body={popoverBody}
                                />
                            </GridItem>
                            <GridItem sm={12} md={8}>
                                <FilePond
                                    files={claim.files}
                                    onupdatefiles={handleUpdateFiles}
                                />
                            </GridItem>
                            <GridItem sm={12}>
                                <Button type='submit' round color='info'>
                                    {t('claimProcessPage.form.submit')}
                                </Button>
                                <Button round color='secondary' onClick={handleBack}>
                                    {t('claimProcessPage.form.cancel')}
                                </Button>
                            </GridItem>
                        </GridContainer>
                    </form>
                </GridItem>
            </GridContainer>
        );
    }
}

export default FillingDetailsSection;
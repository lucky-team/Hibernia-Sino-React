import React, { Component } from 'react';
import classNames from "classnames";
import { withTranslation } from 'react-i18next';
import withStyles from "@material-ui/core/styles/withStyles";

import { InputAdornment, MenuItem, Select  } from '@material-ui/core';

import Header from 'views/Header/Header.jsx';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomSelect/CustomSelect.jsx";

import marc from "assets/img/marc.jpg";
import CountryCode from 'assets/locales/countryCode.json';


import profilePageStyle from "assets/jss/material-kit-pro-react/views/profilePageStyle.jsx";

const countryCode = CountryCode.map(item => {
    return {
        "name": `${item.name} ${item.dial_code}`,
        "value": item.dial_code
    }
});

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                lastname: '',
                firstname: '',
                socialId: '',
                age: '',
                country: '',
                province: '',
                city: '',
                gender: '',
                phone: '',
                dialCode: '',
                email: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.title = this.props.t('profilePage.pageTitle');
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            profile: {...this.state.profile, [name]: value}
        });
    }

    render() {
        const { classes, t } = this.props;
        const { profile } = this.state;
        const imageClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        );

        console.log(countryCode);

        return (
            <div>
                <Header
                    absolute
                    fixed
                    color='transparent'
                    changeColorOnScroll={{
                        height: 220,
                        color: "primary"
                    }}
                />
                <Parallax
                    image={require('assets/img/city.jpg')}
                    filter='dark'
                    className={classes.parallax}
                />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <GridContainer justify='center'>
                            <GridItem xs={12} sm={12} md={7}>
                                <div className={classes.profile}>
                                    <div>
                                        <img src={marc} alt='...' className={imageClasses} />
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{`${profile.firstname} ${profile.lastname}`}</h3>
                                    </div>
                                </div>
                            </GridItem>
                            <GridItem sm={10}>
                                <GridContainer className={classes.container}>
                                    <GridItem sm={12}>
                                        <h2 className={classes.title}>{t('profilePage.title')}</h2>
                                        <p>{t('profilePage.tips')}<br /><br /></p>
                                    </GridItem>
                                    <GridItem sm={8}>
                                        <form>
                                            <GridContainer justify='flex-start' spacing={32}>   
                                                <GridItem md={4} sm={6}>
                                                    <CustomInput
                                                        labelText={t('profilePage.form.firstname')}
                                                        id="firstname"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'firstname',
                                                            value: profile.firstname,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomInput
                                                        labelText={t('profilePage.form.lastname')}
                                                        id="lastname"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'lastname',
                                                            value: profile.lastname,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomInput
                                                        labelText={t('profilePage.form.socialId')}
                                                        id="socialId"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'socialId',
                                                            value: profile.socialId,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomInput
                                                        labelText={t('profilePage.form.age')}
                                                        id="age"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'age',
                                                            value: profile.age,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomSelect
                                                        labelText={t('profilePage.form.gender')}
                                                        id="gender" 
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'gender',
                                                            value: profile.gender,
                                                            onChange: this.handleChange
                                                        }}
                                                        menuItems={[
                                                            {name: '', value: ''},
                                                            {name: t('profilePage.form.male'), value: 'male'},
                                                            {name: t('profilePage.form.female'), value: 'female'}
                                                        ]}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomInput
                                                        labelText={t('profilePage.form.email')}
                                                        id="email"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'email',
                                                            value: profile.email,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomInput
                                                        labelText={t('profilePage.form.country')}
                                                        id="country"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'country',
                                                            value: profile.country,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomInput
                                                        labelText={t('profilePage.form.province')}
                                                        id="province"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'province',
                                                            value: profile.province,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomInput
                                                        required
                                                        labelText={t('profilePage.form.city')}
                                                        id="city"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'city',
                                                            value: profile.city,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem md={4} sm={6}>
                                                    <CustomSelect
                                                        labelText={t('profilePage.form.dialCode')}
                                                        id="phone"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            name: 'dialCode',
                                                            value: profile.dialCode,
                                                            onChange: this.handleChange
                                                        }}
                                                        menuItems={countryCode}
                                                        />
                                                </GridItem>
                                                <GridItem md={8} sm={6}>
                                                    <CustomInput
                                                        labelText={t('profilePage.form.phone')}
                                                        id="phone"
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                        inputProps={{
                                                            startAdornment: (
                                                                <InputAdornment
                                                                    position="start"
                                                                    className={classes.inputAdornment}
                                                                >
                                                                    {profile.dialCode}
                                                                </InputAdornment>
                                                            ),
                                                            name: 'phone',
                                                            value: profile.phone,
                                                            onChange: this.handleChange
                                                        }}
                                                    />
                                                </GridItem>
                                                <GridItem sm={12}>
                                                    <Button round color='info'>
                                                        {t('profilePage.form.save')}
                                                    </Button>
                                                    <Button round color='secondary'>
                                                        {t('profilePage.form.cancel')}
                                                    </Button>
                                                </GridItem>
                                            </GridContainer>
                                        </form>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </div>

                </div>
            </div>
        );
    }
}

export default withTranslation()(withStyles(profilePageStyle)(ProfilePage));
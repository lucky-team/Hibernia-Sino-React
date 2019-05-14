import React from "react";
import classNames from "classnames";
import Carousel from "react-slick";
import { withTranslation } from 'react-i18next';
import withStyles from "@material-ui/core/styles/withStyles";
import { Dashboard, ViewCarousel, Code, FormatPaint, AccessTime,
    AttachMoney, Weekend, Home, AccountBalance, Business } from "@material-ui/icons";
import Header from 'views/Header/Header.jsx';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import homePageStyle from 'assets/jss/material-kit-pro-react/views/homePageStyle.jsx';

import bgHome from 'assets/img/hibernia_sino.png';
import dg1 from "assets/img/bg2.jpg";
import bg9 from "assets/img/bg9.jpg";
import bg0 from "assets/img/bg0.jpg";
import bg11 from "assets/img/bg11.jpg";


const HomePage = ({ ...props }) => {
    const {
        classes,
        changeLocale,
        t
    } = props;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
    };

    const Pricing = () => (
        <div
        className={`${classes.pricing} ${classes.pricing1} ${classes.section}`}
        style={{ backgroundImage: `url(${bg11})` }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              className={`${classes.mlAuto} ${classes.mrAuto} ${
                classes.textCenter
              }`}
            >
              <h2 className={classes.title}>Pick the best plan for you</h2>
              <h5 className={classes.description}>
                You have Free Unlimited Updates and Premium Support on each
                package.
              </h5>
              <div className={classes.sectionSpace} />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6
                    className={`${classes.cardCategory} ${
                      classes.marginBottom20
                    }`}
                  >
                    Freelancer
                  </h6>
                  <div className={classes.icon}>
                    <Weekend className={classes.iconWhite} />
                  </div>
                  <h3
                    className={`${classes.cardTitleWhite} ${
                      classes.marginTop30
                    }`}
                  >
                    FREE
                  </h3>
                  <p className={classes.cardCategory}>
                    This is good if your company size is between 2 and 10
                    Persons.
                  </p>
                  <Button round color="white">
                    Choose plan
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing raised>
                <CardBody pricing>
                  <h6
                    className={`${classes.cardDescription} ${
                      classes.marginBottom20
                    }`}
                  >
                    SMALL COMPANY
                  </h6>
                  <div className={classes.icon}>
                    <Home className={classes.iconRose} />
                  </div>
                  <h3 className={`${classes.cardTitle} ${classes.marginTop30}`}>
                    $29
                  </h3>
                  <p className={classes.cardDescription}>
                    This is good if your company size is between 2 and 10
                    Persons.
                  </p>
                  <Button round color="rose">
                    Choose plan
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6
                    className={`${classes.cardCategory} ${
                      classes.marginBottom20
                    }`}
                  >
                    MEDIUM COMPANY
                  </h6>
                  <div className={classes.icon}>
                    <Business className={classes.iconWhite} />
                  </div>
                  <h3
                    className={`${classes.cardTitleWhite} ${
                      classes.marginTop30
                    }`}
                  >
                    $69
                  </h3>
                  <p className={classes.cardCategory}>
                    This is good if your company size is between 11 and 99
                    Persons.
                  </p>
                  <Button round color="white">
                    Choose plan
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6
                    className={`${classes.cardCategory} ${
                      classes.marginBottom20
                    }`}
                  >
                    ENTERPRISE
                  </h6>
                  <div className={classes.icon}>
                    <AccountBalance className={classes.iconWhite} />
                  </div>
                  <h3
                    className={`${classes.cardTitleWhite} ${
                      classes.marginTop30
                    }`}
                  >
                    $159
                  </h3>
                  <p className={classes.cardCategory}>
                    This is good if your company size is 99+ persons.
                  </p>
                  <Button round color="white">
                    Choose plan
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );

    const Feature = () => (
        <div
        className={classes.features5}
        style={{ backgroundImage: `url(${bg9})` }}
      >
        <GridContainer>
          <GridItem
            xs={12}
            sm={8}
            md={8}
            className={`${classes.mlAuto} ${classes.mrAuto} ${
              classes.textCenter
            }`}
          >
            <h2 className={classes.title}>Your life will be much easier</h2>
          </GridItem>
          <div className={classes.container}>
            <GridContainer className={classes.gridContainer}>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={Code}
                  title="Hibernia-sino"
                  description={
                    <p>
                        Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                        , Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                    </p>
                  }
                  iconColor="info"
                />
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={FormatPaint}
                  title="Hibernia-sino"
                  description={
                    <p>
                        Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                        , Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                    </p>
                  }
                  iconColor="danger"
                />
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={Dashboard}
                  title="Hibernia-sino"
                  description={
                    <p>
                        Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                        , Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                    </p>
                  }
                  iconColor="primary"
                />
              </GridItem>
            </GridContainer>
            <GridContainer className={classes.gridContainer}>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={ViewCarousel}
                  title="Hibernia-sino"
                  description={
                    <p>
                        Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                        , Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                    </p>
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={AccessTime}
                  title="Hibernia-sino"
                  description={
                    <p>
                        Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                        , Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                    </p>
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={AttachMoney}
                  title="Hibernia-sino"
                  description={
                    <p>
                      Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                            , Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                    </p>
                  }
                />
              </GridItem>
            </GridContainer>
          </div>
        </GridContainer>
      </div>
    );

    return (
        <div>
            <Header
                absolute
                fixed
                color='transparent'
                changeColorOnScroll={{
                    height: 220,
                    color: 'primary'
                }}
                changeLocale={changeLocale}
            />
            <Carousel {...settings}>
                <div>
                    <div
                        className={classes.pageHeader}
                        style={{ backgroundImage: `url("${dg1}")` }}
                    >
                        <div className={classes.container}>
                            <GridContainer>
                                <GridItem xs={12} sm={6} md={6}>
                                    <h1 className={classes.title}>Hibernia-sino</h1>
                                    <h4>
                                        Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                                        , Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                                    </h4>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={classes.pageHeader}
                        style={{ backgroundImage: `url("${bg0}")` }}
                    >
                        <div className={classes.container}>
                            <GridContainer>
                                <GridItem
                                    xs={12}
                                    sm={8}
                                    md={8}
                                    className={classNames(
                                        classes.mlAuto,
                                        classes.mrAuto,
                                        classes.textCenter
                                    )}
                                >
                                    <h1 className={classes.title}>Hibernia-sino</h1>
                                    <h4>
                                        Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                                        , Hibernia-sino, Hibernia-sino, Hibernia-sino, Hibernia-sino
                                    </h4>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
            </Carousel>
            <Pricing />
            <Feature />
            <div>
                    <div
                        className={classes.pageHeaderCommon}
                        style={{ backgroundImage: `url("${bgHome}")` }}
                    >
                        
                    </div>
                </div>
        </div>
    );
};

export default withTranslation()(withStyles(homePageStyle)(HomePage));
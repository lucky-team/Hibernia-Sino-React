import React from "react";
import classNames from "classnames";
import Carousel from "react-slick";
import { withTranslation } from 'react-i18next';
import withStyles from "@material-ui/core/styles/withStyles";
import { Dashboard, ViewCarousel, Code, FormatPaint, AccessTime,
    AttachMoney, Weekend, Home, AccountBalance, Business, ShoppingCart } from "@material-ui/icons";
import Header from 'views/Header/Header.jsx';
import * as BaseUrl from 'routes/BaseUrl';

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
        t,
        history
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
            id='pricing'
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
              <h2 className={classes.title}>{t('homePage.pricing.title')}</h2>
              <h5 className={classes.description}>
                {t('homePage.pricing.content')}
              </h5>
              <div className={classes.sectionSpace} />
            </GridItem>
          </GridContainer>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={6} md={6} lg={3}>
              <Card pricing plain>
                <CardBody pricing plain>
                  <h6
                    className={`${classes.cardCategory} ${
                      classes.marginBottom20
                    }`}
                  >
                    {t('homePage.pricing.1.title')}
                  </h6>
                  <div className={classes.icon}>
                    <Weekend className={classes.iconWhite} />
                  </div>
                  <h3
                    className={`${classes.cardTitleWhite} ${
                      classes.marginTop30
                    }`}
                  >
                    {t('homePage.pricing.1.price')}
                  </h3>
                  <p className={classes.cardCategory}>
                    {t('homePage.pricing.1.content')}
                  </p>
                  <Button
                    round
                    color="white"
                    onClick={() => {
                        history.push(BaseUrl.purchaseUrl + '#plan=1');
                    }}
                  >
                    {t('homePage.pricing.choose')}
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
                    {t('homePage.pricing.2.title')}
                  </h6>
                  <div className={classes.icon}>
                    <Business className={classes.iconWhite} />
                  </div>
                  <h3
                    className={`${classes.cardTitleWhite} ${
                      classes.marginTop30
                    }`}
                  >
                    {t('homePage.pricing.2.price')}
                  </h3>
                  <p className={classes.cardCategory}>
                    {t('homePage.pricing.2.content')}
                  </p>
                  <Button
                    round
                    color="white"
                    onClick={() => {
                        history.push(BaseUrl.purchaseUrl + '#plan=2');
                    }}
                  >
                    {t('homePage.pricing.choose')}
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
                    {t('homePage.pricing.3.title')}
                  </h6>
                  <div className={classes.icon}>
                    <AccountBalance className={classes.iconWhite} />
                  </div>
                  <h3
                    className={`${classes.cardTitleWhite} ${
                      classes.marginTop30
                    }`}
                  >
                    {t('homePage.pricing.3.price')}
                  </h3>
                  <p className={classes.cardCategory}>
                    {t('homePage.pricing.3.content')}
                  </p>
                  <Button
                    round
                    color="white"
                    onClick={() => {
                        history.push(BaseUrl.purchaseUrl + '#plan=3');
                    }}
                  >
                    {t('homePage.pricing.choose')}
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
            <h2 className={classes.title}>{t('homePage.features.title')}</h2>
          </GridItem>
          <div className={classes.container}>
            <GridContainer className={classes.gridContainer}>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={Code}
                  title={t('homePage.features.1.title')}
                  description={
                    <div>
                        <p>{t('homePage.features.1.1')}</p>
                        <p>{t('homePage.features.1.2')}</p>
                        <p>{t('homePage.features.1.3')}</p>
                    </div>
                  }
                  iconColor="info"
                />
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={FormatPaint}
                  title={t('homePage.features.2.title')}
                  description={
                    <div>
                        <p>{t('homePage.features.2.1')}</p>
                        <p>{t('homePage.features.2.2')}</p>
                    </div>
                  }
                  iconColor="danger"
                />
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={Dashboard}
                  title={t('homePage.features.3.title')}
                  description={
                    <div>
                        <p>{t('homePage.features.3.1')}</p>
                        <p>{t('homePage.features.3.2')}</p>
                    </div>
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
                  title={t('homePage.features.4.title')}
                  description={
                    <div>
                        <p>{t('homePage.features.4.1')}</p>
                        <p>{t('homePage.features.4.2')}</p>
                    </div>
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={AccessTime}
                  title={t('homePage.features.5.title')}
                  description={
                    <div>
                        <p>{t('homePage.features.5.1')}</p>
                        <p>{t('homePage.features.5.2')}</p>
                    </div>
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={4} className={classes.gridItem}>
                <InfoArea
                  vertical
                  className={classes.infoArea5}
                  icon={AttachMoney}
                  title={t('homePage.features.6.title')}
                  description={
                    <div>
                        <p>{t('homePage.features.6.1')}</p>
                        <p>{t('homePage.features.6.2')}</p>
                    </div>
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
                                        {t('homePage.ad')}
                                    </h4>
                                    <br />
                                    <div>
                                        <Button
                                            color="danger"
                                            size="lg"
                                            onClick={() => {
                                                document.getElementById('pricing').scrollIntoView();
                                            }}
                                        >
                                            <ShoppingCart />{t('homePage.shop')}
                                        </Button>
                                        <Button
                                            color="white"
                                            simple
                                            size="lg"
                                            onClick={() => {
                                                history.push(BaseUrl.signupUrl);
                                            }}
                                        >
                                            {t('homePage.signup')}
                                        </Button>
                                    </div>
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
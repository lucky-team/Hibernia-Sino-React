import React from 'react';
import classNames from 'classnames';
import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const ParallaxSection = ({ t, classes }) => (
    <Parallax
        image={require("assets/img/card-blog2.jpg")}
        filter="dark"
        small
    >
        <div className={classes.container}>
            <GridContainer>
                <GridItem
                    md={8}
                    sm={8}
                    className={classNames(
                        classes.mlAuto,
                        classes.mrAuto,
                        classes.textCenter
                    )}
                >
                    <h2 className={classes.title}>{t('insurancePage.title')}</h2>
                </GridItem>
            </GridContainer>
        </div>
    </Parallax>
);

export default ParallaxSection;
import React from 'react';
import classNames from 'classnames';
import { People } from '@material-ui/icons';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from 'components/CustomButtons/Button.jsx';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

const RenderCard = ({ ...props }) => {
    const {
        title,
        description,
        buttonText,
        classes,
        handleChange
    } = props;
    return (
        <Card pricing>
            <CardBody pricing>
                <h3
                    className={
                        classNames(classes.cardCategory,
                            classes.cardDescription,
                            classes.marginBottom20)}
                >
                    {title}
                </h3>
                <div className={classes.iconWrapper}>
                    <People className={classes.iconInfo} />
                </div>
                <h5
                    className={
                        classNames(classes.cardTitle,
                            classes.marginTop30)
                    }
                >
                    {description}
                </h5>
                <Button onClick={handleChange} round color='info'>
                    {buttonText}
                </Button>
            </CardBody>
        </Card>
    );
}


const ChooseTypeSection = ({ ...props }) => {
    const {
        classes,
        t,
        handleChange,
        handleNext
    } = props;

    const chooseType = (type) => {
        handleChange({ target: { name: 'type', value: type}});
        handleNext();
    }

    return (
        <GridContainer>
            <GridItem xs={12} md={4}>
                <RenderCard
                    classes={classes}
                    title={t('claimProcessPage.chooseTypeSection.type1.title')}
                    description={t('claimProcessPage.chooseTypeSection.type1.description')}
                    buttonText={t('claimProcessPage.chooseTypeSection.type1.buttonText')}
                    handleChange={() => chooseType(1)}
                />
            </GridItem>
            <GridItem xs={12} md={4}>
                <RenderCard
                    classes={classes}
                    title={t('claimProcessPage.chooseTypeSection.type2.title')}
                    description={t('claimProcessPage.chooseTypeSection.type2.description')}
                    buttonText={t('claimProcessPage.chooseTypeSection.type2.buttonText')}
                    handleChange={() => chooseType(2)}
                />
            </GridItem>
            <GridItem xs={12} md={4}>
                <RenderCard
                    classes={classes}
                    title={t('claimProcessPage.chooseTypeSection.type3.title')}
                    description={t('claimProcessPage.chooseTypeSection.type3.description')}
                    buttonText={t('claimProcessPage.chooseTypeSection.type3.buttonText')}
                    handleChange={() => chooseType(3)}
                />
            </GridItem>
        </GridContainer>
    );
}

export default ChooseTypeSection;
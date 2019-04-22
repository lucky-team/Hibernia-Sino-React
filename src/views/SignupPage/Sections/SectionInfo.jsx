import React from 'react';
import InfoArea from "components/InfoArea/InfoArea.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const SectionInfo = ({ ...props }) => {
    const { infos, classes } = props;
    const sectionInfo = infos.map(info => (
        <InfoArea
            key={info.title}
            className={classes.infoArea}
            title={info.title}
            description={info.description}
            icon={info.icon}
            iconColor={info.iconColor}
        />
    ));

    return (
        <GridItem xs={12} sm={5} md={5}>
            {sectionInfo}
        </GridItem>
    );
}

export default SectionInfo;
import {
    container,
    title,
    cardTitle,
    main,
    mainRaised,
    mrAuto,
    whiteColor,
    grayColor,
    mlAuto
} from "assets/jss/material-kit-pro-react.jsx";

const styles = {
    main,
    mainRaised,
    mrAuto,
    mlAuto,
    cardTitle,
    container: {
        ...container,
        zIndex: 1
    },
    title: {
        ...title,
        "&, & + h4": {
          color: whiteColor
        }
    },
}

export default styles;
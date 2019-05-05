import {
    container,
    title,
    cardTitle,
    main,
    mainRaised,
    mrAuto,
    whiteColor,
    mlAuto,
    warningColor,
    primaryColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
    grayColor,
} from "assets/jss/material-kit-pro-react.jsx";

import { lighten } from '@material-ui/core/styles/colorManipulator';

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
    textCenter: {
        textAlign: "center"
    },
    toolbarRoot: {
        paddingLeft: '20px',
        paddingRight: '10px'
    },
    toolbarHighlight: {
        color: warningColor[0],
        background: lighten(warningColor[0], 0.85)
    },
    spacer: {
        flex: '1 1 auto'
    },
    actions: {
        color: grayColor[0]
    },
    toolbarTitle: {
        flex: '0 0 auto'
    },
    tableRoot: {
        width: '100%',
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '20px',
    },
    table: {
        minWidth: '1200px',
        overflowX: 'auto',
    },
    paper: {
        width: '100%',
        marginBottom: '20px',
    },
}

export default styles;
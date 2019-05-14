import {
    container,
    section,
    sectionDark,
    mlAuto,
    mrAuto,
    title,
    blackColor,
    whiteColor,
    roseColor,
    grayColor,
    hexToRgb,
    description,
    cardTitle
} from "assets/jss/material-kit-pro-react.jsx";

const homePageStyle = theme => ({
    mlAuto,
    mrAuto,
    title,
    description,
    features1: {
        textAlign: "center",
        padding: "80px 0"
    },
    features2: {
        padding: "80px 0"
    },
    features3: {
        padding: "80px 0",
        "& $phoneContainer": {
            maxWidth: "220px",
            margin: "0 auto"
        }
    },
    features4: {
        padding: "80px 0",
        "& $phoneContainer": {
            maxWidth: "260px",
            margin: "60px auto 0"
        }
    },
    features5: {
        padding: "80px 0",
        backgroundSize: "cover",
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "& $title": {
            marginBottom: "30px"
        },
        "& $title,& $container": {
            position: "relative",
            zIndex: "2",
            color: whiteColor
        },
        "&:after": {
            background: "rgba(" + hexToRgb(blackColor) + ",0.55)",
            position: "absolute",
            width: "100%",
            height: "100%",
            content: "''",
            zIndex: "0",
            left: "0px",
            top: "0px"
        },
        "& $container": {
            "& $gridContainer:last-child": {
                "& $gridItem": {
                    borderBottom: "0"
                }
            },
            "& $gridItem": {
                border: "1px solid rgba(" + hexToRgb(whiteColor) + ", 0.35)",
                borderTop: "0",
                borderLeft: "0",
                "&:last-child": {
                    borderRight: "0"
                }
            }
        },
        "& $infoArea5": {
            textAlign: "center",
            maxWidth: "310px",
            minHeight: "320px",
            "& h4,& p,& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
                color: whiteColor
            }
        }
    },
    gridContainer: {},
    gridItem: {},
    textCenter: {
        textAlign: "center"
    },
    phoneContainer: {
        "& img": {
            width: "100%"
        }
    },
    infoArea: {
        maxWidth: "none",
        margin: "0 auto",
        padding: "10px 0 0px"
    },
    infoArea5: {},
    container: {
        ...container,
        zIndex: "2",
        position: "relative",
        "& h1, & h4, & h6": {
            color: whiteColor
        }
    },
    title,
    pageHeader: {
        position: "relative",
        height: "100vh",
        maxHeight: "1600px",
        backgroundPosition: "50%",
        backgroundSize: "cover",
        margin: "0",
        padding: "0",
        border: "0",
        display: "flex",
        WebkitBoxAlign: "center",
        MsFlexAlign: "center",
        alignItems: "center",
        "&:before": {
            background: "rgba(" + hexToRgb(blackColor) + ", 0.5)"
        },
        "&:after,&:before": {
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "block",
            left: "0",
            top: "0",
            content: "''"
        }
    },
    pageHeaderCommon: {
        position: "relative",
        height: "100vh",
        maxHeight: "1600px",
        backgroundPosition: "50%",
        backgroundSize: "cover",
        margin: "0",
        padding: "0",
        border: "0",
        display: "flex",
        WebkitBoxAlign: "center",
        MsFlexAlign: "center",
        alignItems: "center",
    },
    cardTitleWhite: {
        ...cardTitle,
        color: whiteColor + "  !important"
    },
    sectionGray: {
        background: grayColor[14]
    },
    section: {
        ...section,
        ...sectionDark,
        position: "relative",
        "& $container": {
            position: "relative",
            zIndex: "2"
        },
        "& $description": {
            color: "rgba(" + hexToRgb(whiteColor) + ", 0.5)"
        },
        "& $cardCategory": {
            color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)"
        },
        "& $title": {
            color: whiteColor,
            marginBottom: "10px"
        },
        "&:after": {
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "block",
            left: "0",
            top: "0",
            content: "''",
            backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.7)"
        }
    },
    pricing1: {
        "&$section:after": {
            backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.8)"
        }
    },
    pricing: {
        padding: "80px 0"
    },
    textCenter: {
        textAlign: "center"
    },
    sectionSpace: {
        height: "70px",
        display: "block"
    },
    cardCategory: {
        ...description
    },
    cardCategoryWhite: {
        color: whiteColor
    },
    cardDescription: {
        ...description
    },
    justifyContentCenter: {
        WebkitBoxPack: "center !important",
        MsFlexPack: "center !important",
        justifyContent: "center !important"
    },
    icon: {
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)",
        margin: "10px auto 0",
        width: "130px",
        height: "130px",
        border: "1px solid " + grayColor[14],
        borderRadius: "50%",
        lineHeight: "174px",
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            fontSize: "55px",
            lineHeight: "55px"
        },
        "& svg": {
            width: "55px",
            height: "55px"
        }
    },
    iconWhite: {
        color: whiteColor
    },
    iconRose: {
        color: roseColor[0]
    },
    marginTop30: {
        marginTop: "30px"
    },
    marginBottom20: {
        marginBottom: "20px"
    },
    marginBottom30: {
        marginBottom: "30px"
    }
});

export default homePageStyle;
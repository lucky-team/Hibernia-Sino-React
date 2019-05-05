import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Pagination from 'components/Pagination/Pagination.jsx';

import enhancedPaginationStyle from "assets/jss/material-kit-pro-react/components/enhancedPaginationStyle.jsx";


const EnhancedPagination = ({ ...props }) => {
    const {
        page,
        rowsPerPage,
        size,
        classes,
        flipPage
    } = props;

    const pageSize = Math.ceil(size / rowsPerPage);
    let pages = [];
    pages.push({
        text: '«',
        onClick: () => flipPage(0)
    });
    pages.push({
        text: '‹',
        onClick: () => flipPage(page > 0 ? page - 1 : 0)
    });
    const pageTemplate = (i) => ({
        active: page === (i - 1),
        onClick: () => flipPage(i-1),
        text: i
    });
    if (pageSize <= 5) {
        for (let i = 1; i <= pageSize; i++) {
            pages.push(pageTemplate(i));
        }
    } else {
        if (page + 1 < 3) {
            for (let i = 1; i <= 5; i++) {
                pages.push(pageTemplate(i));
            }
        } else if (page > pageSize - 3) {
            for (let i = pageSize - 4; i <= pageSize; i++) {
                pages.push(pageTemplate(i));
            }
        } else {
            for (let i = page - 1; i <= page + 3; i++) {
                pages.push(pageTemplate(i));
            }
        }
    };
    pages.push({
        text: '›',
        onClick: () => flipPage(page < pageSize - 1 ? page + 1 : pageSize - 1)
    });
    pages.push({
        text: '»',
        onClick: () => flipPage(pageSize-1)
    });

    return (
        <Pagination
            className={`${classes.textCenter} ${
            classes.justifyContentCenter
            } ${classes.pagination}`}
            pages={pages}
            color="primary"
        />
    );
};

export default withStyles(enhancedPaginationStyle)(EnhancedPagination);
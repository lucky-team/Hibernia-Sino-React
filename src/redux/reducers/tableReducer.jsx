import TableTypes from 'redux/actions/manageClaim/table/TableTypes.jsx';

const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    } else if (b[orderBy] > a[orderBy]) {
        return 1;
    } else {
        return 0;
    }
};

const stableSort = (array, cmp) => {
    if (array !== null && array.length !== 0) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }
    return array;
};

const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

export default (state, action) => {
    const { data, page, rowsPerPage, order, orderBy, selected } = state;
    switch (action.type) {
        case TableTypes.LOAD_DATA:
            return {...state,
                data: action.data
            };
        case TableTypes.SORT_DATA:
            let newData = stableSort(data, getSorting(order,
                orderBy));
            return {...state,
                data: newData,
            };
        case TableTypes.UPDATE_PAGE_DATA:
            let newPageData = data.slice(page * rowsPerPage,
                page * rowsPerPage + rowsPerPage);
            return {...state,
                pageData: newPageData
            };
        case TableTypes.FLIP_PAGE:
            return {...state,
                page: action.page
            }
        case TableTypes.CHANGE_ROWS_PER_PAGE:
            return {...state,
                rowsPerPage: action.rowsPerPage
            }
        case TableTypes.CHANGE_ORDER:
            let newOrder = orderBy === action.orderBy ? (
                order === 'desc' ? 'asc' : 'desc'
            ) : 'desc';
            return {...state,
                order: newOrder,
                orderBy: action.orderBy
            };
        case TableTypes.ADD_SELECTED:
            return {...state,
                selected: selected.concat(action.selectedArray)
            };
        case TableTypes.REMOVE_SELECTED:
            return {...state,
                selected: selected.filter((el) => !action.selectedArray.includes(el))
            };
        default:
            return state;
    }
};
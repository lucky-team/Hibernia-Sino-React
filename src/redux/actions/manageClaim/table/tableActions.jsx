import TableTypes from 'redux/actions/manageClaim/table/TableTypes.jsx';

export const loadData = (data) => ({
    type: TableTypes.LOAD_DATA,
    data: data
});

export const sortData = () => ({
    type: TableTypes.SORT_DATA
});

export const updatePageData = () => ({
    type: TableTypes.UPDATE_PAGE_DATA
});

export const flipPage = (page) => ({
    type: TableTypes.FLIP_PAGE,
    page: page
});

export const changeRowsPerPage = (rowsPerPage) => ({
    type: TableTypes.CHANGE_ROWS_PER_PAGE,
    rowsPerPage: rowsPerPage
});

export const changeOrder = (orderBy) => ({
    type: TableTypes.CHANGE_ORDER,
    orderBy: orderBy
});

export const addSelected = (selectedArray) => ({
    type: TableTypes.ADD_SELECTED,
    selectedArray: selectedArray
});

export const removeSelected = (selectedArray) => ({
    type: TableTypes.REMOVE_SELECTED,
    selectedArray: selectedArray
});

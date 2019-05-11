import React, { useReducer, useEffect } from 'react';
import clsx from 'clsx';
import logger from 'use-reducer-logger';
import tableReducer from 'redux/reducers/tableReducer';
import * as TableActions from 'redux/actions/manageClaim/table/tableActions.jsx';

import { Toolbar, Tooltip, IconButton, Typography, Paper } from '@material-ui/core';
import { Assignment as AssignmentIcon, Done as DoneIcon, EditLocationTwoTone } from '@material-ui/icons';

import EnhancedTable from 'views/Manage/ManageClaimPage/Sections/EnhancedTable.jsx';
import EnhancedPagination from 'components/Pagination/EnhancedPagination.jsx';

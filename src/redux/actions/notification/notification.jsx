import NotificationTypes from 'redux/actions/notification/NotificationTypes.jsx';

export const enqueueSnackbar = notification => ({
    type: NotificationTypes.ENQUEUE_SNACKBAR,
    notification: {
        key: new Date().getTime() + Math.random(),
        ...notification,
    },
});

export const removeSnackbar = key => ({
    type: NotificationTypes.REMOVE_SNACKBAR,
    key,
});

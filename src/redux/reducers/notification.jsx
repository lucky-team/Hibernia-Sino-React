import NotificationTypes from 'redux/actions/notification/NotificationTypes.jsx';

const defaultState = {
    notifications: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case NotificationTypes.ENQUEUE_SNACKBAR:
            return {...state,
                notifications: [
                    ...state.notifications,
                    {
                        ...action.notification,
                    }
                ]
            };
        case NotificationTypes.REMOVE_SNACKBAR:
            return {...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };
        default:
            return state;
    }
}
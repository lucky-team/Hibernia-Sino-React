/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

class Notifier extends Component {
    displayed = [];

    storeDisplayed = (id) => {
        this.displayed = [...this.displayed, id];
    };

    shouldComponentUpdate({ notifications: newSnacks = [] }) {
        const { notifications: currentSnacks } = this.props;
        let notExists = false;
        for (let i = 0; i < newSnacks.length; i += 1) {
            if (notExists) continue;
            notExists = notExists || !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
        }
        return notExists;
    }

    componentDidUpdate() {
        const { notifications = [] } = this.props;

        notifications.forEach((notification) => {
            const t = this.props.t;
            // Do nothing if snackbar is already displayed
            if (this.displayed.includes(notification.key)) return;
            // Display snackbar using notistack
            let msg;
            if (notification.field) {
                msg = i18next.exists(`${notification.field}.${notification.message}`) ?
                    t(`${notification.field}.${notification.message}`) : notification.message;
            } else {
                msg = notification.message;
            }
            this.props.enqueueSnackbar(msg, notification.options);
            // Keep track of snackbars that we've displayed
            this.storeDisplayed(notification.key);
            // Dispatch action to remove snackbar from redux store
            this.props.removeSnackbar(notification.key);
        });
    }
    render() {
        // alert(JSON.stringify(this.props));
        return null;
    }
}

export default withTranslation()(withSnackbar(Notifier));

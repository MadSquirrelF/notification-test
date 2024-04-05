/* eslint-disable indent */
/* eslint-disable default-case */
/* eslint-disable consistent-return */
import { memo, useCallback } from 'react';
import styles from './Notification.module.scss';
import { ReactComponent as SuccessIcon } from '../../assets/icons/success-icon.svg';
import { ReactComponent as ErrorIcon } from '../../assets/icons/error-icon.svg';
import { classNames } from '../../lib/classNames';

export interface NotificationProps {
    status: 'success' | 'error'
    label: string;
    text: string;
    hide: boolean;
    startAnimation: boolean;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
}

export const Notification = memo((props: NotificationProps) => {
    const {
        status, label, text, hide, startAnimation, onMouseLeave, onMouseEnter,
    } = props;

    const renderIcon = useCallback(
        (status: 'success' | 'error') => {
            switch (status) {
                case 'success':
                    return <SuccessIcon className={styles.icon} />;
                case 'error':
                    return <ErrorIcon className={styles.icon} />;
            }
        },
        [],
    );

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={classNames(styles.notification, { [styles.hide]: hide }, [])}
        >
            <div className={classNames(styles.iconContainer, { [styles.error]: status === 'error' }, [])}>
                {renderIcon(status)}
            </div>

            <div className={styles.info}>
                <h3 className={styles.title}>{label}</h3>
                <p className={styles.text}>{text}</p>
                <div
                    className={styles.progressBar}
                >
                    <div className={classNames(styles.progress, { [styles.start]: startAnimation }, [])} />
                </div>
            </div>

        </div>
    );
});

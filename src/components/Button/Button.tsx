/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <button
            type="button"
            className={styles.btn}
            {...otherProps}
        >
            {children}
        </button>
    );
});

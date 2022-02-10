import React from 'react';
import {arrayOf, bool, object, oneOf, string} from 'prop-types';
import styles from '../Button/Button.module.css';
import getClassNames from "../../utils/getClassnames";
import Button from "../Button/Button";

const IconButton = ({children, type, theme, variant, layout, disabled, loading,loadingDirection, loadingStyle, size, prefix, suffix, style, className, ...rest}) => {
    return <Button
        type={type}
        theme={theme}
        variant={variant}
        layout={layout}
        disabled={disabled}
        loading={loading}
        loadingStyle={loadingStyle}
        size={size}
        loadingDirection={loadingDirection}
        style={style}
        className={`${getClassNames(styles, 'icon-btn')} ${className}`}
        {...rest}
    >
        {children}
    </Button>
};

IconButton.propTypes = {
    type: string,
    style: object,
    theme: oneOf(['primary', 'dark', 'light']),
    variant: oneOf(['default', 'text', 'outline']),
    loadingDirection: oneOf(['before', 'after']),
    layout: oneOf(['default', 'rounded', 'pill', 'no-radius']),
    size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    loadingStyle: oneOf(['spin', 'grow']),
    variants: arrayOf(string),
    disabled: bool,
    loading: bool,
};
IconButton.defaultProps = {
    type: "button",
    theme: 'primary',
    loadingDirection:'before',
    style: {},
    prefix: null,
    suffix: null,
    disabled: false,
    loading: false,
    loadingStyle: 'spin',
    size: 'md',
    layout: 'default',
    variant: 'default',
};

export default IconButton;

import React from 'react';
import { arrayOf, bool, object, oneOf, string} from 'prop-types';
import styles from './Button.module.css';
import getClassNames from "../../utils/getClassnames";
import ripple from "../../utils/effectRipple";

const Button = ({className, style, children, type, theme, variant, layout, disabled, loading,loadingDirection, loadingStyle, size, prefix, suffix, ...rest}) => {
    let themeClasses = `btn-${theme}`
    let mouseDown = false
    let layoutClasses = layout !== 'default' ? `btn-${layout}` : ''
    let variantClasses = variant !== 'default' ? `btn-${variant} ${variant === 'text' && 'btn-outline'}` : ''
    let sizes = {
        xs: 'extra-small',
        sm: 'small',
        lg: 'large',
        xl: 'extra-large',
    }
    let loadingClasses = loading && `btn-loading ${loadingDirection==="after" && 'btn-loading-right'} ${loadingStyle === 'grow' && 'btn-loading-grow'}`
    let sizeClasses = size !== "md" ? `btn-${sizes[size]}` : ''

    return <button
        {...rest}
        disabled={disabled}
        type={type}
        style={style}
        className={
            `${getClassNames(
                styles,
                'btn',
                themeClasses,
                layoutClasses,
                disabled ? 'btn-disabled' : '',
                loadingClasses,
                variantClasses,
                sizeClasses
            )} ${className}`
        }
        onMouseDown={(e) => {
            mouseDown = true
            if (rest?.onMouseDown) {
                rest.onMouseDown(e)
            }
            if (loading || disabled) return
            let initial = e.target?.style?.cssText
            if (e.target.nodeName.toLowerCase() === "button" || e.target.closest("button")) {
                let button = e.target
                if (e.target.closest("button")) {
                    button = e.target.closest("button")
                }
                ripple(e, button, false, initial, mouseDown)
            }
        }}
        onFocus={(e) => {
            if (rest?.onFocus) {
                rest.onFocus(e)
            }
            if (loading || disabled) return
            let initial = e.target?.style?.cssText
            if (!mouseDown) {
                if (e.target.nodeName.toLowerCase() === "button" || e.target.closest("button")) {
                    let button = e.target
                    if (e.target.closest("button")) {
                        button = e.target.closest("button")
                    }
                    ripple(e, button, true, initial, mouseDown)
                }
            }
        }}
    >
        {prefix && <div className={getClassNames(styles, 'btn-icon', 'btn-icon-prefix')}>{prefix}</div>}
        {children}
        {suffix && <div className={getClassNames(styles, 'btn-icon', 'btn-icon-suffix')}>{suffix}</div>}
    </button>
};

Button.propTypes = {
    type: string,
    style: object,
    theme: oneOf(['primary', 'dark', 'light']),
    loadingDirection: oneOf(['before', 'after']),
    variant: oneOf(['default', 'text', 'outline']),
    layout: oneOf(['default', 'rounded', 'pill', 'no-radius']),
    size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    loadingStyle: oneOf(['spin', 'grow']),
    variants: arrayOf(string),
    disabled: bool,
    loading: bool,
};
Button.defaultProps = {
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

export default Button;

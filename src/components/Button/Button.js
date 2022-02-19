import React from 'react';
import {arrayOf, bool, object, oneOf, shape, string} from 'prop-types';
import styles from './Button.module.css';
import getClassNames from "../../utils/getClassnames";
import ripple from "../../utils/effectRipple";
import uuid from "../../utils/uuid";
import colorShades from "../../utils/colors/colorShades";
import covertColor from "../../utils/colors/convertColor"

const Button = ({className, style, hideTextOnLoading, children, type, colorScheme, theme, variant, layout, disabled, loading, loadingDirection, loadingStyle, size, prefix, suffix, ...rest}) => {
	let themeClasses = `btn-${theme}`
	let mouseDown = false
	let variantArray = ['default', 'text', 'outline']
	let layoutArray = ['default', 'rounded', 'pill', 'no-radius']
	let layoutClasses = ""
	if (layoutArray.includes(layout)) {
		layoutClasses = layout !== 'default' ? `btn-${layout}` : ''
	}
	let variantClasses = ''
	if (variantArray.includes(variant)) {
		variantClasses = variant !== 'default' ? `btn-${variant} ${variant === 'text' && 'btn-outline'}` : ''
	}
	let sizes = {
		xs: 'extra-small',
		sm: 'small',
		lg: 'large',
		xl: 'extra-large',
	}
	let loadingClasses = loading && `${hideTextOnLoading && 'btn-loading-no-text'} btn-loading ${loadingDirection === "after" && 'btn-loading-right'} ${loadingStyle === 'grow' && 'btn-loading-grow'}`
	let sizeClasses = size !== "md" ? `btn-${sizes[size]}` : ''
	let mainBtnSelector = getClassNames(styles, 'btn')
	
	if (colorScheme) {
		let id = uuid()
		var componentSelector = `${mainBtnSelector.trim()}__${id}`
		let css = `<style data-xcellent-css=${id}>
           .${componentSelector}{
                color: ${colorScheme.color}; 
                --primary: ${colorScheme.background};
               
                ${colorScheme?.backgroundColor
			?
			` --primary-color: ${colorScheme.backgroundColor};
                --primary-hover: ${!colorScheme.background.includes("gradient") ? colorShades(-0.2, covertColor(colorScheme.backgroundColor)) : colorScheme.background};
                --primary-hover-box-shadow:${colorShades(0.65, covertColor(colorScheme.backgroundColor))};`
			:
			`--primary-color:${!colorScheme.background.includes("gradient") ? colorScheme.background : 'var(--light-hover)'};
                --primary-hover: ${!colorScheme.background.includes("gradient") ? colorShades(-0.2, covertColor(colorScheme.background)) : colorScheme.background};
                --primary-hover-box-shadow: ${!colorScheme.background.includes("gradient") ? colorShades(0.65, covertColor(colorScheme.background)) : 'var(--hover-box-shadow)'};`}
           }
</style>`
		document.head.innerHTML += css
	}
	
	return <button
		{...rest}
		disabled={disabled}
		type={type}
		style={style}
		className={
			`${mainBtnSelector} ${componentSelector} ${getClassNames(
				styles,
				!colorScheme ? themeClasses : 'btn-primary',
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
		{(hideTextOnLoading && loading) ? <span>&nbsp;</span> : children}
		{suffix && <div className={getClassNames(styles, 'btn-icon', 'btn-icon-suffix')}>{suffix}</div>}
	</button>
};

Button.propTypes = {
	type: string,
	style: object,
	theme: oneOf(['primary', 'dark', 'light']),
	hideTextOnLoading: bool,
	colorScheme: shape({
		background: string,
		backgroundColor: string,
		color: string,
	}),
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
	loadingDirection: 'before',
	hideTextOnLoading: false,
	style: {},
	colorScheme: null,
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

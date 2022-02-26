import React, {useState} from 'react';
import {arrayOf, bool, object, oneOf, shape, string} from 'prop-types';
import getClassNames from "../../utils/getClassnames";
import styles from "./Alert.module.css";
import uuid from "../../utils/uuid";
import colorShades from "../../utils/colors/colorShades";
import covertColor from "../../utils/colors/convertColor";
import sizeClasses from "../../utils/sizeClasses";

const Alert = ({children, direction, dismiss, size, theme, colorScheme, className, style, variant, layout, onClose, ...rest}) => {
	let themeClasses = `alert-${theme}`
	let variantArray = ['default', 'text', 'outline', 'note']
	let layoutArray = ['default', 'rounded', 'pill', 'no-radius']
	let [show, setShow] = useState(true)
	let layoutClasses = ''
	if (layoutArray.includes(layout)) {
		layoutClasses = layout !== 'default' ? `alert-${layout}` : ''
	}
	let variantClasses = ''
	if (variantArray.includes(variant)) {
		variantClasses = variant !== 'default' ? `alert-${variant} ${direction && direction !== 'left' && `alert-note-${direction}`} ${variant === "note" && 'alert-outline'} ${variant === 'text' && 'alert-outline'}` : ''
	}
	
	let sizeClass = sizeClasses('alert',size)
	let mainBtnSelector = getClassNames(styles, 'alert')
	
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
	
	let onCloseHandler = () => {
		if (onClose) {
			onClose()
			return
		}
		setShow(false)
	}
	return show ? (
		<div
			className={
				`${mainBtnSelector} ${componentSelector} ${getClassNames(
					styles,
					!colorScheme ? themeClasses : 'alert-primary',
					layoutClasses,
					variantClasses,
					sizeClass
				)} ${className}`
			}
			{...rest}
		>
			{dismiss &&
			<button onClick={onCloseHandler} type="button" className={getClassNames(styles, 'close')}>&times;</button>}
			{children}
		</div>
	) : "";
};

Alert.propTypes = {
	style: object,
	dismiss: bool,
	direction: oneOf(['top', 'bottom', 'right', 'left']),
	theme: oneOf(['primary', 'dark', 'light']),
	colorScheme: shape({
		background: string,
		backgroundColor: string,
		color: string,
	}),
	className: string,
	variant: oneOf(['default', 'text', 'outline', 'note']),
	layout: oneOf(['default', 'rounded', 'pill', 'no-radius']),
	size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	variants: arrayOf(string),
};
Alert.defaultProps = {
	theme: 'primary',
	style: {},
	colorScheme: null,
	direction: 'left',
	className: '',
	size: 'md',
	dismiss: false,
	layout: 'default',
	variant: 'default',
};

export default Alert;

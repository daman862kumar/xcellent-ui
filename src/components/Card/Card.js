import React from 'react';
import {oneOf} from 'prop-types';
import classes from "./Card.module.css"
import getClassNames from "../../utils/getClassnames";

const Card = ({children, layout,theme,variant,direction,className,...rest}) => {
	let themeClasses = theme? `bg-${theme}`:''
	let layoutArray = ["default", "extended", "rounded", "no-radius"]
	let variantArray = ["default", "fill", "outline","fill-with-border"]
	let layoutClasses = ''
	if (layoutArray.includes(layout)) {
		layoutClasses = layout !== 'default' ? `card-${layout}` : ''
	}
	let variantClasses = ''
	if (variantArray.includes(variant)) {
		variantClasses = variant !== 'default' ? `card-${variant}` : ''
	}
	return (
		<div {...rest} className={`${getClassNames(classes, 'card' ,direction==='row' && 'card-row', layoutClasses,themeClasses,variantClasses)} ${className}`}>
			{children}
		</div>
	);
};

Card.propTypes = {
	direction: oneOf(['row', 'column', 'light']),
	theme: oneOf(['primary', 'dark', 'light']),
	layout: oneOf(["default", "extended", "rounded", "no-radius"]),
	variant: oneOf(["default", "fill", "outline","fill-with-border"]),
};

Card.defaultProps = {
	theme: '',
	layout: "default",
	direction:'column',
	variant: "default",
};
export default Card;
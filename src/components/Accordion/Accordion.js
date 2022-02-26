import React from 'react';
import PropTypes, {oneOf, string} from 'prop-types';
import classes from "./Accordion.module.css"
import getClassNames from "../../utils/getClassnames";
import sizeClasses from "../../utils/sizeClasses";

const Accordion = ({children, theme, variant, size, layout, indicatorDirection}) => {
	let variantArray = ['default', 'separate', 'bordered', 'outlined', 'attached']
	let layoutArray = ['default', 'rounded', 'no-radius', 'pill']
	let layoutClasses = ""
	if (layoutArray.includes(layout)) {
		layoutClasses = layout !== 'default' ? `accordion-${layout}` : ''
	}
	let variantClasses = ''
	if (variantArray.includes(variant)) {
		variantClasses = variant !== 'default' ? `accordion-${variant}` : ''
	}
	
	let sizeClass = sizeClasses('accordion', size)
	const childrenWithProps = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {theme});
		}
		return child;
	});
	return (
		<div
			className={getClassNames(classes, 'accordion-wrap', indicatorDirection === "start" && 'accordion-indicator-left', layoutClasses, variantClasses, sizeClass)}>
			{childrenWithProps}
		</div>
	);
};

Accordion.propTypes = {
	theme: string,
	variant: oneOf(['default', 'separate', 'bordered', 'outlined', 'attached']),
	layout: oneOf(['default', 'rounded', 'no-radius', 'pill']),
	indicatorDirection: oneOf(['start', 'end']),
	size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
Accordion.defaultProps = {
	theme: "",
	variant: 'default',
	layout: 'default',
	size: 'md',
	indicatorDirection: 'end'
};

export default Accordion;
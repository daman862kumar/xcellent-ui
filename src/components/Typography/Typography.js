import React, {createElement} from 'react';
import {oneOf, string} from 'prop-types';
import getClassNames from "../../utils/getClassnames";
import classes from "./Typography.module.css"

const Typography = ({children, as, style, className, variant, weight,fontSize,fontWeight, ...rest}) => {
	let element = as?.toString()?.trim()?.toLowerCase();
	let variantArray = ['text', 'subtitle', 'subheading', 'caption', 'description', 'code']
	let asElement = ['span', 'p', 'div', 'i', 'b', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
	let fontWeightArray = ['medium', 'light', 'bold']
	let variantClasses = ''
	if (variantArray.includes(variant)) {
		variantClasses = variant !== 'text' ? `typography-${variant}` : ''
	}
	let weightClasses = ''
	if (fontWeightArray.includes(weight)) {
		weightClasses = `${weight !== "medium" ? `typography-${weight}` : ''}`
	}
	if (!asElement.includes(element)) {
		element = "p"
	}
	
	let styles={...style,fontSize:fontSize}
	if (fontSize){
		styles['fontSize']=fontSize
	}
	if (fontWeight){
		styles['fontWeight']=fontWeight
	}
	return createElement(element, {
		style: {...styles},
		className: `${getClassNames(classes, 'typography', variantClasses, weightClasses)} ${className}`,
		...rest,
		children: children
	})
};

Typography.propTypes = {
	as: oneOf(['span', 'p', 'div', 'i', 'b', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	weight: oneOf(['medium', 'light', 'bold']),
	variant: oneOf(['text', 'subtitle', 'subheading', 'caption', 'description', 'code']),
};

Typography.defaultProps = {
	as: "p",
	className: '',
	variant: 'text',
	weight: 'medium',
	fontSize:''
};

export default Typography;
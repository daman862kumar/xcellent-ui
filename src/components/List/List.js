import React from 'react';
import PropTypes, {oneOf, string} from 'prop-types';
import classes from "./List.module.css"
import getClassNames from "../../utils/getClassnames";
import sizeClasses from "../../utils/sizeClasses";

const List = ({children, theme, layout, variant,direction,size}) => {
	let variantArray = ['default', 'striped', 'separate', 'borderless','bordered','outlined']
	let layoutArray = ['default', 'rounded', 'no-radius']
	let directionClasses=direction!=='column'?`list-group-${direction}`:''
	let layoutClasses = ""
	if (layoutArray.includes(layout)) {
		layoutClasses = layout !== 'default' ? `list-${layout}` : ''
	}
	let variantClasses = ''
	if (variantArray.includes(variant)) {
		variantClasses = variant !== 'default' ? `list-${variant}` : ''
	}
	let sizeClass = sizeClasses('list',size)
	const childrenWithProps = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {theme,...child.props});
		}
		return child;
	});
	return (
		<ul className={getClassNames(classes, 'list-group', layoutClasses, variantClasses,directionClasses,sizeClass)}>
			{childrenWithProps}
		</ul>
	);
};

List.propTypes = {
	theme: string,
	variant: oneOf(['default', 'striped', 'separate', 'borderless','bordered','outlined']),
	layout: oneOf(['default', 'rounded', 'no-radius']),
	direction: oneOf(['row', 'column']),
	size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

List.defaultProps = {
	theme: "",
	variant: 'default',
	layout: 'default',
	direction: 'column',
	size: 'md',
};

export default List;
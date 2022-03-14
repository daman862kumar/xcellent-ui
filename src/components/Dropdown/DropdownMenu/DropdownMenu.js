import React, {useState} from 'react';
import PropTypes, {bool, object, string} from 'prop-types';
import getClassNames from "../../../utils/getClassnames";
import classes from "../Dropdown.module.css";

const DropdownMenu = ({children, className, style, position, closeHandler, autoClose, ...rest}) => {
	const childrenWithProps = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {autoClose, closeHandler});
		}
		return child;
	});
	return (
		<div
			className={
				`${getClassNames(classes, "dropdown-menu", position === "after" ? 'dropdown-menu-right' : '')} ${className}`
			}
			style={style}
		>
			<div className={getClassNames(classes, "dropdown-wrap")}>
				{childrenWithProps}
			</div>
		</div>
	);
};
DropdownMenu.propTypes = {
	className: string,
	style: object,
	position: string,
	autoClose: bool
};
DropdownMenu.defaultProps = {
	className: '',
	style: {},
	position: 'before',
	autoClose: false
};

export default DropdownMenu;
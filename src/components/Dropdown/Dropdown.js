import React, {useState} from 'react';
import {array, bool, oneOf, string, object} from 'prop-types';
import sizeClasses from "../../utils/sizeClasses";
import classes from './Dropdown.module.css'
import getClassNames from "../../utils/getClassnames";

const Dropdown = ({autoClose, children, className, style, size, position, fullwidth, layout, variant}) => {
	let [open, setOpen] = useState(false)
	let sizeClassNames = sizeClasses('dropdown', size)
	let layoutArray = ['rounded', 'default', 'no-radius', 'floating']
	let variantArray = ['drawer', 'fluid',]
	let layoutClasses = ""
	if (layoutArray.includes(layout)) {
		layoutClasses = layout !== 'default' ? `dropdown-${layout}` : ''
	}
	let variantClasses = ''
	if (variantArray.includes(variant)) {
		variantClasses = variant !== 'default' ? `dropdown-${variant}` : ''
	}
	
	let sizeClass =  sizeClasses('dropdown',size)
	let openDropdown = () => {
		setOpen(!open)
	}
	
	let handleCloseMenu = (e) => {
		if (e.currentTarget === e.target) {
			setOpen(false)
		}
	}
	const childrenWithProps = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				autoClose, toggleHandler: openDropdown, closeHandler: () => {
					setOpen(false)
				}
			});
		}
		return child;
	});
	
	return (
		<div style={style}
			 onClick={(e) => {
				 handleCloseMenu(e)
			 }}
			 className={`${getClassNames(
				 classes,
				 'dropdown', open ? 'dropdown-open' : '',
				 sizeClassNames,
				 fullwidth && 'dropdown-full',
				 position !== 'bottom' && `drop-${position}`,
				 layoutClasses,
				 variantClasses,
				 sizeClass
			 )} ${className}`}>
			{childrenWithProps}
		</div>
	);
};

Dropdown.propTypes = {
	style: object,
	className: string,
	multiple: bool,
	autoClose: bool,
	fullwidth: bool,
	variants: array,
	name: string.isRequired,
	position: oneOf(['bottom', 'top', 'right', 'left']),
	layout: oneOf(['rounded', 'default', 'no-radius', 'floating']),
	size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	variant: oneOf(['drawer', 'fluid',]),
	disabled: bool,
	value: string,
	placeholder: string,
	defaultValue: string,
	id: string,
	menuClass: string,
	menuStyle: object,
	dropdownButtonStyle: object,
	dropdownButtonClassName: string
	
};
Dropdown.defaultProps = {
	style: {},
	menuClass: "",
	menuStyle: {},
	position: 'bottom',
	autoClose: false,
	className: '',
	dropdownButtonStyle: {},
	fullwidth: false,
	dropdownButtonClassName: "",
	multiple: false,
	variants: [],
	name: '',
	size: "md",
	variant: "default",
	layout: 'default',
	disabled: false,
	value: "",
	placeholder: "",
	defaultValue: "",
	id: "",
}

export default Dropdown;
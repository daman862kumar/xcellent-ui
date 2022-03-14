import React from 'react';
import {object, string} from 'prop-types';
import getClassNames from "../../../utils/getClassnames";
import classes from "../Dropdown.module.css";

const MenuItem = ({onSelect, className, style, children,closeHandler,autoClose, ...rest}) => {
	return (
		<a style={style} onClick={(e)=>{
			onSelect(e);
			if (autoClose){
				closeHandler?.()
			}
			if (rest?.onClick){
				rest?.onClick(e)
			}
		}} className={`${getClassNames(classes, "dropdown-item")} ${className}`} {...rest}>
			{children}
		</a>
	);
};
MenuItem.propTypes = {
	className: string,
	style: object,
};
MenuItem.defaultProps = {
	className: '',
	style: {},
	onSelect:()=>{}
};

export default MenuItem;
import React from 'react';
import PropTypes, {object, string} from 'prop-types';
import getClassNames from "../../../utils/getClassnames";
import classes from "../Dropdown.module.css";
import MenuItem from "../MenuItem/MenuItem";

const DropdownToggle = ({style,className,children,toggleHandler}) => {
	return (
		<button style={style} onClick={toggleHandler} type="button"
				className={`
                    ${getClassNames(classes, 'dropdown-btn', 'dropdown-toggle')} ${className}`}
		>
			{children}
		</button>
	);
};
DropdownToggle.propTypes = {
	className:string,
	style:object,
};
DropdownToggle.defaultProps = {
	style:{},
	className:''
};

export default DropdownToggle;
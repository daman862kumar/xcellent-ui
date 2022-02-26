import React from 'react';
import PropTypes from 'prop-types';
import classes from "../List.module.css"
import bgClasses from "../../bg.module.css"
import getClassNames from "../../../utils/getClassnames";

const ListItem = ({children, theme,prefix,suffix}) => {
	let themeClasses = theme ? `bg-${theme}` : ''
	return (
		<li className={`${getClassNames(classes, 'list-group-item')} ${getClassNames(bgClasses, themeClasses)}`}>
			{prefix && <div className={getClassNames(classes, 'list-icon-left')}>{prefix}</div>}
			{children}
			{suffix && <div className={getClassNames(classes, 'list-icon-right')}>{suffix}</div>}
		</li>
	);
};

ListItem.defaultProps = {
	prefix: null,
	suffix: null,
};

export default ListItem;
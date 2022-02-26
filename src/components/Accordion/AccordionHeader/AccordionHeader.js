import React from 'react';
import PropTypes from 'prop-types';
import classes from "../Accordion.module.css"
import bgClasses from "../../bg.module.css"
import getClassNames from "../../../utils/getClassnames";
const AccordionHeader = ({children,theme,onToggle,prefix,suffix}) => {
	let themeClasses = theme ? `bg-${theme}` : ''
	return (
		<div onClick={onToggle} className={`${getClassNames(classes,'accordion-header')} ${getClassNames(bgClasses,themeClasses)}`}>
			<a className={getClassNames(classes,'accordion-link')}>
				{prefix && <div className={getClassNames(classes, 'accordion-icon-left')}>{prefix}</div>}
				{children}
				{suffix && <div className={getClassNames(classes, 'accordion-icon-left')}>{suffix}</div>}
			</a>
		</div>
	);
};

AccordionHeader.propTypes = {
	
};

export default AccordionHeader;
import React from 'react';
import PropTypes from 'prop-types';
import getClassNames from "../../../utils/getClassnames";
import classes from "../Card.module.css"
const CardContent = ({children}) => {
	return (
		<div className={getClassNames(classes,'card-body')}>
			{children}
		</div>
	);
};

CardContent.propTypes = {
	
};

export default CardContent;
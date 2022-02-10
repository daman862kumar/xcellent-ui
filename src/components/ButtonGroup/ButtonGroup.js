import React from 'react';
import {oneOf} from 'prop-types';
import styles from './ButtonGroup.module.css';
import getClassNames from "../../utils/getClassnames";

const ButtonGroup = ({children, size,direction}) => {
    let sizes = {
        xs: 'extra-small',
        sm: 'small',
        lg: 'large',
        xl: 'extra-large',
    }
    let sizeClasses = size !== "md" ? `btn-group-${sizes[size]}` : ''
    console.log("sizeClasses",sizeClasses)
    let directionClasses = direction  !== "horizontal" ? `btn-group-${direction}` : 'btn-group'
    return (
        <div className={getClassNames(styles, sizeClasses,directionClasses)}>
            {children}
        </div>
    );
};

ButtonGroup.propTypes = {
    size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    direction: oneOf(['vertical', 'horizontal']),
};

ButtonGroup.defaultProps = {
    size: 'md',
    direction: 'horizontal'
};

export default ButtonGroup;

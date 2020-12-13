import React from 'react';
import classnames from 'classnames';
import './button.scss';

export const Button = ( props ) => {
    
    /* If there is no second class in ternary operator ( ? : ) then use AND operator */
    const buttonClasses = classnames( 'view-generic-button', props.className,
        props.size && `view-generic-button--${props.size}`,
        props.color && `view-generic-button--${props.color}`,
        props.disabled && 'view-generic-button--disabled',
    );

    const labelClasses = classnames( 'view-generic-button__label', props.labelClass,
        props.size && `view-generic-button__label--${props.size}`,
        props.labelColor && `view-generic-button__label--${props.labelColor}`
    );

    return (
        <button
            className={ buttonClasses }
        >
        {
            <div className={ 'xx'} >
                <span className={labelClasses}>{props.value}</span>
            </div>
        }
         </button>
    );
};
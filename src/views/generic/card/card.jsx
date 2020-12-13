import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Card = ( props ) => {
    const cardClasses = classnames( 'view-card', props.className,
        props.withoutPadding ? 'view-card view-card--without-padding' : null,
        props.withoutMargin? 'view-card view-card--without-margin' : null
    );

    return (
        <div className={cardClasses} style={{ width: props.widthInPercent ? `${props.widthInPercent}%` : 'auto' }}>
            {props.children}
        </div>
    );
};

Card.defaultProps = {
    withoutPadding: false,
    withoutMargin: false,
    widthInPercent: 100
};

Card.propTypes = {
    withoutPadding: PropTypes.bool,
    withoutMargin: PropTypes.bool,
    widthInPercent: PropTypes.number
};

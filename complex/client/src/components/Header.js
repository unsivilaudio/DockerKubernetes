import React from 'react';
import { Link } from 'react-router-dom';

import classes from 'styles/components/Header.module.scss';

const Header = props => {
    return (
        <div className={classes.Header}>
            <Link to='/'>
                <p>a needlessly complex fibonacci calculator</p>
            </Link>
            <span className={classes.FibImg}>
                <span className={classes.Img} />
            </span>
        </div>
    );
};

export default Header;

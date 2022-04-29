import React from 'react';

import classes from 'styles/containers/Page.module.scss';

const Page = props => {
    return <div className={classes.Page}>{props.children}</div>;
};

export default Page;

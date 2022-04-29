import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import Fib from 'components/Fib';
import Page from 'containers/Page';
import classes from 'styles/components/App.module.scss';

const App = props => {
    return (
        <div className={classes.App}>
            <Header />
            <Page>
                <Routes>
                    <Route path='/' element={<Fib />} />
                </Routes>
            </Page>
        </div>
    );
};

export default App;

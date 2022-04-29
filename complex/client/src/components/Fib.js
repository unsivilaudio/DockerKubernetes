import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import classes from 'styles/components/Fib.module.scss';

const Fib = props => {
    const [seenIndexes, setSeenIndexes] = useState([10, 5, 7]);
    const [index, setIndex] = useState(null);
    const [values, setValues] = useState({ 7: 21, 10: 89, 5: 8 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchValues = () => axios.get('/api/values/currrent');
        fetchValues()
            .then(res => setValues(res.data))
            .catch(err => console.log(err.message));

        const fetchIndexes = () => axios.get('/api/values/all');
        fetchIndexes()
            .then(res => setSeenIndexes(res.data))
            .catch(err => console.log(err.message));
    }, []);

    function handleChangeIndex(e) {
        setIndex(Number(e.target.value));
    }

    function handleSubmitIndex() {
        if (isNaN(index)) return;
        setLoading(true);
        axios
            .post('/api/values', {
                index,
            })
            .then(_ => {
                setSeenIndexes(st => [...st, index]);
                setIndex(null);
            })
            .catch(err => console.log(err.message))
            .finally(() => {
                setLoading(false);
            });
    }

    const allIndices = seenIndexes.map((val, i) => {
        return (
            <span key={`${i}-${val}`} className={classes.Item}>
                {val}
            </span>
        );
    });

    const allValues = Object.entries(values).map((entry, i) => {
        return (
            <li className={classes.Item} key={`${i}-${entry[1]}`}>
                For index {entry[0]} I calculated {entry[1]}
            </li>
        );
    });

    return (
        <div className={classes.Fib}>
            <div className={classes.Form}>
                <div className={classes.FormGroup}>
                    <label htmlFor='index'>Enter your index:</label>
                    <Input
                        type='number'
                        submitted={handleSubmitIndex}
                        handleChange={handleChangeIndex}
                        value={index || ''}
                    />
                </div>
                <Button
                    label='Submit'
                    onClick={handleSubmitIndex}
                    disabled={loading}
                />
            </div>
            {loading && <h3>Loading...</h3>}
            <div className={classes.Indices}>
                <div className={classes.Title}>Indexes I have Seen:</div>
                <div className={classes.Numbers}>{allIndices}</div>
            </div>
            <div className={classes.Values}>
                <div className={classes.Title}>Calculated Values:</div>
                <ul className={classes.List}>{allValues}</ul>
            </div>
        </div>
    );
};

export default Fib;
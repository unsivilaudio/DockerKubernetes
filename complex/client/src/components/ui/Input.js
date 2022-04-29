import React from 'react';

import classes from 'styles/components/ui/Input.module.scss';

const Input = ({
    submitted,
    name,
    type,
    value,
    handleChange,
    placeholder,
    disabled,
}) => {
    function onEnterSubmit(e) {
        if (e.key === 'Enter' && submitted) {
            submitted();
        }
    }

    return (
        <input
            className={classes.Input}
            name={name}
            type={type || 'text'}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            onKeyPress={onEnterSubmit}
            disabled={disabled}
        />
    );
};

export default Input;

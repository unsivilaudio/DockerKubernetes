import classes from 'styles/components/ui/Button.module.scss';

const Button = ({ theme, label, onClick, disabled }) => {
    const btnClasses = [classes.Button];

    switch (theme) {
        case 'primary':
            btnClasses.push(classes.Primary);
            break;
        case 'secondary':
            btnClasses.push(classes.Secondary);
            break;
        case 'invert':
            btnClasses.push(classes.Invert);
            break;
        case 'danger':
            btnClasses.push(classes.Danger);
            break;
        default:
            btnClasses.push(classes.Primary);
            break;
    }

    return (
        <button
            className={btnClasses.join(' ')}
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    );
};

export default Button;

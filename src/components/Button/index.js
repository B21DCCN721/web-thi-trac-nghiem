import PropTypes from "prop-types";
function Button( {children, type="button", disabled = false, sx = '', onClick = () => {}} ) {
    return ( 
        <button className={`rounded bg-red-600 px-6 py-2 m-2 text-white hover:bg-red-500 ${sx}`} type={type} disabled={disabled}  onClick={onClick}>
            {children}
        </button>
     );
}

Button.propTypes = {
    children: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    sx: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button;
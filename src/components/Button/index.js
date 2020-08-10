import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

const Button = ({ label, color, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={color}>{label}</button>
);

Button.defaultProps = {
  color: 'success'
};

Button.propTypes = {
  label: PropTypes.string,
  color: PropTypes.oneOf(['success', 'error']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

/**
 * Botão customizável com escala de cores própria do tema (`success` | `error`).
 */
const Button = ({ label, color, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={color}>{label}</button>
);

Button.defaultProps = {
  color: 'success'
};

Button.propTypes = {
  /** Texto exibido dentro do botão */
  label: PropTypes.string,
  /** Cor do botão, define o estilo visual */
  color: PropTypes.oneOf(['success', 'error']),
  /** Desabilita o botão e bloqueia cliques */
  disabled: PropTypes.bool,
  /** Função disparada ao clicar no botão */
  onClick: PropTypes.func
};

export default Button;
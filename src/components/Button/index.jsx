import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

/**
 * Botão customizável com escala de cores própria do tema (`success` | `error`).
 */
const Button = ({ label, color, size, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={`${color} ${size}`}>{label}</button>
);

Button.defaultProps = {
  color: 'success',
  size: 'medium'
};

Button.propTypes = {
  /** Texto exibido dentro do botão */
  label: PropTypes.string,
  /** Cor do botão, define o estilo visual */
  color: PropTypes.oneOf(['success', 'error']),
  /** Tamanho do botão */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Desabilita o botão e bloqueia cliques */
  disabled: PropTypes.bool,
  /** Função disparada ao clicar no botão */
  onClick: PropTypes.func
};

export default Button;
# Components Button

Este componente tem por objetivo fornecer um `Button` customizável.

O mesmo é altamente customizável tendo sua escala de cores padrão fornecida pelo theme utilizado, sendo elas: `success | error`.

O componente por sua vez, aceita as seguintes props:

  * **label:** Define o nome ao qual será mostrado no `Button`

  * **color:** Define a cor do `Button`, podendo assumir os seguintes valores:  `success | error`, sendo o valor default `success`

  * **disable:** Define se o botão está ou não desabilitado, por default `false`
  
  * **onClick:** Define uma função fornecida pelo desenvolvedor para ser disparada ao clicar no botão.

```javascript
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
```

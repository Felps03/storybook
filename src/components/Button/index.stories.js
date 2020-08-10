import React from 'react';

import documents from './notes.md'

import { object, text, boolean, select } from '@storybook/addon-knobs';
import Button from '.';


export default {
  title: 'Componentes|Button',
  parameters: {
    notes: documents,
  },
};

export const Example = () => {
  return (
    <Button
      color={select('color', colorOptions, 'success')}
      onClick={object('onClick', onClickTest)}
      disabled={boolean('disabled', false)}
      label={text('label', 'sucesso')}/>
  );
};


const onClickTest = () => {
  console.log(documents)
  alert('You clicked me!');
};

const colorOptions = {
  success: 'success',
  error: 'error',
};
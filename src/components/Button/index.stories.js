import Button from '.';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['success', 'error'],
    },
    onClick: { action: 'clicked' },
  },
  args: {
    label: 'Sucesso',
    color: 'success',
    disabled: false,
  },
};

export const Default = {};

export const Error = {
  args: {
    label: 'Erro',
    color: 'error',
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

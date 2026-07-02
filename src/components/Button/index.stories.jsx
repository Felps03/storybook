import { expect, fn, userEvent, within } from 'storybook/test';
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
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
  args: {
    label: 'Sucesso',
    color: 'success',
    size: 'medium',
    disabled: false,
    onClick: fn(),
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

export const Sizes = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button {...args} size="small" label="Small" />
      <Button {...args} size="medium" label="Medium" />
      <Button {...args} size="large" label="Large" />
    </div>
  ),
};

export const ClickInteraction = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { WeatherIcon } from './WeatherIcon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Atoms/WeatherIcon',
  component: WeatherIcon,
  parameters: {
    shortForecast: { control: 'text' },
    size: { control: 'number' },
  },
} satisfies Meta<typeof WeatherIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sunny: Story = {
    args: {
    shortForecast: 'sunny',
  },
};

export const SunnySmall: Story = {
  args: {
    shortForecast: 'sunny',
    size: 25,
  },
};

export const PartlyCloudy: Story = {
  args: {
    shortForecast: 'partly cloudy',
  },
};

export const Thunderstorm: Story = {
  args: {
    shortForecast: 'thunderstorms',
  },
};

export const Rain: Story = {
  args: {
    shortForecast: 'rain showers',
  },
};

export const Snow: Story = {
  args: {
    shortForecast: 'snow',
  },
};

export const Fog: Story = {
  args: {
    shortForecast: 'fog',
  },
};

export const Windy: Story = {
  args: {
    shortForecast: 'windy',
  },
};

export const NoMatch: Story = {
  args: {
    shortForecast: 'alien invasion',
  },
};

export const NoMatchSmall: Story = {
  args: {
    shortForecast: 'alien invasion',
    size: 25,
  },
};

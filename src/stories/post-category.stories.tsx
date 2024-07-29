import type { Meta, StoryObj } from '@storybook/react';

import PostCategory from './post-category';

const meta = {
  component: PostCategory,
} satisfies Meta<typeof PostCategory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Why Rachel Reeves wants everyone to know that the Tories left the Treasury brassic',
    createdAt: '2023-07-28T12:34:56Z',
    author: 'Andrew Rawnsley',
    paragraph:
      'The chancellor is not just preparing the ground for some tax rises. She’s also warning her party that there will be extremely difficult decisions about spending',
    view: 123,
    commentCount: 10,
    imageUrl: 'https://via.placeholder.com/150',
  },
};

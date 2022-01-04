import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './index';

describe('<Table />', () => {
  it('render Table with dumi', () => {
    const msg = 'dumi';

    render(<Table />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});

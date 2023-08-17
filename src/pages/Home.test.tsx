import { screen, render, within } from '@testing-library/react';
import Home from './Home';

describe('home', () => {
  test('should contain an accessible header', () => {
    render(<Home />);

    const header = screen.getByRole('banner');
    const heading = within(header).getByRole('heading');

    expect(heading).toHaveTextContent(/^Broccoli & Co\.$/);
  });

  test('should contain an accessible footer', () => {
    render(<Home />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toHaveTextContent(
      /^Made with ❤ in Melbourne\.© 2016 Broccoli & Co\. All rights reserved\.$/
    );
  });
});

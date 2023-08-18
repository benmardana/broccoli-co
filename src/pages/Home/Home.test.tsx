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

  test('should contain an accessible main', () => {
    render(<Home />);

    const main = screen.getByRole('main');
    const heading = within(main).getByRole('heading', { level: 2 });
    const subheading = within(main).getByRole('heading', { level: 3 });
    const cta = within(main).getByRole('button');

    expect(heading).toHaveTextContent(/^A better way to enjoy every day\.$/);
    expect(subheading).toHaveTextContent(
      /^Be the first to know when we launch\.$/
    );
    expect(cta).toHaveTextContent(/^Request an invite$/);
  });
});

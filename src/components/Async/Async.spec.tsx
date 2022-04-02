import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Async } from '.';

describe('Async component', () => {
  it('renders correctly', async () => {
    render(<Async />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();

    // Option 1 w/ findBy
    // expect(await screen.findByText('Button')).toBeInTheDocument();

    // Option 2 w/ waitFor
    await waitFor(() => expect(screen.getByText('Button')).toBeInTheDocument());

    // Example: checking if element has been removed
    // await waitForElementToBeRemoved(screen.queryByText('Button'));
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { SubscribeButton } from '.';

jest.mock('next-auth/react');
jest.mock('next/router');

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' });

    render(<SubscribeButton />);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    const signInMocked = jest.mocked(signIn);

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects user to posts page when already authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
        activeSubscription: 'fake-active-subscription',
      },
      status: 'authenticated',
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});

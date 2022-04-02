import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { SignInButton } from '.';

jest.mock('next-auth/react');

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' });

    render(<SignInButton />);

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
      },
      status: 'authenticated',
    });

    render(<SignInButton />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('redirects user to sign in when not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    const signInMocked = jest.mocked(signIn);

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' });

    render(<SignInButton />);

    const signInButton = screen.getByText('Sign in with GitHub');

    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects user to sign out when authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);
    const signOutMocked = jest.mocked(signOut);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expires: 'fake-expires',
      },
      status: 'authenticated',
    });

    render(<SignInButton />);

    const signOutButton = screen.getByTitle('closeIcon');

    fireEvent.click(signOutButton);

    expect(signOutMocked).toHaveBeenCalled();
  });
});

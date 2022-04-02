import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/react';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic');
jest.mock('next-auth/react');

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  body: '<p>Post content</p>',
  updatedAt: '10 de Abril',
};

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
  });

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = jest.mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);

    const getServerSidePropsResponse = await getServerSideProps({
      params: { slug: 'my-new-post' },
    } as any);

    expect(getServerSidePropsResponse).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      })
    );
  });

  it('loads initial data', async () => {
    const getSessionMocked = jest.mocked(getSession);
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {
              type: 'heading',
              text: 'My new post',
            },
          ],
          content: [
            {
              type: 'paragraph',
              text: 'Post content',
            },
          ],
        },
        last_publication_date: '04-01-2022',
      }),
    } as any);

    const getServerSidePropsResponse = await getServerSideProps({
      params: {
        slug: 'my-new-post',
      },
    } as any);

    expect(getServerSidePropsResponse).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            body: '<p>Post content</p>',
            updatedAt: '01 de abril de 2022',
          },
        },
      })
    );
  });
});

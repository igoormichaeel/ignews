import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PostPreview, {
  getStaticPaths,
  getStaticProps,
} from '../../pages/posts/preview/[slug]';

import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic');
jest.mock('next-auth/react');
jest.mock('next/router');

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  body: '<p>Post content</p>',
  updatedAt: '10 de Abril',
};

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'loading',
    });

    render(<PostPreview post={post} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('redirects user to full post if subscribed', async () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires',
      },
    } as any);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<PostPreview post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

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

    const getStaticPropsResponse = await getStaticProps({
      params: {
        slug: 'my-new-post',
      },
    } as any);

    expect(getStaticPropsResponse).toEqual(
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

  it('loads initial paths', () => {
    const getStaticPathsResponse = getStaticPaths({} as any);

    expect(getStaticPathsResponse).toEqual(
      expect.objectContaining({
        paths: [],
      })
    );
  });
});

import { render, screen } from '@testing-library/react';

import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

jest.mock('../../services/prismic');
jest.mock('next-auth/react', () => {
  return {
    useSession: () => [null, false],
  };
});

const posts = [
  {
    slug: 'my-new-post',
    title: 'My new post',
    excerpt: 'Post excerpt',
    updatedAt: '10 de Abril',
  },
];

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
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
                  text: 'Post excerpt',
                },
              ],
            },
            last_publication_date: '04-01-2022',
          },
        ],
      }),
    } as any);

    const getStaticPropsResponse = await getStaticProps({});

    expect(getStaticPropsResponse).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My new post',
              excerpt: 'Post excerpt',
              updatedAt: '01 de abril de 2022',
            },
          ],
        },
      })
    );
  });
});

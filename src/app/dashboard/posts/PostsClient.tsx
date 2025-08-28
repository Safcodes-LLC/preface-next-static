'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LocalDate from '@/components/LocalDate';
import PaginationWrapper from '@/components/PaginationWrapper';
import { getAllPosts } from '@/data/posts';
import { Badge } from '@/shared/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';


interface Post {
    id: string;
    _id: string;
    featuredImage: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    icon?: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    title: string;
    name: string;
    handle: string;
    categories: Array<{
      id: string;
      name: string;
      handle: string;
      color: string;
    }>;
  }

  
function PostsContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  
  // Fetch posts data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts.slice(0, 10));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsPostsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will be redirected by the effect
  }

  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 ps-3 pe-4 text-left text-sm font-semibold sm:ps-0 rtl:text-right">
                  Post
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold rtl:text-right">
                  Stats
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold rtl:text-right">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold rtl:text-right">
                  Published
                </th>
                <th scope="col" className="relative py-3.5 ps-3 pe-4 sm:pe-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map((post:any) => (
                <tr key={post.id}>
                  <td className="whitespace-nowrap py-4 ps-3 pe-4 text-sm sm:ps-0">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          className="h-10 w-10 rounded-full object-cover"
                          src={post.featuredImage}
                          alt={post.title}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                        <div className="text-gray-500 dark:text-gray-400">{post.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="text-gray-900 dark:text-white">{post.views} views</div>
                    <div>{post.comments} comments</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <Badge color={post.published ? 'green' : 'yellow'}>
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <LocalDate date={post.publishedAt} />
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                      Edit<span className="sr-only">, {post.title}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PaginationWrapper className="mt-16" />
    </div>
  );
}

export default function PostsClient() {
  return <PostsContent />;
}

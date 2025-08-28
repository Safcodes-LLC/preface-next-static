'use client';

import dynamic from 'next/dynamic';

const PostsClient = dynamic(() => import('./PostsClient'), { 
  ssr: false,
  loading: () => <div>Loading posts...</div> 
});

export default function PostsPage() {
  return <PostsClient />;
}

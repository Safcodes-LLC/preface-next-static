import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Posts',
  description: 'Dashboard - Posts',
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

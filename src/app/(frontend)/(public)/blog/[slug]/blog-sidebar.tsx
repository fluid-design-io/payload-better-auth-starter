import Link from 'next/link'

import type { Blog } from '@/payload-types'

/** A desktop sticky sidebar that allows users to navigate to other blog posts by category */
export const BlogSidebar = ({ post }: { post: Blog }) => {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-8 z-10">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-primary transition duration-200"
        >
          Blog
        </Link>
        &nbsp;
        <span className="text-muted-foreground">/</span>
        &nbsp;
        <Link
          href={`/blog?category=${post.category}`}
          className="text-muted-foreground hover:text-primary transition duration-200 capitalize"
        >
          {post.category}
        </Link>
      </div>
    </div>
  )
}

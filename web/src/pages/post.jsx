import { Helmet } from 'react-helmet-async';

import { PostView } from 'src/sections/post/view';

// ----------------------------------------------------------------------

export default function PostPage() {
  return (
    <>
      <Helmet>
        <title>Quản lý bài đăng</title>
      </Helmet>

      <PostView />
    </>
  );
}

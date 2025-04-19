export default function Count() {
  const BlogPosts = {
    "first-blog-post": {
      title: "First Blog Post",
      description: "Lorem ipsum dolor sit amet, consectetur adip.",
    },
    "second-blog-post": {
      title: "Second Blog Post",
      description: "Hello React Router v6",
    },
  };
  const cnt = Object.keys(BlogPosts).length;
  return (
    <>
      <h1>Tổng số bài viết: {cnt}</h1>
    </>
  );
}

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`https://c4flhn-3000.csb.app/api/blogs/${slug}`);
      const data = await response.json();
      setPost(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blog post');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <span>The blog post you've requested doesn't exist.</span>;

  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

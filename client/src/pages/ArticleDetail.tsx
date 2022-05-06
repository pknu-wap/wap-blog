import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { articleId } = useParams();
  return (
    <>
      <span>게시글 {articleId}</span>
    </>
  );
};

export default ArticleDetail;

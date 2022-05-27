import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { IArticle } from '../../../interfaces/article.interface';
import ArticleWriterAndUpdatedAt from '../ArticleWriterAndUpdateAt';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import WAPImage from '/img/WAPImg.png';
import { PROPERTIES } from '../../../config/properties';

interface IArticleComponent {
  article: IArticle;
}

export default function ArticleComponent({ article }: IArticleComponent) {
  return (
    <Box sx={{ width: '100%', maxWidth: 580 }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              <Link
                key={article.id}
                to={`/@${article.user.username}/${article.id}`}
              >
                {article.title}
              </Link>
            </Typography>
          </Grid>
          {/* 이미지가 있을 때만 */}
          {article.images.length !== 0 ? (
            <div
              style={{
                width: '100%',
                height: '340px',
                borderRadius: '20px',
                overflow: 'hidden',
                margin: '0 auto',
              }}
            >
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                src={PROPERTIES.AWS_S3_URL + article.images[0].fileName}
                alt=""
              />
            </div>
          ) : (
            <div>
              <img src={WAPImage} alt="WAPImage" />
            </div>
          )}
          {/* 이미지 */}
        </Grid>
        <Typography color="text.secondary" variant="body2">
          {article.description}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <Typography component={'span'} color="text.secondary" variant="body2">
          <ArticleWriterAndUpdatedAt
            user={article.user}
            updatedAt={article.updatedAt + ''}
          />
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}
        >
          {article.tagList.map((tag) => (
            <Link
              key={tag.id}
              to={`/@${article.user.username}?tag=${tag.name}`}
            >
              <Chip className="hover:cursor-pointer" label={tag.name} />
            </Link>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 8080,
  },
  cilent: process.env.CLIENT || 'http://localhost:3000',
  mysql: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  auth: {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    github: {
      id: process.env.GITHUB_ID,
      secret: process.env.GITHUB_SECRET,
      redirect: process.env.GITHUB_REDIRECT_URI,
    },
    google: {
      id: process.env.GOOGLE_ID,
      secret: process.env.GOOGLE_SECRET,
      redirect: process.env.GOOGLE_REDIRECT_URI,
    },
  },
});

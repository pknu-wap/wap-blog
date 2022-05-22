export default {};

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

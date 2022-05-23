import { IComment } from '../../../interfaces/comment.interface';
import S from './styled';

interface IUpdate {
  setIsUpdate: (isUpdate: boolean) => void;
  comment: IComment;
}

const UpdateComment = ({ setIsUpdate, comment }: IUpdate) => {
  const onCancel = () => {
    setIsUpdate(false);
  };
  return (
    <>
      <S.CardBlock as="input" placeholder={comment.text}></S.CardBlock>
      <S.CardFooter style={{ color: 'black' }}>
        <button onClick={onCancel}>취소</button>
        <button>수정</button>
      </S.CardFooter>
    </>
  );
};
export default UpdateComment;

import { useEffect, useState } from 'react';
import { ITag } from '../../interfaces/tag.interface';

const useTag = (tags: ITag[]) => {
  const [tagList, setTagList] = useState<string[]>();

  useEffect(() => {
    setTagList(
      tags?.map((tag) =>
        tag.name.trim().charAt(0) === '#'
          ? tag.name.trim()
          : `#${tag.name.trim()}`,
      ),
    ); //태그 배열에 넣음
  }, [tags]);
  return tagList;
};

export default useTag;

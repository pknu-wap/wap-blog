export interface ITag {
  id: number;
  name: string;
}

export type TagListType = (ITag & { articles_count: number })[];

export interface IUserTagsResponse {
  tagList: TagListType;
  allCount: number;
}

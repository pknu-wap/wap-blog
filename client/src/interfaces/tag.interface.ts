export interface ITag {
  id: number;
  name: string;
}

export interface IUserTagsResponse {
  tagList: { id: number; name: string; articles_count: number }[];
  allCount: number;
}

import { upload } from "@/utils/http";
import { v1Get, v1Post } from "@/api/v1";

import type { Request, Response } from "@/types/modules/publish";

const apiUrls = {
  postPublish: "/activities",
  getTags: "/tags",
  postId: "/api/v1/files/images",
};

// 发布活动
export const postPublish = (data: Request) => {
  return v1Post<any>(apiUrls.postPublish, data);
};

// 获取活动标签
export const getTags = () => {
  return v1Get<any>(apiUrls.getTags, { type: "activity" });
};

// 上传图片
export const postId = (file: string | File, bizType: string) => {
  return upload<Response>(apiUrls.postId, { file: file, bizType: bizType });
};

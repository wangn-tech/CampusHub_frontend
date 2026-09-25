import { v1Delete, v1Get, v1Post } from "@/api/v1";

import type { categories } from "@/types/modules/home/categories";
import type {
  activities,
  ActivitiesRequest,
} from "@/types/modules/home/activities";
import type { search, SearchRequest } from "@/types/modules/home/search";
import type { detail } from "@/types/modules/home/detail";
import type { sign } from "@/types/modules/home/sign";
import type { wait, WaitRequest } from "@/types/modules/home/wait";
import type { systemMessage } from "@/types/modules/home/index";
import type { user } from "@/types/modules/home/user";

const apiUrls = {
  getActivityCategoryList: "/categories",
};

// 获取活动分类列表
export const getActivityCategoryList = () => {
  return v1Get<any>(apiUrls.getActivityCategoryList);
};

// 获取活动列表
export const getActivityList = (params: ActivitiesRequest) => {
  return v1Get<any>("/activities", { page: params.page, page_size: params.pageSize, category_id: params.categoryId, status: params.status, sort: params.sort });
};

// 搜索活动
export const searchActivity = (params: SearchRequest) => {
  return v1Get<any>("/activities/search", { keyword: params.keyword, page: params.page, page_size: params.pageSize, category_id: params.categoryId, sort: params.sort });
};

// 获取活动详情
export const getActivityDetail = (id: string) => {
  return v1Get<any>(`/activities/${id}`);
};

// 报名活动
export const signActivity = (id: string) => {
  return v1Post<any>(`/activities/${id}/registrations`);
};

// 取消报名活动
export const cancelSign = (registrationID: string) => {
  return v1Delete<any>(`/registrations/${registrationID}`);
};

// 获取待参加活动列表
export const getWaitList = (params: WaitRequest) => {
  return v1Get<any>("/users/me/activities/registered", { status: params.type === "已参加" ? "history" : "upcoming", page: 1, page_size: 12 });
};

// 获取用户首页信息
export const getUserHome = (_user_id: string) => {
  return Promise.reject<any>(new Error("公开用户主页暂不受 v1 后端支持"));
};

// 获取系统消息未读数量
export const getNotificationCount = () => {
  return v1Get<any>("/notifications/unread-count");
};

import { v1Get } from "@/api/v1";
import type {
  ActivityListResponse,
  MyCreatedActivity,
} from "@/types/modules/activity";

const apiUrls = {
  getActivityList: "/users/me/activities/registered",
  getMyCreated: "/users/me/activities/created",
  searchActivities: "/activities/search",
};

/**
 * 搜索活动（用于核销）
 * @param keyword 搜索关键词
 * @param page 页码，默认1
 * @param pageSize 每页数量，默认10
 */
export const searchActivities = (
  keyword: string,
  page = 1,
  pageSize = 10,
) => {
  return v1Get<any>(apiUrls.searchActivities, { keyword, page, page_size: pageSize });
};

/**
 * 获取待参加/已参加活动列表
 * @param type "待参加" | "已参加"
 * @param page 页码，默认1
 * @param pageSize 每页数量，默认12
 */
export const getActivityList = (
  type: "待参加" | "已参加",
  page = 1,
  pageSize = 12,
) => {
  return v1Get<any>(apiUrls.getActivityList, { status: type === "已参加" ? "history" : "upcoming", page, page_size: pageSize });
};

/**
 * 获取我创建的活动列表
 * @param page 页码，默认1
 * @param pageSize 每页数量，默认12
 */
export const getMyCreated = (page = 1, pageSize = 12) => {
  return v1Get<any>(apiUrls.getMyCreated, { page, page_size: pageSize });
};

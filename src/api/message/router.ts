import { v1Get, v1Post } from "@/api/v1";
import type { notifications } from "@/types/modules/message/notifications";
import type { groups } from "@/types/modules/message/groups";
import type { title } from "@/types/modules/message/title";
import type { members } from "@/types/modules/message/members";
import type { status } from "@/types/modules/message/status";
import type { history } from "@/types/modules/message/history";
import type { offline } from "@/types/modules/message/offline";

const apiUrls = {
  getNotifications: "/notifications",
  getNotificationsUnreadCount: "/notifications/unread-count",
  markNotificationsRead: "/notifications/read",
  markNotificationsReadAll: "/notifications/read-all",
  getGroups: "/users/me/groups",
  getTitle: "/groups",
  getMembers: "/groups",
  getStatus: "/users/status",
  getHistory: "/groups",
  getOffline: "/messages/offline",
};

// ==================== 系统通知相关 ====================

/**
 * 获取通知列表
 * @param user_id 用户ID
 * @param page 页码
 * @param page_size 每页数量
 */
export const getNotifications = (_user_id?: number, page = 1, page_size = 20) => {
  return v1Get<any>(apiUrls.getNotifications, { page, page_size });
};

/**
 * 获取未读通知数量
 * @param user_id 用户ID
 */
export const getNotificationsUnreadCount = (_user_id?: number) => {
  return v1Get<any>(apiUrls.getNotificationsUnreadCount);
};

/**
 * 标记通知已读
 * @param user_id 用户ID
 * @param notification_ids 通知ID数组
 */
export const markNotificationsRead = (
  user_id: number,
  notification_ids: string[],
) => {
  return v1Post<any>(apiUrls.markNotificationsRead, { ids: notification_ids });
};

/**
 * 全部标记已读
 * @param user_id 用户ID
 */
export const markNotificationsReadAll = (user_id: number) => {
  return v1Post<any>(apiUrls.markNotificationsReadAll);
};

// ==================== 群聊相关 ====================

/**
 * 获取用户群聊列表
 * @param user_id 用户ID
 * @param page 页码
 * @param page_size 每页数量
 */
export const getGroups = (_user_id?: number, _page = 1, _page_size = 20) => {
  return v1Get<any>(apiUrls.getGroups);
};

/**
 * 获取群聊信息
 * @param group_id 群组ID
 */
export const getGroupInfo = (group_id: string) => {
  return v1Get<any>(apiUrls.getTitle + `/${group_id}`);
};

/**
 * 获取群聊成员列表
 * @param group_id 群组ID
 * @param page 页码
 * @param page_size 每页数量
 */
export const getGroupMembers = (group_id: string, page = 1, page_size = 20) => {
  return v1Get<any>(apiUrls.getMembers + `/${group_id}/members`, { page, page_size });
};

/**
 * 获取用户在线状态
 * @param user_id 用户ID
 */
export const getUserStatus = (user_id: number) => {
  return Promise.reject(new Error("在线状态暂不受 v1 后端支持"));
};

// ==================== 消息相关 ====================

/**
 * 获取群聊历史消息
 * @param group_id 群组ID
 * @param before_id 查询在这条消息之前的历史消息
 * @param limit 限制返回的消息数量，默认10
 */
export const getGroupHistory = (
  group_id: string,
  before_id?: string,
  limit = 10,
) => {
  return v1Get<any>(`${apiUrls.getHistory}/${group_id}/messages`, { after_id: before_id, limit });
};

/**
 * 获取用户离线消息
 * @param user_id 用户ID
 * @param after_time 离线时间
 */
export const getOfflineMessages = (_user_id: number, after_id: string | number = 0) => {
  return v1Get<any>(apiUrls.getOffline, { after_id, limit: 100 });
};

// ==================== 兼容旧接口名称 ====================

/**
 * @deprecated 使用 getGroupInfo 代替
 */
export const getTitle = getGroupInfo;

/**
 * @deprecated 使用 getGroupMembers 代替
 */
export const getMembers = getGroupMembers;

/**
 * @deprecated 使用 getUserStatus 代替
 */
export const getStatus = getUserStatus;

/**
 * @deprecated 使用 getGroupHistory 代替
 */
export const getHistory = getGroupHistory;

/**
 * @deprecated 使用 getOfflineMessages 代替
 */
export const getOffline = getOfflineMessages;

import { get, post, put, upload } from "@/utils/http";
import type {
  GetStudentAuthProgressData,
  PostUserDetailsRequest,
  PostUserInterestsData,
  PostUserInterestsRequest,
  PostUserPasswordData,
  PostUserPasswordRequest,
  UserDetailsData,
  PostStudentAuthRequest,
  PostStudentAuthData,
  PostStudentAuthConfirmRequest,
  PostStudentAuthConfirmData,
  PostStudentAuthCancelRequest,
  PostStudentAuthCancelData,
  CaptchaConfigData,
  PostCaptchaRequest,
  PostQqCodeRequest,
  PostCaptchaData,
  PostQqCodeData,
  PostQqCodeConfirmData,
  PostQqCodeConfirmRequest,
} from "@/types/modules/profile";
import type {
  CreditLogsResponse,
  CreditLogsParams,
} from "@/types/modules/credit";

const apiUrls = {
  getProfile: "/api/v1/users/me",
  updateProfile: "/api/v1/users/me",
  updateInterests: "/api/v1/users/me/interests",
  updatePassword: "/api/v1/users/info/password",
  getAuthProgress: "/api/v1/student-verifications/current",
  postStudentAuth: "/api/v1/student-verifications",
  uploadImage: "/api/v1/files/images",
  getCaptchaConfig: "/api/v1/captcha/config",
  postCaptcha: "/api/v1/captcha",
  getQqCodeRegister: "/api/v1/qq_code/register",
  getQqCodeForgotPassword: "/api/v1/qq_code/forgot_password",
  getQqCodeDeleteUser: "/api/v1/qq_code/delete_user",
  getCreditLogs: "/api/v1/credit/logs",
};

// 获取用户详情
export const getProfile = () => {
  return get<Response<UserDetailsData>>(apiUrls.getProfile);
};

// 更新用户详情
export const updateProfile = (data: PostUserDetailsRequest) => {
  return put<Response<UserDetailsData>>(apiUrls.updateProfile, data);
};

// 更新用户详情（带头像上传）
export const updateProfileWithAvatar = (data: PostUserDetailsRequest) => {
  const formData = {
    nickname: data.nickname,
    introduction: data.introduction,
    age: data.age,
    gender: data.gender,
    avatar_image: data.avatar_image,
    interestTagIds: data.interestTagIds,
  };

  return upload<Response<UserDetailsData>>(apiUrls.updateProfile, formData);
};

// 更新用户兴趣标签
export const updateInterests = (data: PostUserInterestsRequest) => {
  return put<Response<PostUserInterestsData>>(apiUrls.updateInterests, data);
};

// 修改用户密码
export const updatePassword = (data: PostUserPasswordRequest) => {
  return post<Response<PostUserPasswordData>>(apiUrls.updatePassword, data);
};

// 获取学生认证当前进度
export const getAuthProgress = () => {
  return get<Response<GetStudentAuthProgressData>>(apiUrls.getAuthProgress);
};

// 提交学生认证申请
export const postStudentAuth = (data: PostStudentAuthRequest) => {
  return post<Response<PostStudentAuthData>>(apiUrls.postStudentAuth, data);
};

// 提交学生认证申请（带文件上传）
export const postStudentAuthWithFiles = (data: PostStudentAuthRequest) => {
  return upload<Response<PostStudentAuthData>>(apiUrls.postStudentAuth, data);
};

// 确认学生认证申请
export const postStudentAuthConfirm = (data: PostStudentAuthConfirmRequest) => {
  return Promise.reject<Response<PostStudentAuthConfirmData>>(new Error("学生认证确认暂不受 v1 后端支持"));
};

// 取消学生认证申请
export const postStudentAuthCancel = (data: PostStudentAuthCancelRequest) => {
  return Promise.reject<Response<PostStudentAuthCancelData>>(new Error("学生认证取消暂不受 v1 后端支持"));
};

// 获取验证码配置
export const getCaptchaConfig = () => {
  return get<Response<CaptchaConfigData>>(apiUrls.getCaptchaConfig);
};

// 提交验证码
export const postCaptcha = (data: PostCaptchaRequest) => {
  return post<Response<PostCaptchaData>>(apiUrls.postCaptcha, data);
};

// 获取QQ注册验证码
export const getQqCodeRegister = (params: PostQqCodeRequest) => {
  return get<Response<PostQqCodeData>>(apiUrls.getQqCodeRegister, {
    data: params,
  });
};

// 获取QQ忘记密码验证码
export const getQqCodeForgotPassword = (params: PostQqCodeRequest) => {
  return post<Response<PostQqCodeConfirmData>>(
    apiUrls.getQqCodeForgotPassword,
    { data: params },
  );
};

// 获取QQ删除用户验证码
export const getQqCodeDeleteUser = (params: PostQqCodeRequest) => {
  return post<Response<PostQqCodeConfirmData>>(apiUrls.getQqCodeDeleteUser, {
    data: params,
  });
};

// 获取信用分变更记录
export const getCreditLogs = (params?: CreditLogsParams) => {
  return get<Response<CreditLogsResponse>>(apiUrls.getCreditLogs, {
    data: params,
  });
};

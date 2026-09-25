import { v1Get, v1Post } from "@/api/v1";
import type { TicketListResponse } from "@/types/modules/ticket/ticket";
import type { TicketDetailResponse } from "@/types/modules/ticket/ticket-detail";
import type { Response } from "@/types/modules/ticket/post-ticket";
import type { Request } from "@/types/modules/ticket/post-ticket";

const apiUrls = {
    getTicketList: "/tickets",
    getTicketDetail: "/tickets",
    postVerifyTicket: "/check-ins",
};

// 获取票券详情
export const getTicketDetail = (ticketId: string) => {
    return v1Get<any>(`${apiUrls.getTicketDetail}/${ticketId}`);
};

// 获取票券列表
export const getTicketList = (page: number = 1, pageSize: number = 10) => {
    return v1Get<any>(apiUrls.getTicketList, { page, page_size: pageSize });
};

// 核销二维码
export const postVerifyTicket = (data: Request) => {
    return v1Post<any>(apiUrls.postVerifyTicket, { ...data, client_request_id: (data as any).client_request_id || `${Date.now()}-${Math.random()}` });
};

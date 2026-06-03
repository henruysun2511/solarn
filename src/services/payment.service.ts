import { ApiResponse } from "@/constants/apiResponse";
import { Invoice, InvoiceInput, InvoiceParams, MyInvoiceParams } from "@/schemas/payment.schema";
import http from "@/utils/http";

const prefix = "/invoices";

const paymentService = {
  getInvoices: (params?: InvoiceParams) => {
    return http.get<ApiResponse<Invoice[]>>(prefix, { params });
  },

  getAllInvoicesForExport: (params?: Omit<InvoiceParams, "page" | "limit">) => {
    return http.get<ApiResponse<Invoice[]>>(prefix, {
      params: { ...params, page: 1, limit: 100 },
    });
  },

  createInvoice: (data: InvoiceInput) => {
    return http.post<ApiResponse<any>>(prefix, data);
  },

  getInvoiceById: (id: string) => {
    return http.get<ApiResponse<Invoice>>(`${prefix}/${id}`);
  },

  getMyInvoices: (params?: MyInvoiceParams) => {
    return http.get<ApiResponse<Invoice[]>>(`${prefix}/my`, { params });
  },
};

export default paymentService;

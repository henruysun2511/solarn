import { ApiResponse } from "@/constants/apiResponse";
import { 
  Invoice, 
  InvoiceInput, 
  InvoiceParams 
} from "@/schemas/payment.schema";
import http from "@/utils/http";

const prefix = "/invoices";

const paymentService = {
  getInvoices: (params?: InvoiceParams) => {
    return http.get<ApiResponse<Invoice[]>>(prefix, { params });
  },
  
  createInvoice: (data: InvoiceInput) => {
    return http.post<ApiResponse<any>>(prefix, data);
  },

  getInvoiceById: (id: string) => {
    return http.get<ApiResponse<Invoice>>(`${prefix}/${id}`);
  },
};

export default paymentService;

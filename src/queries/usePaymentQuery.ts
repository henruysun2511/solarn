import { 
  InvoiceInput, 
  InvoiceParams 
} from "@/schemas/payment.schema";
import paymentService from "@/services/payment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PAYMENT_QUERY_KEY = ["invoices"];

export const useGetInvoices = (params?: InvoiceParams) => {
  return useQuery({
    queryKey: [...PAYMENT_QUERY_KEY, params],
    queryFn: () => paymentService.getInvoices(params).then((res) => res.data),
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InvoiceInput) => paymentService.createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEY });
    },
  });
};

export const useGetInvoice = (id: string) => {
  return useQuery({
    queryKey: [...PAYMENT_QUERY_KEY, id],
    queryFn: () => paymentService.getInvoiceById(id).then((res) => res.data),
    enabled: !!id,
  });
};

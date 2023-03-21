export type ParsedEmailPayload = {
  success: boolean;
  data: {
    amount: number;
    name: string;
    transactionId: string;
  } | null;
};

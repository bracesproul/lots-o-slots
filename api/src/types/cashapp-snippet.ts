export type CashappSnippedData = {
  cashtag?: string;
  amount?: string;
  paymentId?: string;
  receiverName?: string;
};

export type ZelleSnippetData = {
  amount?: string;
  senderName?: string;
};

export type PayPalDecodedData = {
  amount?: string;
  transactionId?: string;
  customerName?: string;
};

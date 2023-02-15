import { EmailLogType } from '@/entities/EmailLog/EmailLog';
import { CashAppPaymentEmailData, EmailObjectType } from '@/types';
import { logEmail } from '@/utils';
import { updateDatabasePayment } from './updateDatabasePayment';

export async function handleReceivedPayment(
  email: EmailObjectType,
  cashappData?: CashAppPaymentEmailData | null
) {
  if (cashappData) {
    const detailRowValues = cashappData.detail_rows.map((row) => row.value);
    const amount = Number(detailRowValues[0].split('$')[1]);
    const name = detailRowValues[4];
    const transactionId = cashappData.transaction_id;
    const cashTag = cashappData.header_subtext.split('$')[1];

    await updateDatabasePayment({
      amount,
      name,
      transactionId,
      cashTag,
      email,
    });

    await logEmail({
      email,
      description: 'Logged CashApp payment',
      type: EmailLogType.CASHAPP,
      processed: true,
    });

    return {
      success: true,
      amount,
      name,
      transactionId,
      cashTag,
    };
  }

  const body = email.body.replace(/\r/g, '');

  const cashtagRegex = new RegExp(/^Payment from \$([^\s]+)/m);
  const cashtagMatch = body.match(cashtagRegex);

  const amountRegex = new RegExp(/(?<=\$)\d+\.\d+/);
  const amountMatch = body.match(amountRegex);

  const nameRegex = new RegExp(/From\s(.+)/);
  const nameMatch = body.match(nameRegex);

  const transactionIdRegex = new RegExp(/#([^\s]+)\sTo/);
  const transactionIdMatch = body.match(transactionIdRegex);

  if (!cashtagMatch || !amountMatch || !nameMatch || !transactionIdMatch) {
    console.log('failed to parse cashapp payment', {
      body,
    });
    return {
      success: false,
      amount: 0,
      name: null,
      cashTag: null,
      transactionId: '',
    };
  }

  const amount = Number(amountMatch[0]);
  const name = nameMatch[1];
  const transactionId = transactionIdMatch[1];
  const cashTag = cashtagMatch[1];

  await updateDatabasePayment({
    amount,
    name,
    transactionId,
    cashTag,
    email,
  });

  await logEmail({
    email,
    description: 'Logged CashApp payment',
    type: EmailLogType.CASHAPP,
    processed: true,
  });

  return {
    success: true,
    amount,
    name,
    transactionId,
    cashTag,
  };
}

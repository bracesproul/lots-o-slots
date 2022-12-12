import { parseCashAppEmail } from '@/utils';

describe('Parse CashApp emails', () => {
  it('Should parse the name, cashtag, amount and transaction ID', async () => {
    const body = dummyEmail;
    const to = 'testTo@example.com';
    const from = 'cash@square.com';
    const subject = `Tony Pascale sent you $40`;
    const id = 'testId';
    const { success, name, amount, transactionId, cashTag } =
      await parseCashAppEmail({
        to,
        from,
        subject,
        body,
        id,
      });

    expect(success).toBe(true);
    expect(name).toBe('Tony Pascale');
    expect(cashTag).toBe('StraightCashMyDude');
    // eslint-disable-next-line
    expect(amount).toBe(40.00);
    expect(transactionId).toBe('1VX2AYF');
  });
});

const dummyEmail = `
Tony Pascale
Payment from $StraightCashMyDude
$40.00
 
Received
Amount
$40.00
Destination
Cash
Identifier
#1VX2AYF
To
jay sandoval
From
Tony Pascale
`;

import { parseCashAppEmail } from '@/utils';

describe('Parse CashApp emails', () => {
  it('Should parse the name, cashtag, amount and transaction ID', async () => {
    const body = dummyEmail;
    const to = 'testTo@example.com';
    const from = 'cash@square.com';
    const subject = `You paid Jay Muler $40`;
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
    expect(name).toBe('Jay Muler');
    expect(cashTag).toBe('jaymiller760');
    // eslint-disable-next-line
    expect(amount).toBe(40.00);
    expect(transactionId).toBe('FMV2K2J');
  });
});

const dummyEmail = `
Jay Muler
Payment to $jaymiller760
$40.00

Completed
Amount
$40.00
Source
Cash
Identifier
#FMV2K2J
To
Jay Muler
From
jay sandoval
`;

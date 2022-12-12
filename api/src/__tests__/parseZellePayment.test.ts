import { parseZellePayment } from '@/utils';

describe('Parse PayPal payment', () => {
  it('Should return the sender name and amount', async () => {
    const body = dummyEmail;
    const to = 'testTo@example.com';
    const from = 'testFrom@example.com';
    const subject = `You've got money`;
    const id = 'testId';
    const { success, name, amount } = await parseZellePayment({
      to,
      from,
      subject,
      body,
      id,
    });

    expect(success).toBe(true);
    expect(name).toBe('Paul Tresselt');
    // eslint-disable-next-line
    expect(amount).toBe(60.00);
  });
});

const dummyEmail = `
body [image: Bank of America.]
Paul Tresselt sent you $60.00
View your balance
<https://www.bankofamerica.com/deeplink/redirect.go?target=bofasignin&screen=Accounts:Home&version=7.0.0>
Please allow up to 5 minutes for the
money to deposit to your account.
[image: Bank of America together with Zelle logo]
Zelle® and the Zelle® related marks are wholly owned by Early Warning
Services, LLC, and are used herein under license. Bank of America and the
Bank of America logo are registered trademarks of Bank of America
Corporation.
We'll never ask for your personal information such as SSN or ATM PIN in
email messages. If you get an email that looks suspicious or you are not
the intended recipient of this email, don't click on any links. Instead,
forward to abuse@bankofamerica.com
<#m_991704780043990101_m_7197751175980645331_m_6577546922456025445_> then
delete it.
Please don't reply to this automatically generated service email.
Privacy Notice
<https://www.bankofamerica.com/privacy/consumer-privacy-notice.go> Equal
Housing Lender <https://www.bankofamerica.com/help/equalhousing.cfm>
Bank of America, N.A. Member FDIC
© 2022 Bank of America Corporation
`;

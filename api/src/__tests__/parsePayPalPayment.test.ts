import { parsePayPalPayment } from '@/utils';

describe('Parse PayPal payment', () => {
  it('Should return the sender name and amount', async () => {
    const body = dummyEmail;
    const to = 'testTo@example.com';
    const from = 'testFrom@example.com';
    const subject = `You've got money`;
    const id = 'testId';
    const { success, name, amount, transactionId } = await parsePayPalPayment({
      to,
      from,
      subject,
      body,
      id,
    });

    expect(success).toBe(true);
    expect(name).toBe('Danny Lope');
    // eslint-disable-next-line
    expect(amount).toBe(20.00);
    expect(transactionId).toBe('3MB02613PA4530047');
  });
});

const dummyEmail = `
---------- Forwarded message ---------
From: Brace Sproul <braceasproul@gmail.com>
Date: Mon, Dec 12, 2022 at 7:59 AM
Subject: Fwd: You've got money
To: <510kickzz@gmail.com>



Hello, louis cooper
[image: PayPal]

Danny Lope sent you $20.00 USD

Transaction Details
*Transaction ID*
3MB02613PA4530047
<https://www.paypal.com/cgp/app-redirect?intent=txn_details&src=RT000397_txn_id&ref_id=3MB02613PA4530047&v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>
*Transaction
date*
December 11, 2022
------------------------------
*Amount* $20.00 USD
------------------------------

Don't see the money in your account?
Don't worry -- sometimes it just takes a few minutes for it to show up.
------------------------------
Go to PayPal
<https://www.paypal.com/us/cgp/app-redirect?intent=summary&src=go_to_paypal2&v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>
------------------------------
[image: PayPal]
------------------------------
Help & Contact
<https://www.paypal.com/us/smarthelp/home?v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>
| Security
<https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security?v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>
| Apps
<https://www.paypal.com/us/webapps/mpp/mobile-apps?v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>
[image: Twitter]
<https://twitter.com/PayPal?v=1%2C0.1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>
[image:
Instagram]
<https://www.instagram.com/paypal/?v=1%2C0.1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>
[image:
Facebook]
<https://www.facebook.com/PayPalUSA?v=1%2C0.1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>
[image:
LinkedIn]
<http://www.linkedin.com/company/1482?trk=tyah&v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>

PayPal is committed to preventing fraudulent emails. Emails from PayPal
will always contain your full name. Learn to identify phishing
<https://www.paypal.com/us/webapps/mpp/security/suspicious-activity?v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>

Please don't reply to this email. To get in touch with us, click *Help &
Contact
<https://www.paypal.com/selfhelp/home?v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>*
.

Not sure why you received this email? Learn more
<https://www.paypal.com/us/smarthelp/article/why-am-i-receiving-emails-from-paypal-when-i-dont-have-an-account-faq4172?v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000397&utm_unptid=9551907c-7976-11ed-8749-40a6b72934f8&ppid=RT000397&cnac=US&rsta=en_US%28en-US%29&cust=K5VFTXAYWV5LS&unptid=9551907c-7976-11ed-8749-40a6b72934f8&calc=d84e287d6e732&unp_tpcid=sendmoney-receiver&page=main%3Aemail%3ART000397&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.130.0&xt=104038%2C124817>

Copyright © 1999-2022 PayPal, Inc. All rights reserved. PayPal is located
at 2211 N. First St., San Jose, CA 95131.

PayPal RT000397:en_US(en-US):1.6.0:d84e287d6e732

`;

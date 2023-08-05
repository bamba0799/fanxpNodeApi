import { SMS_API_AUTHORIZATION_HEADER } from '@/constants/variables';
import { axiosSMSInstance } from '@/lib/axios';

type SendSMSProps = {
  contact: string;
  otp: string;
};

export function generateOTP(length = 4) {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}

export async function sendOtpMessage(props: SendSMSProps) {
  const senderPhone = '0000';

  // get auth token
  const { data: auth } = await axiosSMSInstance.post(
    '/oauth/v3/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: SMS_API_AUTHORIZATION_HEADER as string,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    },
  );

  // send message
  const { data: result } = await axiosSMSInstance.post(
    `/smsmessaging/v1/outbound/tel%3A%2B225${senderPhone}/requests`,
    {
      outboundSMSMessageRequest: {
        address: `tel:+225${props.contact}`,
        senderAddress: `tel:+225${senderPhone}`,
        outboundSMSTextMessage: {
          message: `Votre code de connexion à l'application FanXp est: ${props.otp}`,
        },
      },
    },
    {
      headers: {
        Authorization: `${auth.token_type} ${auth.access_token}`,
      },
    },
  );

  return result;
}

import axios from 'axios';

// Define API endpoints for sending SMS
const GP_API = 'https://api.grameenphone.com/sms/v1/send';
const ROBI_API = 'https://api.robi.com.bd/gw/process.php';
const TELETALK_API = 'https://www.smsgatewaybd.com/smsapi';
const BANGLALINK_API = 'https://api.banglalink.com.bd/api/v1/sms/send';

// Define API credentials for each operator
const GP_API_KEY = process.env.GP_API_KEY;
const GP_API_SECRET = process.env.GP_API_SECRET;
const GP_SENDER_ID = process.env.GP_SENDER_ID;

const ROBI_USERNAME = process.env.ROBI_USERNAME;
const ROBI_PASSWORD = process.env.ROBI_PASSWORD;
const ROBI_SENDER_ID = process.env.ROBI_SENDER_ID;

const TELETALK_USERNAME = process.env.TELETALK_USERNAME;
const TELETALK_PASSWORD = process.env.TELETALK_PASSWORD;
const TELETALK_SENDER_ID = process.env.TELETALK_SENDER_ID;

const BANGLALINK_USERNAME = process.env.BANGLALINK_USERNAME;
const BANGLALINK_PASSWORD = process.env.BANGLALINK_PASSWORD;
const BANGLALINK_SENDER_ID = process.env.BANGLALINK_SENDER_ID;

// Send SMS using GP operator
const sendGPMessage = async (mobileNumbers, message) => {
  // const url = 'https://api.gpcloud.io/v1/sms/send';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GP_API_KEY}:${GP_API_SECRET}`
  };

  const data = {
    sender: GP_SENDER_ID,
    recipients: mobileNumbers,
    message
  };

  try {
    const response = await axios.post(GP_API, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Send SMS using Robi operator
const sendRobiMessage = async (mobileNumbers, message) => {
  // const url = 'https://api.robi.com.bd/api/v1/sms/send';

  const headers = {
    'Content-Type': 'application/json'
  };

  const data = {
    user: ROBI_USERNAME,
    pass: ROBI_PASSWORD,
    sender: ROBI_SENDER_ID,
    msisdn: mobileNumbers,
    msg: message
  };

  try {
    const response = await axios.post(ROBI_API, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Send SMS using Teletalk operator
const sendTeletalkMessage = async (mobileNumbers, message) => {
  // const url = 'https://api.teletalk.com.bd/api/v1/sms/send';

  const headers = {
    'Content-Type': 'application/json'
  };

  const data = {
    user: TELETALK_USERNAME,
    pass: TELETALK_PASSWORD,
    sender: TELETALK_SENDER_ID,
    msisdn: mobileNumbers,
    msg: message
  };

  try {
    const response = await axios.post(TELETALK_API, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Send SMS using Banglalink operator
const sendBanglalinkMessage = async (mobileNumbers, message) => {

  const headers = {
    'Content-Type': 'application/json'
  };

  const data = {
    user: BANGLALINK_USERNAME,
    pass: BANGLALINK_PASSWORD,
    sender: BANGLALINK_SENDER_ID,
    msisdn: mobileNumbers,
    msg: message
  };

  try {
    const response = await axios.post(BANGLALINK_API, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  sendGPMessage,
  sendRobiMessage,
  sendTeletalkMessage,
  sendBanglalinkMessage
};

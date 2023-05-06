import { Router } from 'express';
import {
  sendBanglalinkMessage,
  sendGPMessage,
  sendRobiMessage,
  sendTeletalkMessage
} from '../utils/sendsms.util';
import httpStatus from '../utils/httpStatus.util';

const router = Router();

// Define API route for sending SMS
router.post('/', async (req, res) => {

  if (req.body && Object.keys(req.body).length === 0) {
    return res?.status(httpStatus.codes.BAD_REQUEST).json({
      success: false,
      message: httpStatus.messages.BAD_REQUEST,
    });
  }

  try {
    // Get comma-separated mobile numbers from request body
    const { mobileNumbers, message } = req.body;
    const mobileNumberList = mobileNumbers
      .replace(/[+\- ]/g, '') // matches any of the characters +, -, or (space character)
      .split(',')
      .map((mobileNumber) => `88${mobileNumber.slice(-11)}`);

    // Group mobile numbers by operator prefix
    const mobileNumbersByOperator = {
      gp: [],
      robi: [],
      teletalk: [],
      banglalink: []
    };
    mobileNumberList.forEach((msisdn) => {
      if (msisdn.startsWith('88017') || msisdn.startsWith('88013')) {
        mobileNumbersByOperator.gp.push(msisdn);
      } else if (msisdn.startsWith('88016') || msisdn.startsWith('88018')) {
        mobileNumbersByOperator.robi.push(msisdn);
      } else if (msisdn.startsWith('88015')) {
        mobileNumbersByOperator.teletalk.push(msisdn);
      } else if (msisdn.startsWith('88014') || msisdn.startsWith('88019')) {
        mobileNumbersByOperator.banglalink.push(msisdn);
      }
    });

    // Send SMS to each operator using their respective API
    const operatorSendPromises = [];

    if (mobileNumbersByOperator.gp.length > 0) {
      operatorSendPromises.push(sendGPMessage(mobileNumbersByOperator.gp, message));
    }
    if (mobileNumbersByOperator.robi.length > 0) {
      operatorSendPromises.push(sendRobiMessage(mobileNumbersByOperator.robi, message));
    }
    if (mobileNumbersByOperator.teletalk.length > 0) {
      operatorSendPromises.push(sendTeletalkMessage(mobileNumbersByOperator.teletalk, message));
    }
    if (mobileNumbersByOperator.banglalink.length > 0) {
      // Call Banglalink API here
      operatorSendPromises.push(sendBanglalinkMessage(mobileNumbersByOperator.banglalink, message));
    }

    const operatorSendResults = await Promise.allSettled(operatorSendPromises);

    // Send response with the status of each SMS send attempt
    res.status(200).json({
      status: 'success',
      results: operatorSendResults
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

export default router;

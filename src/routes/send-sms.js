import { Router } from 'express';
import { sendGPMessage, sendRobiMessage, sendTeletalkMessage } from '../utils/sendsms.util';

const router = Router();

// Define API route for sending SMS
router.post('/', async (req, res) => {
  try {
    // Get comma-separated mobile numbers from request body
    const { mobileNumbers, message } = req.body;
    const mobileNumberList = mobileNumbers.split(',');

    // Group mobile numbers by operator prefix
    const mobileNumbersByOperator = {
      gp: [],
      robi: [],
      teletalk: [],
      banglalink: []
    };
    mobileNumberList.forEach((msisdn) => {
      if (msisdn.startsWith('017') || msisdn.startsWith('013')) {
        mobileNumbersByOperator.gp.push(msisdn);
      } else if (msisdn.startsWith('016') || msisdn.startsWith('018')) {
        mobileNumbersByOperator.robi.push(msisdn);
      } else if (msisdn.startsWith('015')) {
        mobileNumbersByOperator.teletalk.push(msisdn);
      } else if (msisdn.startsWith('014') || msisdn.startsWith('019')) {
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
    const operatorSendResults = await Promise.all(operatorSendPromises);

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

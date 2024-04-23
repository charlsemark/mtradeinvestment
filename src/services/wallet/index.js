// walletService.js
import axios from 'axios';
import Cookies from 'js-cookie';

export const createWalletAddress = async (formData) => {
  try {
    const response = await axios.post('/api/admin/create-wallet-address/', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error', error);
    // You may want to handle different types of errors differently
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from the server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }

    return {
      success: false,
      status: 'error',
      message: 'Something went wrong! Please try again later.',
    };
  }
};


export const fetchAllWallets = async () => {
    try {
      const response = await axios.get('/api/admin/get-wallets/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
  
      return {
        success: true,
        state: 'success',
        wallets: response.data.wallet,
      };
    } catch (error) {
      console.error('Error', error);
      // Handle errors as needed
  
      return {
        success: false,
        state: 'error',
        message: 'Something went wrong! Please try again later.',
      };
    }
  };
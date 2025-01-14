import Moralis from 'moralis';

const initMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.REACT_APP_MORALIS_API_KEY
  });
};

export const connectWallet = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });

    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

export default initMoralis; 
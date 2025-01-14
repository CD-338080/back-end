let Moralis = null;

const initMoralis = async () => {
  try {
    if (!Moralis) {
      const moralisModule = await import('moralis');
      Moralis = moralisModule.default;
    }
    await Moralis.start({
      apiKey: process.env.REACT_APP_MORALIS_API_KEY
    });
    return Moralis;
  } catch (error) {
    console.error('Failed to initialize Moralis:', error);
    throw error;
  }
};

export const connectWallet = async () => {
  try {
    await initMoralis();
    const { ethereum } = window;
    if (!ethereum) {
      throw new Error('Please install MetaMask!');
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
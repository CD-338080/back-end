let Moralis = null;

const initMoralis = async () => {
  try {
    if (!Moralis) {
      const moralisModule = await import('moralis');
      Moralis = moralisModule.default;
    }
    
    await Moralis.start({
      apiKey: process.env.REACT_APP_MORALIS_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImUxMzY1MzFkLWY5NmQtNDA4Yy1hNzdlLWM4YmQ1MjlhY2Y3ZiIsIm9yZ0lkIjoiNDI1NDM1IiwidXNlcklkIjoiNDM3NTYzIiwidHlwZUlkIjoiZjYxN2E2ZjAtZTM1NC00YWMwLWI3NzgtMGZkZWIxMjlmMjZkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzY3Mjk0MTEsImV4cCI6NDg5MjQ4OTQxMX0.oEJcUazrWgOIb40-u0B4Dk3jJ0nr-MuVeWM0gt__HMU'
    });
    console.log('Moralis initialized successfully');
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
import React, { useEffect, useState } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import './index.css';
import { FaWallet, FaUsers, FaShareAlt } from 'react-icons/fa';
import { FaCoins, FaArrowUp } from 'react-icons/fa';
import { connectWallet } from './services/moralis';

function App() {
  const [userId, setUserId] = useState(null);
  const [startAppParam, setStartAppParam] = useState(null);
  const [message, setMessage] = useState('Cargando...');
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (window.Telegram.WebApp) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      if (initDataUnsafe) {
        if (initDataUnsafe.start_param) {
          setStartAppParam(initDataUnsafe.start_param);
        }
        if (initDataUnsafe.user) {
          setUserId(initDataUnsafe.user.id);
          setMessage(`Tu ID de Telegram es: ${initDataUnsafe.user.id}`);
        } else {
          setMessage('Usuario no identificado o datos iniciales no disponibles');
        }
      } else {
        setMessage('Datos iniciales no seguros no disponibles');
      }
    } else {
      setMessage('Esta aplicación solo funciona dentro de Telegram');
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
      setMessage(`Wallet conectada: ${address.slice(0, 6)}...${address.slice(-4)}`);
    } catch (error) {
      setMessage('Error al conectar wallet');
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center">
          <p><strong className="text-xs"> User Id: {userId || '404'}  | Sponsor: {startAppParam || '404'}</strong></p>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg shadow text-white">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className="text-2xl font-bold mb-2">Mini Trader</h1>
          </div>

          <div className="mt-4 flex justify-center animate-pulse-animation">
            <img src="minero1.jpg" alt="Mining Plan" className="w-3/4 h-3/4 rounded-lg" />
          </div>

          <div className="w-full flex flex-col items-center">
            <button className="mt-5 bg-gradient-to-r from-[#0ecc8d] to-[#42f9d1] text-black rounded-lg w-full h-3/4 text-center py-2 px-4 shadow-lg font-bold flex items-center justify-center gap-2 active:bg-white active:scale-95 hover:scale-105">
              <FaCoins />
              0.0000 USDT
            </button>

            <button className="mt-5 border-2 border-[#81e87e] text-[#81e87e] rounded-lg w-full h-3/4 text-center py-2 px-4 shadow-lg font-bold flex items-center justify-center gap-2 bg-transparent hover:bg-gray-700 hover:scale-105 active:border-white active:text-white active:scale-95">
              <FaArrowUp className="active:text-black" />
              Upgrade
            </button>
          </div>
        </div>

        <div className="mt-2 bg-gray-700 p-4 rounded-lg shadow text-white">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg cursor-pointer hover:bg-[#81e87e] active:scale-95 transition duration-150">
              <FaWallet size="2em" color="#191919" />
              <p className="text-gray-800">Balance</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg cursor-pointer hover:bg-[#81e87e] active:scale-95 transition duration-150">
              <FaUsers size="2em" color="#191919" />
              <p className="text-gray-800">Referrals</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg cursor-pointer hover:bg-[#81e87e] active:scale-95 transition duration-150">
              <FaMoneyBillWave size="2em" color="#191919" />
              <p className="text-gray-800">Withdraw</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg cursor-pointer hover:bg-[#81e87e] active:scale-95 transition duration-150">
              <FaShareAlt size="2em" color="#191919" />
              <p className="text-gray-800">Share</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleConnectWallet}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105"
        >
          <FaWallet className="text-xl" />
          {walletAddress 
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : 'Conectar Wallet'
          }
        </button>

        <p className="mt-4 text-sm text-gray-400">{message}</p>
      </div>

      <footer className="text-gray-400 text-sm mt-6">
        @ASDAS2NBBOT
        <br />
        Paying since {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;

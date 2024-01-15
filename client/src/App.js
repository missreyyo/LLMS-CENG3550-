import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './FileUpload'; //  component for uploading files
import SimpleStorage from './contracts/SimpleStorage.json'; //  contract definition
import { web3, getAccount } from './utils/web3'; //  utility functions for web3
import { fetchAllTransactions } from './utils/ethereum'; //  function to fetch transactions

const App = () => {
  const [ipfsLink, setIpfsLink] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState('home'); // State for the current page

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const transactions = await fetchAllTransactions();
      setTransactions(transactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleFileUploaded = async (ipfsLink, receiverAddress) => {
    try {
      setIpfsLink(ipfsLink);
      const account = await getAccount();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];

      if (!deployedNetwork) {
        console.error('Contract not deployed on the current network');
        return;
      }

      const contract = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork.address
      );

      await contract.methods.sendFile(receiverAddress, ipfsLink).send({ from: account });
      console.log('Successful upload!');

      loadTransactions();
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('upload')}>Upload File</button>
        <button onClick={() => setCurrentPage('transactions')}>Last Transactions</button>
      </div>
      
      {currentPage === 'home' && (
        <div className="home-content">
          <h1>LLMS</h1>
          <p>Large Language Model Safer</p>
        </div>
      )}
      
      {currentPage === 'upload' && <FileUpload onFileUploaded={handleFileUploaded} />}
      
      {currentPage === 'transactions' && (
        <div className="transactions-content">
          <h2>Transactions</h2>
          {transactions.length > 0 ? (
            <ul>
              {transactions.map((tx, index) => (
                <li key={index}>
                  <p><strong>Sender:</strong> {tx.sender}</p>
                  <p><strong>Receiver:</strong> {tx.receiver}</p>
                  <p><strong>IPFS Hash:</strong> {tx.ipfsHash}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-transactions">No transactions.</p>
          )}
        </div>
      )}

      {ipfsLink && (
        <p>IPFS URL: <a href={`https://ipfs.io/ipfs/${ipfsLink}`} target="_blank" rel="noopener noreferrer">
        {ipfsLink}
        </a></p>
        )}
        </div>
        );
        };
        
        export default App;

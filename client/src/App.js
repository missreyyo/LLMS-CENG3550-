import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import * as IpfsHttpClient from 'ipfs-http-client';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [ipfs, setIpfs] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [contractHash, setContractHash] = useState('');

  const contractAddress = '0xdCE5e8fAEE455Ae9929B031774b5c535B9c23b63'; 

  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "dataEntries",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "setIPFSHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        }
      ],
      "name": "getIPFSHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

  useEffect(() => {
    
    const init = async () => {
     
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(_web3);

          
          const _contract = new _web3.eth.Contract(contractAbi, contractAddress);
          setContract(_contract);

          
          const _ipfs = IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: '6008ad809050449eafff9403eba4b754' } });
          setIpfs(_ipfs);

         
          displayContractHash();
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        console.error("No web3 provider detected");
      }
    };

    init();
  }, []); 

  const uploadToIPFS = async () => {
    const textToUpload = prompt("Enter text to be uploaded to IPFS:");
    const _receiverAddress = prompt("Enter receiver Ethereum address:");

    if (textToUpload && _receiverAddress) {
      setReceiverAddress(_receiverAddress);

      
      const ipfsResponse = await ipfs.add(textToUpload);
      const _ipfsHash = ipfsResponse.cid.toString();
      setIpfsHash(_ipfsHash);

      
      const accounts = await web3.eth.getAccounts();
      await contract.methods.setIPFSHash(_receiverAddress, _ipfsHash).send({ from: accounts[0] });

      displayContractHash();
    } else {
      console.error("Text or receiver address not provided");
    }
  };

  const displayContractHash = async () => {
    if (web3 && contract) {
      const accounts = await web3.eth.getAccounts();
      const _contractHash = await contract.methods.getIPFSHash(accounts[0]).call();
      setContractHash(_contractHash);
    }
  };

  return (
    <div>
      <h1>Ethereum IPFS Metamask Example</h1>
      <div>
        <button onClick={uploadToIPFS}>Upload to IPFS</button>
      </div>
      <div>
        <p>IPFS Hash: {ipfsHash}</p>
        <p>Receiver Ethereum Address: {receiverAddress}</p>
        <p>Contract IPFS Hash: {contractHash}</p>
      </div>
    </div>
  );
}

export default App;

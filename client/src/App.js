import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload.js';
import SimpleStorage from './contracts/SimpleStorage.json';
import { web3, getAccount } from './utils/web3.js';

// Ethereum'dan tüm işlemleri çeken fonksiyonu import edin
import { fetchAllTransactions } from './utils/ethereum';

const App = () => {
    const [ipfsLink, setIpfsLink] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [transactions, setTransactions] = useState([]);

    // İşlemleri blockchain'den çeken fonksiyon
    const loadTransactions = async () => {
        const transactions = await fetchAllTransactions();
        setTransactions(transactions);
    };

    // Dosya yüklendiğinde çalışacak fonksiyon
    const handleFileUploaded = async (ipfsLink, receiverAddress) => {
        setIpfsLink(ipfsLink);
        const account = await getAccount();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorage.networks[networkId];
        const contract = new web3.eth.Contract(
            SimpleStorage.abi,
            deployedNetwork && deployedNetwork.address
        );

        await contract.methods.sendFile(receiverAddress, ipfsLink).send({ from: account });
        console.log('Succesfull!!');

        // İşlem tamamlandıktan sonra işlemleri yeniden yükleyin
        await loadTransactions();
    };

    // Bileşen yüklendiğinde işlemleri yükleyin
    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <div>
            <h1>LLMS</h1>
            <FileUpload onFileUploaded={handleFileUploaded} />
            {ipfsLink && <p>IPFS URL: {ipfsLink}</p>}

            <h2>Transactions</h2>
            <ul>
                {transactions.map((tx, index) => (
                    <li key={index}>
                        <p><strong>Sender:</strong> {tx.sender}</p>
                        <p><strong>Receiver:</strong> {tx.receiver}</p>
                        <p><strong>IPFS Hash:</strong> {tx.ipfsHash}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
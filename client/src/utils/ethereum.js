import Web3 from 'web3';
import SimpleStorage from '../contracts/SimpleStorage.json';

const web3 = new Web3(window.ethereum);
const contractAddress = '0x61F62FD10e15dcF377A8eBac2cC5A9DEc26f986b'; 
const contract = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

export const fetchAllTransactions = async () => {
    const transactions = await contract.methods.getAllTransactions().call();
    return transactions;
};
import Web3 from 'web3';
import SimpleStorage from '../contracts/SimpleStorage.json';

const web3 = new Web3(window.ethereum);
const contractAddress = '0x865Fc44FC07c5e28E47689f0fc4F7E84FFb4a0f9'; 
const contract = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

export const fetchAllTransactions = async () => {
    const transactions = await contract.methods.getAllTransactions().call();
    return transactions;
};
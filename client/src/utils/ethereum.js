import Web3 from 'web3';
import SimpleStorage from '../contracts/SimpleStorage.json';

const web3 = new Web3(window.ethereum);
const contractAddress = '0x3B083435E10E47e6f005eB04E129835Cd416b467'; 
const contract = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

export const fetchAllTransactions = async () => {
    const transactions = await contract.methods.getAllTransactions().call();
    return transactions;
};
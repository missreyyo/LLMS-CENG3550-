import Web3 from 'web3';
import SimpleStorage from '../contracts/SimpleStorage.json';

const web3 = new Web3(window.ethereum);
const contractAddress = '0x468fab36FF12a85A59Dfb69C7556e682942A24A5'; 
const contract = new web3.eth.Contract(SimpleStorage.abi, contractAddress);

export const fetchAllTransactions = async () => {
    const transactions = await contract.methods.getAllTransactions().call();
    return transactions;
};
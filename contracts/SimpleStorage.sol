// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    address public owner;
    event FileSent(address indexed sender, address indexed receiver, string ipfsHash);

    struct Transaction {
        address sender;
        address receiver;
        string ipfsHash;
    }

    Transaction[] public transactions;

    constructor() {
        owner = msg.sender;
    }

    function sendFile(address _receiver, string memory _ipfsHash) external {
        Transaction memory newTransaction = Transaction({
            sender: msg.sender,
            receiver: _receiver,
            ipfsHash: _ipfsHash
        });
        transactions.push(newTransaction);
        emit FileSent(msg.sender, _receiver, _ipfsHash);
    }

    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }

    function getTransaction(uint256 _index) external view returns (address, address, string memory) {
        require(_index < transactions.length, "Index out of bounds");
        Transaction memory transaction = transactions[_index];
        return (transaction.sender, transaction.receiver, transaction.ipfsHash);
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
    return transactions;
    }
}
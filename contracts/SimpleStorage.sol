// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    struct DataEntry {
        address sender;
        string ipfsHash;
    }

    mapping(address => DataEntry) public dataEntries;

    modifier onlySender() {
        require(dataEntries[msg.sender].sender == msg.sender, "You are not the sender of this data entry");
        _;
    }

    function setIPFSHash(string memory _ipfsHash) public {
        dataEntries[msg.sender] = DataEntry(msg.sender, _ipfsHash);
    }

    function getIPFSHash(address _sender) public view returns (string memory) {
        return dataEntries[_sender].ipfsHash;
    }
}
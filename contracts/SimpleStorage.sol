// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    struct DataEntry {
        address sender;
        address recipient;
        string ipfsHash;
    }

    mapping(address => DataEntry[]) public sentDataEntries;
    mapping(address => DataEntry[]) public receivedDataEntries;

    modifier onlySender(address _recipient) {
        require(
            msg.sender == _recipient,
            "You are not allowed to perform this action"
        );
        _;
    }

    function setIPFSHash(address _recipient, string memory _ipfsHash) public onlySender(_recipient) {
        DataEntry memory newDataEntry = DataEntry(msg.sender, _recipient, _ipfsHash);
        sentDataEntries[msg.sender].push(newDataEntry);
        receivedDataEntries[_recipient].push(newDataEntry);
    }

    function getSentDataEntries() public view returns (DataEntry[] memory) {
        return sentDataEntries[msg.sender];
    }

    function getReceivedDataEntries() public view returns (DataEntry[] memory) {
        return receivedDataEntries[msg.sender];
    }

    function getIPFSHash(address _sender, address _recipient, uint256 _index) public view returns (string memory) {
        require(_index < sentDataEntries[_sender].length, "Index out of bounds");
        require(sentDataEntries[_sender][_index].recipient == _recipient, "Invalid recipient");
        return sentDataEntries[_sender][_index].ipfsHash;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSStorage {
    string private ipfsHash;

    
    function setIPFSHash(string memory _ipfsHash) public {
    
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");

        ipfsHash = _ipfsHash;
    }

    
    function getIPFSHash() public view returns (string memory) {
        return ipfsHash;
    }
}
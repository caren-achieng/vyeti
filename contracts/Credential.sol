// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Credential is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address registryAddress) ERC721("Credential", "CRED"){
        contractAddress = registryAddress;
    }

    function createToken(string memory tokenURI)public returns (uint){
        _tokenIds.increment();
        uint256 newCredentialId = _tokenIds.current();
        
        _mint(msg.sender,newCredentialId);
        _setTokenURI(newCredentialId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newCredentialId;
    }
}


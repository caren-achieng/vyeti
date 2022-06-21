// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 


contract CredentialsRegistry is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _credentialsClaimed;

    address owner;

    mapping(uint256 => Credential) private idToCredential;

    struct Credential {
        uint256 tokenId;
        address issuer;
        address owner;
        bool claimed;
    }
   
    event CredentialCreated (
        uint256 indexed tokenId,
        address issuer,
        address owner,
        bool claimed
    );

    constructor() ERC721("Credential", "CRED"){
       owner = payable(msg.sender);
    }

    function createCredentialToken(string memory tokenURI)public returns (uint){
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current(); 
        _mint(msg.sender,newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createCredential(newTokenId);
        return newTokenId;
    }
    function createCredential(
        uint256 tokenId
    ) private{
        idToCredential [tokenId] = Credential(
            tokenId,
            msg.sender,
            address(this),
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        
        emit CredentialCreated(
            tokenId,
            msg.sender,
            address(this),
            false
        );
    }

    function claimCredential(
        uint256 tokenId
    ) public{
        _transfer( address(this), msg.sender, tokenId); 
        idToCredential[tokenId].owner =  msg.sender;
        idToCredential[tokenId].claimed = true;
        _credentialsClaimed.increment();
    }

    function fetchAllCredentials() public view returns (Credential[] memory) {
        uint credentialCount = _tokenIds.current();
        uint currentIndex = 0;
        
        Credential[] memory credentials = new Credential[](credentialCount);

        for (uint i = 0; i < credentialCount; i++) {
            uint currentId = idToCredential[i+1].tokenId;
            Credential storage currentCredential = idToCredential[currentId];
            credentials[currentIndex] = currentCredential;
            currentIndex += 1;   
        }

        return credentials;
    }

    function fetchUnclaimedCredentials() public view returns (Credential[] memory) {
        uint credentialCount = _tokenIds.current();
        uint unclaimedCredentialCount = _tokenIds.current() -_credentialsClaimed.current();
        uint currentIndex = 0;
        
        Credential[] memory credentials = new Credential[](unclaimedCredentialCount);

        for (uint i = 0; i < credentialCount; i++) {
            if(idToCredential[i + 1].owner == address(this)){
                uint currentId = idToCredential[i+1].tokenId;
                Credential storage currentCredential = idToCredential[currentId];
                credentials[currentIndex] = currentCredential;
                currentIndex += 1;
            }
        }

        return credentials;
    }

    function fetchMyCredentials() public view returns (Credential[] memory) {
        uint totalCredentialCount = _tokenIds.current();
        uint myCredentialCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalCredentialCount; i++) {
            if (idToCredential[i + 1].owner == msg.sender) {
                myCredentialCount += 1;
            }
        }
        
        Credential[] memory credentials = new Credential[](myCredentialCount);

        for (uint i = 0; i < totalCredentialCount; i++) {
            if(idToCredential[i + 1].owner == msg.sender){
                uint currentId = i+1;
                Credential storage currentCredential = idToCredential[currentId];
                credentials[currentIndex] = currentCredential;
                currentIndex += 1;
            }
        }

        return credentials;
    }

    function fetchIssuedCredentials() public view returns (Credential[] memory) {
        uint totalCredentialCount = _tokenIds.current();
        uint issuedCredentialCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalCredentialCount; i++) {
            if (idToCredential[i + 1].issuer == msg.sender) {
                issuedCredentialCount += 1;
            }
        }
        
        Credential[] memory credentials = new Credential[](issuedCredentialCount);

        for (uint i = 0; i < totalCredentialCount; i++) {
            if(idToCredential[i + 1].issuer == msg.sender){
                uint currentId = i+1;
                Credential storage currentCredential = idToCredential[currentId];
                credentials[currentIndex] = currentCredential;
                currentIndex += 1;
            }
        }

        return credentials;
    }

    function fetchCredentialById(uint credentialId) public view returns (Credential[] memory) {
        Credential[] memory credentials = new Credential[](1);
        credentials[0]= idToCredential[credentialId];
        return credentials;
    }

    function fetchCredentialsByOwner(address ownerAddress) public view returns (Credential[] memory) {
        uint totalCredentialCount = _tokenIds.current();
        uint CredentialCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalCredentialCount; i++) {
            if (idToCredential[i + 1].owner == ownerAddress) {
                CredentialCount += 1;
            }
        }
        
        Credential[] memory credentials = new Credential[](CredentialCount);

        for (uint i = 0; i < totalCredentialCount; i++) {
            if(idToCredential[i + 1].owner == ownerAddress){
                uint currentId = i+1;
                Credential storage currentCredential = idToCredential[currentId];
                credentials[currentIndex] = currentCredential;
                currentIndex += 1;
            }
        }

        return credentials;
    }

}

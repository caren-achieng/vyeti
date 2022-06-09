// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 

contract CredentialsRegistry is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _credentialIds;
    Counters.Counter private _credentialsClaimed;

    address owner;

    constructor(){
       owner = msg.sender;
    }

    struct Credential {
        uint credentialId;
        address credentialContract;
        uint256 tokenId;
        address issuer;
        address owner;
        bool claimed;
    }

    mapping(uint256 => Credential) private idToCredential;
   
    event CredentialCreated (
        uint indexed credentialId,
        address indexed credentialContract,
        uint256 indexed tokenId,
        address issuer,
        address owner,
        bool claimed
    );

    function createCredential(
        address credentialContract,
        uint256 tokenId
    ) public nonReentrant{
        _credentialIds.increment();
        uint256 credentialId = _credentialIds.current();

        idToCredential [credentialId] = Credential(
            credentialId,
            credentialContract,
            tokenId,
            msg.sender,
            address(this),
            false
        );

        IERC721(credentialContract).transferFrom(msg.sender, address(this), tokenId);
        
        emit CredentialCreated(
            credentialId,
            credentialContract,
            tokenId,
            msg.sender,
            address(this),
            false
        );
    }

    function claimCredential(
        address credentialContract,
        uint256 credentialId
    ) public nonReentrant{
        uint tokenId = idToCredential[credentialId].tokenId;

        IERC721(credentialContract).transferFrom( address(this), msg.sender, tokenId); 
        idToCredential[credentialId].owner =  msg.sender;
        idToCredential[credentialId].claimed = true;
        _credentialsClaimed.increment();
    }

    function fetchAllCredentials() public view returns (Credential[] memory) {
        uint credentialCount = _credentialIds.current();
        uint currentIndex = 0;
        
        Credential[] memory credentials = new Credential[](credentialCount);

        for (uint i = 0; i < credentialCount; i++) {
            uint currentId = idToCredential[i+1].credentialId;
            Credential storage currentCredential = idToCredential[currentId];
            credentials[currentIndex] = currentCredential;
            currentIndex += 1;   
        }

        return credentials;
    }

    function fetchUnclaimedCredentials() public view returns (Credential[] memory) {
        uint credentialCount = _credentialIds.current();
        uint unclaimedCredentialCount = _credentialIds.current() -_credentialsClaimed.current();
        uint currentIndex = 0;
        
        Credential[] memory credentials = new Credential[](unclaimedCredentialCount);

        for (uint i = 0; i < credentialCount; i++) {
            if(idToCredential[i + 1].owner == address(this)){
                uint currentId = idToCredential[i+1].credentialId;
                Credential storage currentCredential = idToCredential[currentId];
                credentials[currentIndex] = currentCredential;
                currentIndex += 1;
            }
        }

        return credentials;
    }

    function fetchMyCredentials() public view returns (Credential[] memory) {
        uint totalCredentialCount = _credentialIds.current();
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
        uint totalCredentialCount = _credentialIds.current();
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
        uint totalCredentialCount = _credentialIds.current();
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

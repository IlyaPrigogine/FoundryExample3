// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MockNFT is ERC721Enumerable {

    using Strings for uint256;

    string public baseURI = "https://test.com";
    string public baseExtension = ".json";

    constructor() ERC721("Member NFT", "MNFT"){}

    function mint(address _to, uint256 _mintAmount) external {
        require(_mintAmount > 0);
        for (uint256 i = 1; i <= _mintAmount; i++)
            _safeMint(_to, totalSupply() + i);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), baseExtension)) : "";
    }

}

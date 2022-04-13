// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Authenticity {

    address private  owner;
    address private originOwner;

    struct ItemData {
        bool isForSale;
        bool isStolen;
        uint256  price;
        uint256 ownersCount;
        string description;
    }

    ItemData public itemData;
    
    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    
    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    /**
     * @dev Set contract deployer as owner and as origin owner
     */
    constructor() {
        owner = msg.sender;
        originOwner = msg.sender;
        emit OwnerSet(address(0), owner);
        itemData.isForSale = false;
        itemData.isStolen = false;
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
        itemData.ownersCount++;
    }

    /**
     * @dev Buy item
     */
    function buy() public payable{
        require(itemData.isForSale, "Not for sale!");
        require (!itemData.isStolen, "Item is stolen");
        require (msg.value >= itemData.price, "You need more ETH");

        itemData.price = msg.value;
        itemData.isForSale = false;
        payable(owner).transfer(address(this).balance);
        owner = msg.sender;
        emit OwnerSet(address(0), owner);
        itemData.ownersCount++;
    }

    /**
     * @dev Set item description, can't ba changed after cell
     */
    // function setItemDescription(string memory _description) public {
    //     require(itemData.ownersCount == 0, "Can't be changed now");
    //     itemData.description = _description;
    // }

    function setPriceWei(uint256 _price) public isOwner {
        itemData.price = _price;
    }

    function setPriceEth(uint256 _price) public isOwner {
        itemData.price = _price;
    }

    function setStolenStatus(bool _isStolen) public isOwner {
        itemData.isStolen = _isStolen;
    }

    function setForSaleStatus(bool _isForSale) public isOwner {
        itemData.isForSale = _isForSale;
    }
    
    function getOwner() external view returns (address) {
        return owner;
    }

    function getOriginOwner() external view returns (address) {
        return originOwner;
    }

    function getItemData() external view returns (ItemData memory) {
        return itemData;
    }

}
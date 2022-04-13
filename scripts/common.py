from brownie import network, config, accounts, Authenticity, Contract
from web3 import Web3


LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]


def get_account():
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])

def get_contract(address):
    contract = Contract.from_abi("Authenticity", address , Authenticity.abi)
    return contract



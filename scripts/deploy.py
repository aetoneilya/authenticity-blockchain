from calendar import LocaleHTMLCalendar
from enum import auto
from brownie import Authenticity, Contract, network, config
from scripts.common import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS

def deploy_authenticity():
    account = get_account()
    print(f"Accaunt {account}")
    authenticity = Authenticity.deploy({"from": account})
    print(f"Contract deployed to {authenticity.address}")
    return authenticity


def main():
    deploy_authenticity()
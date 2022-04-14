import imp
from nis import match
from posixpath import split
import re
from brownie import Authenticity, accounts
from scripts.common import get_account, get_contract
from scripts.deploy import deploy_authenticity
from scripts.qr_creator import qr_create, qr_detect
 

def authenticity_start():
    account = get_account()
    print('Authenticity start')

    print('Enter contract address\nEnter "deploy" to deploy a new one')
    cmd = input("> ").split()
    
    if (cmd[0] == 'deploy'):
        auth_contract = deploy_authenticity(account)
    elif re.match('0x*', cmd[0]):
        auth_contract = get_contract(cmd[0])
    else:
        print(f'Unknown command {cmd[0:]}')
        exit()

 
    while True:
        cmd = input("> ")
        cmd = cmd.lower().split()
        cmdLen = len(cmd)

        if cmd[0] == 'deploy':
            deploy_authenticity(account)
        elif cmd[0] == 'contract last':
            auth_contract = Authenticity[-1]

        elif cmd[0] == 'get':
            if cmd[1:] == ['owner']:
                print(f'Contract owner is {auth_contract.getOwner()}')
            elif cmd[1:] == ['creator']:
                print(f'Contract creator is {auth_contract.getOriginOwner()}')
            elif cmd[1:] == ['item', 'data']:
                itemData = auth_contract.getItemData()
                print(f'For sale: {itemData[0]}')
                print(f'Stole: {itemData[1]}')
                print(f'Price: {itemData[2]}')
                print(f'Number of previous owners: {itemData[3]}')
                print(f'Description: {itemData[4]}\n')
            elif cmdLen >= 2 and cmd[1] == 'address':
                print(f'Contract address {auth_contract.address}')
            elif cmdLen >= 3 and cmd[1] == 'qr':
                qr_create(auth_contract.address, cmd[2])
                print(f'QR successfuly saved as {cmd[2]}')
            else:
                print(f'Unable to get {cmd[1:]}')

        elif cmd[0] == 'set':
            if cmd[1:3] == ['for', 'sale']:
                auth_contract.setForSaleStatus(cmd[3] == 'true')
            elif cmdLen == 4 and cmd[1] == 'price' and cmd[3] == 'wei':
                auth_contract.setPriceWei(int(cmd[2]))
            elif cmdLen == 3 and cmd[1] == ['stolen']:
                auth_contract.setStolenStatus(cmd[2] == 'true')
            else:
                print(f'Unable to set {cmd[1:]}') 
        
        elif cmd == ['buy']:
            if cmdLen >= 1:
                auth_contract.buy({"from": account, "value": int(cmd[1])})

        elif cmd == ['change', 'account']:
            print(f'account address {accounts[int(cmd[2])].address}')
            account = accounts[int(cmd[2])]
        
        elif cmdLen == 4 and cmd[:3] == ['select', 'contract', 'qr']:
            address = qr_detect(cmd[3])
            print(f'Switch to contract {address}')
            auth_contract = get_contract(address)

        elif cmd == ['account']:
            print(f'account address {account.address}')

        elif cmd == ['exit']:
            break

        else:
            print('Error: incorect input')
            print(cmd)

        


def main():
    authenticity_start()
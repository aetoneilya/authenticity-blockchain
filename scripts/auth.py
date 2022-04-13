import imp
from nis import match
from posixpath import split
import re
from brownie import Authenticity, accounts
from scripts.common import get_contract
from scripts.deploy import deploy_authenticity

# def read_authenticity():


def authenticity_start():
    print('Authenticity start')

    print('Enter contract address\nEnter "deploy" to deploy a new one')
    cmd = input("> ").split()
    
    if (cmd[0] == 'deploy'):
        auth_contract = deploy_authenticity()
    elif re.match('0x', cmd[0]):
        auth_contract = get_contract(cmd[0])
    else:
        print("Error")
        exit()


    while True:
        cmd = input("> ")
        cmd = cmd.lower().split()
        cmdLen = len(cmd)

        if cmd[0] == 'deploy':
            deploy_authenticity()
        elif cmd[0] == 'contract last':
            auth_contract = Authenticity[-1]

        elif cmd[0] == 'get' and cmdLen >= 2:
            if cmd[1] == 'owner':
                print(f'Contract owner is {auth_contract.getOwner()}')
            elif cmd[1] == 'creator':
                print(f'Contract creator is {auth_contract.getOriginOwner()}')
            elif cmd[1] == 'item' and cmd[2] == 'data':
                itemData = auth_contract.getItemData()
                print(f'For sale: {itemData[0]}')
                print(f'Stole: {itemData[1]}')
                print(f'Price: {itemData[2]}')
                print(f'Number of previous owners: {itemData[3]}')
                print(f'Description: {itemData[4]}\n')

        elif cmd[0] == 'set':
            if cmdLen >= 3 and cmd[1] == 'for' and cmd[2] == 'sale':
                auth_contract.setForSaleStatus(cmd[3] == 'true')
            elif cmdLen >= 4 and cmd[1] == 'price' and cmd[3] == 'wei':
                auth_contract.setPriceWei(int(cmd[2]))
            elif cmdLen >= 2 and cmd[1] == 'stolen':
                auth_contract.setStolenStatus(cmd[2] == 'true') 
        
        elif cmd[0] == 'exit':
            break

        else:
            print('Error: incorect input')

        


def main():
    authenticity_start()
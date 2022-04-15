from calendar import LocaleHTMLCalendar
from enum import auto
from importlib.abc import Loader
from brownie import Authenticity, Contract, network, config
import yaml
from scripts.common import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS
import yaml
import json
import os
import shutil

def deploy_authenticity(account, front_end_update=False):
    authenticity = Authenticity.deploy({"from": account})
    print(f"Contract deployed to {authenticity.address}")
    if front_end_update:
        update_front_end()
    return authenticity

def update_front_end():
    
    copy_folders_to_front_end("./build", "./front_end/src/chain-info")

    with open("brownie-config.yaml","r") as brownie_config:
            config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
            with open("./front_end/src/brownie-config.json", "w") as brownie_config_json:
                json.dump(config_dict, brownie_config_json)
    print("Front end updated")

def copy_folders_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)

def main():
    account = get_account()
    print(f"Accaunt {account}")
    deploy_authenticity(account, front_end_update=True)
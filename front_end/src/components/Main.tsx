import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"

export const Main = () => {
    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    console.log(chainId)
    console.log(networkName)
    
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["Authenticity"][0] : constants.AddressZero
    console.log(dappTokenAddress)
    return (<div>Hi i am main!</div>)
}
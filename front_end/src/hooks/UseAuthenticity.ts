import { Contract } from "@ethersproject/contracts"
import { useContractFunction, useCall} from "@usedapp/core"
import Authenticity from "../chain-info/contracts/Authenticity.json"
import { utils } from "ethers"

const getAuthenticityContract = (contractAddress: string) => {
    const { abi } = Authenticity
    const authenticityInterface = new utils.Interface(abi)
    const authenticityContract = new Contract(contractAddress, authenticityInterface)
    return authenticityContract
}

export const useGetOwner = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)

    const { value: owner, error } = useCall(contractAddress && {
        contract: authenticityContract,
        method: 'getOwner',
        args: []
    }) ?? {}

    if (error) {
        console.error(error.message)
        return undefined
    }

    return owner?.[0]
}

export const useGetOriginOwner = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)

    const { value: originOwner, error } = useCall(contractAddress && {
        contract: authenticityContract,
        method: 'getOriginOwner',
        args: []
    }) ?? {}

    if (error) {
        console.error(error.message)
        return undefined
    }

    return originOwner?.[0]
}

export const useGetItemData = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)

    const { value: itemData, error } = useCall(contractAddress && {
        contract: authenticityContract,
        method: 'getItemData',
        args: []
    }) ?? {}

    if (error) {
        console.error(error.message)
        return undefined
    }

    return itemData?.[0]
}

export const UseChangeOwner = ( newOwnerAddress: string, contractAddress: string ) => {
    const authenticityContract = getAuthenticityContract(contractAddress)
    const { state, send } = useContractFunction(authenticityContract, 'changeOwner', { transactionName: 'changeOwner' })

    send(newOwnerAddress)
}



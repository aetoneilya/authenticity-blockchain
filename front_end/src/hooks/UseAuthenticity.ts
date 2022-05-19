import { Contract } from "@ethersproject/contracts"
import { useContractFunction, useCall } from "@usedapp/core"
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

export const useGetIsForSale = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)

    const { value: forSale, error } = useCall(contractAddress && {
        contract: authenticityContract,
        method: 'getIsForSale',
        args: []
    }) ?? {}

    if (error) {
        console.error(error.message)
        return undefined
    }

    return forSale?.[0]
}

export const useGetIsStolen = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)

    const { value: isStolen, error } = useCall(contractAddress && {
        contract: authenticityContract,
        method: 'getIsStolen',
        args: []
    }) ?? {}

    if (error) {
        console.error(error.message)
        return undefined
    }

    return isStolen?.[0]
}

export const useGetPriceWei = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)

    const { value: priceWei, error } = useCall(contractAddress && {
        contract: authenticityContract,
        method: 'getPriceWei',
        args: []
    }) ?? {}

    if (error) {
        console.error(error.message)
        return undefined
    }

    return priceWei?.[0]
}

export const useGetDescription = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)

    const { value: description, error } = useCall(contractAddress && {
        contract: authenticityContract,
        method: 'getDescription',
        args: []
    }) ?? {}

    if (error) {
        console.error(error.message)
        return undefined
    }

    return description?.[0]
}

export const useChangeOwner = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)
    const { state, send } = useContractFunction(authenticityContract, 'changeOwner', { transactionName: 'changeOwner' })

    return { state, send }
}

export const useSetPriceWei = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)
    const { state, send } = useContractFunction(authenticityContract, 'setPriceWei', { transactionName: 'changeOwner' })

    return { state, send }
}

export const useSetStolenStatus = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)
    const { state, send } = useContractFunction(authenticityContract, 'setStolenStatus', { transactionName: 'changeOwner' })

    return { state, send }
}

export const useSetForSaleStatus = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)
    const { state, send } = useContractFunction(authenticityContract, 'setForSaleStatus', { transactionName: 'changeOwner' })

    return { state, send }
}

export const useBuy = (contractAddress: string) => {
    const authenticityContract = getAuthenticityContract(contractAddress)
    const { state, send } = useContractFunction(authenticityContract, 'buy', { transactionName: 'changeOwner' })

    return { state, send }
}



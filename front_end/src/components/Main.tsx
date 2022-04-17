import { useEthers, useContractFunction, useCall, useEtherBalance, useTokenBalance, Rinkeby } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import Authenticity from "../chain-info/contracts/Authenticity.json"
import { Contract } from "@ethersproject/contracts"
import { formatUnits } from "@ethersproject/units"
import { Typography, TextField, Button, Grid } from "@material-ui/core"

function useGetOwner(contractAddress: string) {
    const { abi } = Authenticity
    const authenticityInterface = new utils.Interface(abi)
    const authenticityContract = new Contract(contractAddress, authenticityInterface)

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

function useGetOriginOwner(contractAddress: string) {
    const { abi } = Authenticity
    const authenticityInterface = new utils.Interface(abi)
    const authenticityContract = new Contract(contractAddress, authenticityInterface)

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

function useGetItemData(contractAddress: string) {
    const { abi } = Authenticity
    const authenticityInterface = new utils.Interface(abi)
    const authenticityContract = new Contract(contractAddress, authenticityInterface)

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

export const Main = () => {
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    console.log("ChainId: " + chainId)
    console.log("NetworkName: " + networkName)

    const contractAddress = chainId == 42 || chainId == Rinkeby.chainId ? networkMapping[chainId.toString()]["Authenticity"][0] : constants.AddressZero
    console.log(contractAddress)

    //move it later
    const { abi } = Authenticity
    const authenticityInterface = new utils.Interface(abi)
    const authenticityContract = new Contract(contractAddress, authenticityInterface)

    // const owner = useGetOwner(contractAddress)
    // console.log("oh hello value is : " + owner)

    const { account } = useEthers()
    const tokenBalance = useEtherBalance(account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0

    return (<div>
        <Grid>
            <TextField
                required
                fullWidth
                id="conractAddress"
                label="Contract Address"
                name="contract address"
            />
            <Grid>
                <Button>Find</Button>
            </Grid>
        </Grid>

        <Typography variant="h5" component="pre">
            Owner {useGetOwner(contractAddress)} {'\n'}
            Origin owner {useGetOriginOwner(contractAddress)} {'\n'}
            {/* Item data {useGetItemData(contractAddress)} */}

        </Typography>

    </div>)
}
// {contractAddress}/Balance {formattedTokenBalance}/<p>Balance {useEtherBalance(account)?.toString()}</p>
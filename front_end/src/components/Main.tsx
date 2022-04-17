import { useEthers, useContractFunction, useCall, useEtherBalance, useTokenBalance, Rinkeby } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import Authenticity from "../chain-info/contracts/Authenticity.json"
import { Contract } from "@ethersproject/contracts"
import { formatUnits } from "@ethersproject/units"
import { Typography, TextField, Button, Grid, Box } from "@material-ui/core"
import { useGetOwner, useGetOriginOwner } from "../hooks/UseAuthenticity"

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

    const { account } = useEthers()

    return (<div>
            <Grid direction="row" container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <TextField
                        required
                        fullWidth
                        label="Contract Address"
                        name="contract address"
                    />
                </Grid>
                <Grid>
                    <Button>Find</Button>
                </Grid>
            </Grid>

            <Typography variant="h5" component="pre">
                Owner {useGetOwner(contractAddress)} {'\n'}
                Origin owner {useGetOriginOwner(contractAddress)} {'\n'}
                {/* Item data {useGetItemData(contractAddress)} */}

            </Typography>

            <Button
            // onClick={() => sendChangeOwner('0x407027Aea3C4CBB76ca4E9c4d65aB24687C6375b', contractAddress)}
            >
                Change Owner
            </Button>

            <Button>Buy</Button>
            <Button>Set Price</Button>
            <Button>Set for sale</Button>
            <Button>Set stolen status</Button>
    </div>)
}
// {contractAddress}/Balance {formattedTokenBalance}/<p>Balance {useEtherBalance(account)?.toString()}</p>
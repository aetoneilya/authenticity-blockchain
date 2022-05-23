import { useState } from "react"
import { useEthers, Rinkeby } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
// import Authenticity from "../chain-info/contracts/Authenticity.json"
import { Contract } from "@ethersproject/contracts"
import { formatUnits } from "@ethersproject/units"
import { Typography, TextField, Button, Grid, Box, MenuItem, makeStyles, Card, CardContent } from "@material-ui/core"
import {
    useGetOwner, useGetOriginOwner, useGetIsForSale, useGetIsStolen,
    useGetPriceWei, useGetDescription, useChangeOwner, useSetPriceWei,
    useSetForSaleStatus, useSetStolenStatus, useBuy
} from "../hooks/UseAuthenticity"
import { QrReader } from "react-qr-reader"

const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    console.log(newValue)
}

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    }
})

const currencies = [
    {
        value: 'ETH',
        label: 'ETH',
    },
    {
        value: 'WEI',
        label: 'WEI',
    },
];

export const Main = () => {
    const classes = useStyles()

    const { chainId } = useEthers()
    const { account } = useEthers()

    //TODO: replace in prod
    // networkMapping['42']["Authenticity"][0]
    const [contractAddress, setContractAddress] = useState(constants.AddressZero)
    // const contractAddress = chainId === 42 || chainId === Rinkeby.chainId ? networkMapping[chainId.toString()]["Authenticity"][0] : constants.AddressZero
    // var contractAddress = ''

    const networkName = chainId ? helperConfig[chainId] : "dev"
    console.log("ChainId: " + chainId)
    console.log("NetworkName: " + networkName)
    console.log("Current contract: " + contractAddress)

    const { send: changeowner, state: stateChangeOwner } = useChangeOwner(contractAddress)
    const { send: setPriceWei, state: stateSetPrice } = useSetPriceWei(contractAddress)
    const { send: setForSaleStatus, state: stateSetForSale } = useSetForSaleStatus(contractAddress)
    const { send: setStolenStatus, state: stateSetStolen } = useSetStolenStatus(contractAddress)
    const { send: buy, state: stateBuy } = useBuy(contractAddress)

    const [strContract, setStrContract] = useState('')
    const [strNewOwner, setStrNewOwner] = useState('')
    const [newPrice, setNewPrice] = useState('')

    const handleFind = () => {
        console.log("New contract " + strContract)
        setContractAddress(strContract)
        console.log("Contract is " + contractAddress)
    }

    const owner = useGetOwner(contractAddress)
    const originOwner = useGetOriginOwner(contractAddress)
    const isForSale = useGetIsForSale(contractAddress)
    const isStolen = useGetIsStolen(contractAddress)
    const price = useGetPriceWei(contractAddress)
    const description = useGetDescription(contractAddress)

    const isUserOwner = owner === account

    const [data, setData] = useState('No result');

    return (<div>
        <Grid direction="row" container spacing={2} alignItems="center">
            <Grid item xs={8}>
                <TextField
                    onChange={(e) => setStrContract(e.target.value)}
                    className={classes.field}
                    fullWidth
                    label="Contract Address"
                    name="contract address"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={2}>
                <Button onClick={handleFind}> Find</Button>
            </Grid>
        </Grid>

        <Typography variant="h5" component="pre">
            Owner {isUserOwner ? "You" : owner} {'\n'}
            Creator {originOwner} {'\n'}
            {isForSale ? "Open for SALE" : "Not for sale"} {'\n'}
            {isStolen ? "Stolen\n" : ""}
            Price {price?.toString()} Wei {'\n'}
            Description: {description?.toString()} {'\n'}
        </Typography>

        {isUserOwner ?
            (<Grid direction="row" spacing={5} item xs >
                <Grid item xs >
                    <TextField
                        onChange={(e) => setStrNewOwner(e.target.value)}
                        label="New owner address"
                        name="New owner"
                    />
                    <Button
                        onClick={() => changeowner(strNewOwner)}
                    >
                        Change Owner
                    </Button>
                </Grid>
                <Grid alignItems="baseline">
                    <TextField
                        type="number"
                        label="New price"
                        name="New price"
                        onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="currency"
                        value={currencies[1].value}
                        helperText="Please select your currency"
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button onClick={() => setPriceWei(newPrice)}>Set Price</Button>
                </Grid>
                <Grid>
                    <Button onClick={() => setForSaleStatus(!isForSale)}>{isForSale ? "set not for sale" : "set for sale"}</Button>
                </Grid>
                <Grid>
                    <Button onClick={() => setStolenStatus(!isStolen)}>{isForSale ? "set stolen" : "set not stolen"}</Button>
                </Grid>
            </Grid>) :
            (
            <Button onClick={() => buy({ value: price })}>Buy for {price?.toString()} WEI</Button>
            )}

        <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    setContractAddress(result?.getText());
                }
                console.log("qr: " + result?.toString)
            }}
        />
    </div>)
}
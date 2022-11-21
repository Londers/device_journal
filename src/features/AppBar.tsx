import {Button, Grid} from "@mui/material";
import React from "react";
import {Device, DeviceJournalMessage, DevicesMessage} from "../common";
import axios, {AxiosResponse} from "axios";

function AppBar(props: { selectedDevices: (Device | undefined)[], setJournal: Function, deviceInfo: DevicesMessage | undefined, setDeviceInfo: Function }) {
    const handleLoadJournal = () => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/deviceJournal/info"
        } else {
            href = window.location.href + "/info"
        }
        axios.post(href, {devices: props.selectedDevices})
            .then((response: AxiosResponse<DeviceJournalMessage>) => {
                props.setJournal(response.data)
            })
            .catch((error) => window.alert(error.message))
    }

    const handleClearJournal = () => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/deviceJournal/clear"
        } else {
            href = window.location.href + "/clear"
        }
        axios.post(href, {devices: props.selectedDevices})
            .then((response: AxiosResponse<DeviceJournalMessage>) => {
                props.setJournal({})
                const cope: DevicesMessage = JSON.parse(JSON.stringify(props.deviceInfo))
                cope.devices = cope.devices.filter(dev => dev.idevice !== props.selectedDevices[0]?.idevice)
                props.setDeviceInfo(cope)
            })
            .catch((error) => window.alert(error.message))
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            style={{margin: "8px"}}
        >
            {props.selectedDevices && props.selectedDevices.length !== 0 &&
                <>
                    <Button variant="outlined" onClick={handleLoadJournal}>
                        Загрузить журнал
                    </Button>
                    <Button variant="outlined" onClick={handleClearJournal}>
                        Очистить журнал
                    </Button>
                </>
            }
        </Grid>
    )
}

export default AppBar
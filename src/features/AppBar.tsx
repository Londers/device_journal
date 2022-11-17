import {Button} from "@mui/material";
import React, {useEffect} from "react";
import {Device, DeviceJournalMessage, DevicesMessage} from "../common";
import axios, {AxiosResponse} from "axios";

function AppBar(props: { selectedDevices: (Device | undefined)[], setJournal: Function }) {

    // useEffect(() => {
    //     let href = ""
    //     if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    //         href = "https://192.168.115.134:4443/user/Admin/deviceJournal"
    //     } else {
    //         href = window.location.href
    //     }
    //     axios.post(
    //         href,
    //     ).then((response: AxiosResponse<DevicesMessage>) => {
    //         props.setDeviceInfo(response.data)
    //     }).catch((error) => {
    //         window.alert(error.message)
    //     })
    // }, [])

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
        // console.log(href)
    }

    const handleClearJournal = () => {
        console.log("clear")
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleLoadJournal}>
                Загрузить журнал
            </Button>
            <Button variant="outlined" onClick={handleClearJournal}>
                Очистить журнал
            </Button>
        </div>
    )
}

export default AppBar
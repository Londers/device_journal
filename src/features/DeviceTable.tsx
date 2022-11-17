import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {DevicesMessage} from "../common";
import {DataGrid, GridColumns, GridToolbarQuickFilter, ruRU} from "@mui/x-data-grid";

const defaultColumnOptions = {
    editable: false,
    sortable: false,
}

const columns: GridColumns = [
    {
        field: "region",
        headerName: "Регион",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 1,
    }, {
        field: "area",
        headerName: "Район",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 1,
    }, {
        field: "idd",
        headerName: "ID",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 1,
    }, {
        field: "id",
        headerName: "№ модема",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 1,
    }, {
        field: "description",
        headerName: "Описание",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 4,
    },
]

function DeviceTable(props: {deviceInfo: DevicesMessage | undefined, setDeviceInfo: Function, setSelectedIdevices: Function}) {
    useEffect(() => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/deviceJournal"
        } else {
            href = window.location.href
        }
        axios.post(
            href,
        ).then((response: AxiosResponse<DevicesMessage>) => {
            props.setDeviceInfo(response.data)
        }).catch((error) => {
            window.alert(error.message)
        })
    }, [])

    const rows = props.deviceInfo?.devices.map((dev, index) => {
        return {
            ...dev,
            idd: dev.ID,
            id: dev.idevice
        }
    })

    return (
        <div style={{height: "90vh", width: "40%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                checkboxSelection={true}
                onSelectionModelChange={(newSelectionModel) => {
                    console.log(newSelectionModel)
                    props.setSelectedIdevices(newSelectionModel)
                }}
                components={{
                    Toolbar: () => <GridToolbarQuickFilter/>
                }}
                density="comfortable"
            />}
        </div>
    )
}

export default DeviceTable
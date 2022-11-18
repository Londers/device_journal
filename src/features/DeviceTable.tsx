import React, {useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import {DevicesMessage} from "../common";
import {DataGrid, GridColumns, GridToolbarQuickFilter, ruRU} from "@mui/x-data-grid";

const defaultColumnOptions = {
    editable: false,
    sortable: false,
    cellClassName: "table-cell-wrap"
}

const columns: GridColumns = [
    {
        field: "region",
        headerName: "Регион",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 2,
    }, {
        field: "area",
        headerName: "Район",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 2,
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
        flex: 1.5,
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

    const rows = props.deviceInfo?.devices?.map((dev, index) => {
        const region = props.deviceInfo?.regionInfo[dev.region] ?? ""
        return {
            region,
            area: props.deviceInfo?.areaInfo[region][dev.area],
            idd: dev.ID,
            id: dev.idevice,
            description: dev.description
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
                // checkboxSelection={true}
                onSelectionModelChange={(newSelectionModel) => {
                    console.log(newSelectionModel)
                    props.setSelectedIdevices(newSelectionModel)
                }}
                components={{
                    Toolbar: () => <GridToolbarQuickFilter/>
                }}
                density="comfortable"
            />}
            {!rows && <p>Журналов не найдено</p>}
        </div>
    )
}

export default DeviceTable
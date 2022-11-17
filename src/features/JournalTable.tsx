import {DataGrid, GridColumns, GridToolbarQuickFilter, ruRU} from "@mui/x-data-grid";
import React from "react";
import {DeviceJournal, DeviceJournalMessage} from "../common";

const defaultColumnOptions = {
    editable: false,
    sortable: false,
    cellClassName: "table-cell-wrap",
}

const columns: GridColumns = [
    {
        field: "time",
        headerName: "Время",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 1,
    }, {
        field: "info",
        headerName: "Запись",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 4,
    }, {
        field: "record",
        headerName: "Источник",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
        flex: 1,
    }
]

function JournalTable(props: { journal: DeviceJournalMessage | undefined }) {


    const convertToRows = () => {
        let tempRows: DeviceJournal[] = []
        Object.values(props.journal?.deviceJournals ?? {}).forEach(journal => {
            journal.forEach(rec => {
                tempRows.push({
                    ...rec,
                })
            })
        })
        tempRows = tempRows.reverse()
        return tempRows.map((r, index) => {
            return {
                ...r,
                time: new Date(r.time).toLocaleString('ru-RU'),
                id: index
            }
        })
    }

    const rows = convertToRows()

    return (
        <div style={{height: "90vh", width: "60%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                disableSelectionOnClick
                onSelectionModelChange={(newSelectionModel) => {
                    console.log(newSelectionModel)
                    // props.setSelectedIdevices(newSelectionModel)
                }}
                components={{
                    Toolbar: () => <GridToolbarQuickFilter/>
                }}
                density="comfortable"
            />}
        </div>
    )
}

export default JournalTable
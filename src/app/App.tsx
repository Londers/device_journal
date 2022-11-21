import React, {useState} from 'react';
import './App.sass';
import AppBar from "../features/AppBar";
import DeviceTable from "../features/DeviceTable";
import JournalTable from "../features/JournalTable";
import {DeviceJournalMessage, DevicesMessage} from "../common";

function App() {
    const [deviceInfo, setDeviceInfo] = useState<DevicesMessage>()
    const [selectedIdevices, setSelectedIdevices] = useState<number[]>([])
    const [journal, setJournal] = useState<DeviceJournalMessage>()

    return (
        <div className="App">
            <div style={{height: "10%", width: "40%"}}>
                <AppBar setJournal={setJournal}
                        selectedDevices={selectedIdevices.map(idevice => deviceInfo?.devices.find(dev => dev.idevice === idevice))}
                        deviceInfo={deviceInfo}
                        setDeviceInfo={setDeviceInfo}
                />
            </div>
            <div style={{display: "inline-flex", width: "100%"}}>
                <DeviceTable deviceInfo={deviceInfo} setDeviceInfo={setDeviceInfo}
                             setSelectedIdevices={setSelectedIdevices}/>
                <JournalTable journal={journal}/>
            </div>
        </div>
    );
}

export default App;

export interface DevicesMessage {
    areaInfo: AreaInfo;
    devices: Device[];
    message: string;
    regionInfo: RegionInfo;
}

export interface Device {
    region: string;
    area: string;
    ID: number;
    description: string;
    idevice: number;
}

export interface RegionInfo {
    [index: string]: string
}

export interface AreaInfo {
    [index: string]: Area
}

export interface Area {
    [index: string]: string
}


export interface DeviceJournal {
    time: Date;
    info: string;
    record: string;
}

export interface DeviceJournalMessage {
    deviceJournals: { [index: number]: DeviceJournal[] };
    message: string;
}
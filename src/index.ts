declare const com: any;

export const BlufiClient = com.esp32.blufi.BlufiClient;
export const BlufiCallback = com.esp32.blufi.BlufiCallback;

export const BlufiConfigureParams = com.esp32.blufi.params.BlufiConfigureParams;

BlufiConfigureParams.prototype["setStaSSID"] = function(SSID: string) {
    let arr = Array.create("byte", SSID.length);
    let encoder = new TextEncoder();
    let bytes = encoder.encode(SSID);

    SSID
    .split('')
    .forEach((char: string, index: number) => 
        arr[index] = new java.lang.Byte(bytes[index]));

    this.setStaSSIDBytes(arr);
}

export const BlufiScanResult = com.esp32.blufi.response.BlufiScanResult;
export const BlufiStatusResponse = com.esp32.blufi.response.BlufiStatusResponse;
export const BlufiVersionResponse = com.esp32.blufi.response.BlufiVersionResponse;

export class BlufiUuids{
    public static Service: java.util.UUID = java.util.UUID.fromString("0000ffff-0000-1000-8000-00805f9b34fb");
    public static WriteCharacteristic: java.util.UUID  = java.util.UUID.fromString("0000ff01-0000-1000-8000-00805f9b34fb");
    public static NotificationCharacteristic: java.util.UUID  = java.util.UUID.fromString("0000ff02-0000-1000-8000-00805f9b34fb");
    public static NotificationDescriptor: java.util.UUID  = java.util.UUID.fromString("00002902-0000-1000-8000-00805f9b34fb");
}

export enum Direction{
    Output,
    Input
}

export enum OpMode{
    Null,
    Station,
    SoftAP,
    StationSoftAp
}

export enum SoftAPSecurity{
    Open,
    WEP,
    WPA,
    WPA2,
    WPA_WPA2
}
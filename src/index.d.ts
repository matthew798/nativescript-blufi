declare module '@freevse/nativescript-blufi'{
    export class BlufiClient{
        constructor(ctx: android.content.Context, dev: android.bluetooth.BluetoothDevice);
        public requestDeviceStatus(): void;
        public setGattCallback(gattCb: android.bluetooth.BluetoothGattCallback): void;
        public requestDeviceVersion(): void;
        public requestDeviceWifiScan(): void;
        public close(): void;
        public setPostPackageLengthLimit(length: number): void;
        public postCustomData(data: native.Array<number>): void;
        public negotiateSecurity(): void;
        public connect(): void;
        public configure(params: BlufiConfigureParams): void;
        public setBlufiCallback(blufiCb: BlufiCallback): void;
        public requestCloseConnection(): void;
    }

    export abstract class BlufiCallback {
        public static class: java.lang.Class<com.esp32.blufi.BlufiCallback>;
        public static STATUS_SUCCESS: number;
        public static CODE_INVALID_NOTIFICATION: number;
        public static CODE_CATCH_EXCEPTION: number;
        public static CODE_WRITE_DATA_FAILED: number;
        public static CODE_INVALID_DATA: number;
        public static CODE_NEG_POST_FAILED: number;
        public static CODE_NEG_ERR_DEV_KEY: number;
        public static CODE_NEG_ERR_SECURITY: number;
        public static CODE_NEG_ERR_SET_SECURITY: number;
        public static CODE_CONF_INVALID_OPMODE: number;
        public static CODE_CONF_ERR_SET_OPMODE: number;
        public static CODE_CONF_ERR_POST_STA: number;
        public static CODE_CONF_ERR_POST_SOFTAP: number;
        public abstract onReceiveCustomData(client: com.esp32.blufi.BlufiClient, status: number, data: native.Array<number>): void;
        public abstract onGattPrepared(client: com.esp32.blufi.BlufiClient, gatt: android.bluetooth.BluetoothGatt, svc: android.bluetooth.BluetoothGattService, writeChar: android.bluetooth.BluetoothGattCharacteristic, notifyChar: android.bluetooth.BluetoothGattCharacteristic): void;
        /** @deprecated use {@link #onPostConfigureParams(BlufiClient, int)}*/
        public abstract onConfigureResult(client: com.esp32.blufi.BlufiClient, status: number): void;
        public abstract onPostConfigureParams(client: com.esp32.blufi.BlufiClient, status: number): void;
        public abstract onDeviceStatusResponse(client: com.esp32.blufi.BlufiClient, status: number, response: com.esp32.blufi.response.BlufiStatusResponse): void;
        public abstract onNegotiateSecurityResult(client: com.esp32.blufi.BlufiClient, status: number): void;
        public abstract onPostCustomDataResult(client: com.esp32.blufi.BlufiClient, status: number, data: native.Array<number>): void;
        public abstract onError(client: com.esp32.blufi.BlufiClient, errorCode: number): void;
        public abstract onDeviceVersionResponse(client: com.esp32.blufi.BlufiClient, status: number, reponse: com.esp32.blufi.response.BlufiVersionResponse): void;
        public abstract onGattNotification(client: com.esp32.blufi.BlufiClient, pkType: number, subType: number, data: native.Array<number>): boolean;
        public abstract onDeviceScanResult(client: com.esp32.blufi.BlufiClient, status: number, results: java.util.List<com.esp32.blufi.response.BlufiScanResult>): void;
        public constructor();
    }

    export class BlufiConfigureParams {
        public static class: java.lang.Class<com.esp32.blufi.params.BlufiConfigureParams>;
        public setSoftAPPAssword(param0: string): void;
        public getOpMode(): number;
        public getSoftAPMaxConnection(): number;
        public getStaSSIDBytes(): native.Array<number>;
        public setStaSSIDBytes(param0: native.Array<number>): void;
        public setStaSSID(SSID: string): void;
        public getStaBSSID(): string;
        public getSoftAPSSID(): string;
        public getSoftAPSecurity(): number;
        public getSoftAPPassword(): string;
        public setSoftAPSSID(param0: string): void;
        public getStaPassword(): string;
        public setSoftAPChannel(param0: number): void;
        public toString(): string;
        public constructor();
        public setOpMode(param0: number): void;
        public setStaBSSID(param0: string): void;
        public setSoftAPSecurity(param0: number): void;
        public setSoftAPMaxConnection(param0: number): void;
        public setStaPassword(param0: string): void;
        public getSoftAPChannel(): number;
    }

    export class BlufiScanResult {
        public static class: java.lang.Class<com.esp32.blufi.response.BlufiScanResult>;
        public static TYPE_WIFI: number;
        public getType(): number;
        public toString(): string;
        public getRssi(): number;
        public constructor();
        public setSsid(ssid: string): void;
        public setType(type: number): void;
        public getSsid(): string;
        public setRssi(rssi: number): void;
    }

    export class BlufiStatusResponse {
        public static class: java.lang.Class<com.esp32.blufi.response.BlufiStatusResponse>;
        public setStaSSID(ssid: string): void;
        public setSoftAPMaxConnectionCount(count: number): void;
        public getStaConnectionStatus(): number;
        public getSoftAPSSID(): string;
        public getSoftAPSecurity(): number;
        public setSoftAPSecrity(security: number): void;
        public setSoftAPSSID(ssid: string): void;
        public getSoftAPConnectionCount(): number;
        public setStaConnectionStatus(status: number): void;
        public constructor();
        public getSoftAPChannel(): number;
        public setStaPassword(pass: string): void;
        public setSoftAPConnectionCount(count: number): void;
        public getOpMode(): number;
        public getStaBSSID(): string;
        public getSoftAPPassword(): string;
        public getStaPassword(): string;
        public setSoftAPChannel(chan: number): void;
        public generateValidInfo(): string;
        public isStaConnectWifi(): boolean;
        public setOpMode(mode: number): void;
        public setStaBSSID(bssid: string): void;
        public setSoftAPPassword(pass: string): void;
        public getStaSSID(): string;
        public getSoftAPMaxConnectionCount(): number;
    }

    export class BlufiVersionResponse {
        public static class: java.lang.Class<com.esp32.blufi.response.BlufiVersionResponse>;
        public constructor();
        public getVersionString(): string;
        public setVersionValues(bigVer: number, smallVer: number): void;
    }

    export class BlufiUuids{
        public static Service: java.util.UUID;
        public static WriteCharacteristic: java.util.UUID;
        public static NotificationCharacteristic: java.util.UUID;
        public static NotificationDescriptor: java.util.UUID;
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
}
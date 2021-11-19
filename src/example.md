```typescript
import { Peripheral } from '@nativescript-community/ble';
import { EventData, Frame, ItemEventData, Page } from '@nativescript/core';
import { ConfigureDeviceViewModel } from './configure-device-view-model';
import * as application from '@nativescript/core/application';
import { BlufiClient, BlufiCallback, BlufiUuids, BlufiStatusResponse, BlufiScanResult, BlufiVersionResponse, BlufiConfigureParams, OpMode } from '@freevse/nativescript-blufi';

let _client: BlufiClient;
let _page: Page;

export function navigatingTo(args: EventData) {
	_page = <Page>args.object;
	let peripheral = _page.navigationContext['svc'] as Peripheral;
	_page.bindingContext = new ConfigureDeviceViewModel(peripheral);
	let btDev = android.bluetooth.BluetoothAdapter.getDefaultAdapter().getRemoteDevice(peripheral.UUID);

	let ctx = application.android.context;

	_client = new BlufiClient(ctx, btDev)

	_client.setGattCallback(new GattCallback(_client))// This is weird...
	_client.setBlufiCallback(new BlufiCallbackImpl());
	_client.connect();
}

export function navigatingFrom(args: EventData){
	_client.close();
}

export function onConfigureTap(args: EventData){
	let model = _page.bindingContext as ConfigureDeviceViewModel;

	let params = new BlufiConfigureParams();

	params.setOpMode(OpMode.Station);
	params.setStaSSID(model.SSID);
	params.setStaPassword(model.Pass);

	_client.configure(params);
}

function strToJavaByteArray(input: string): native.Array<number>{
	let arr = Array.create("byte", input.length)

	let encoder = new TextEncoder();
	let bytes = encoder.encode(input);

	bytes.forEach(val =>{
		arr[0] = val;
	})

	return arr;
}

@NativeClass()
class GattCallback extends android.bluetooth.BluetoothGattCallback{
	private _client: BlufiClient;

	constructor(client: BlufiClient){
		super();

		this._client = client;
	}

	onConnectionStateChange(gatt: android.bluetooth.BluetoothGatt, status: number, newState: number): void{
		if(status == android.bluetooth.BluetoothGatt.GATT_SUCCESS){
			switch (newState) {
				case android.bluetooth.BluetoothProfile.STATE_CONNECTED:
					//Connected
					break;
				case android.bluetooth.BluetoothProfile.STATE_DISCONNECTED:
					//Disconnected
					gatt.close();
					break;
				default:
					throw new Error("Invalid bluetooth state");
					break;
			}
		}
	}

	onMtuChanged(gatt: android.bluetooth.BluetoothGatt, mtu: number, status: number) {
		if (status == android.bluetooth.BluetoothGatt.GATT_SUCCESS) {
			console.info(`Set mtu complete, mtu = ${mtu}`);
		} else {
			this._client.setPostPackageLengthLimit(20);
			console.warn(`Set mtu failed, mtu = ${mtu}, status = ${status}`);
		}
	}

	onServicesDiscovered(gatt: android.bluetooth.BluetoothGatt, status: number) {
		if (status != android.bluetooth.BluetoothGatt.GATT_SUCCESS) {
			gatt.disconnect();
			console.warn(`Discover services error, status = ${status}`);
		}
	}

	onDescriptorWrite(gatt: android.bluetooth.BluetoothGatt, descriptor: android.bluetooth.BluetoothGattDescriptor, status: number) {
		if (descriptor.getUuid().equals(BlufiUuids.NotificationDescriptor) &&
				descriptor.getCharacteristic().getUuid().equals(BlufiUuids.NotificationCharacteristic)) {
					if(status != android.bluetooth.BluetoothGatt.GATT_SUCCESS){
						console.info(`Set notification enable failed`);
					}
		}
	}

	onCharacteristicWrite(gatt: android.bluetooth.BluetoothGatt, characteristic: android.bluetooth.BluetoothGattCharacteristic, status: number) {
		if (status != android.bluetooth.BluetoothGatt.GATT_SUCCESS) {
			gatt.disconnect();
			console.warn(`Write Characteristic error, status = ${status}`);
		}
	}
}

@NativeClass()
class BlufiCallbackImpl extends BlufiCallback{
	onReceiveCustomData(client: BlufiClient, status: number, data: native.Array<number>): void{
		console.log("rcv Custom data")
	}
	onGattPrepared(client: BlufiClient, gatt: android.bluetooth.BluetoothGatt, svc: android.bluetooth.BluetoothGattService, writeChar: android.bluetooth.BluetoothGattCharacteristic, notifyChar: android.bluetooth.BluetoothGattCharacteristic): void{
		console.log("Gatt prepared")
	}

	/** @deprecated use {@link #onPostConfigureParams(BlufiClient, int)}*/
	onConfigureResult(client: BlufiClient, status: number): void{
		console.log("Configure result")
	}

	onPostConfigureParams(client: BlufiClient, status: number): void{
		console.log(`post config params. Status = ${status}`);
	}

	onDeviceStatusResponse(client: BlufiClient, status: number, response: BlufiStatusResponse): void{
		console.log("status response")
	}

	onNegotiateSecurityResult(client: BlufiClient, status: number): void{
		console.log("negotiate security result")
	}

	onPostCustomDataResult(client: BlufiClient, status: number, data: native.Array<number>): void{
		console.log("post Custom data")
	}

	onError(client: BlufiClient, errorCode: number): void{
		console.log("error")
	}

	onDeviceVersionResponse(client: BlufiClient, status: number, reponse: BlufiVersionResponse): void{
		console.log("version response")
	}

	onGattNotification(client: BlufiClient, pkType: number, subType: number, data: native.Array<number>): boolean{
		console.log(`Gatt Notification. package type = ${pkType}, subtype = ${subType}, data = ${data}`)
		return false;
	}

	onDeviceScanResult(client: BlufiClient, status: number, results: java.util.List<BlufiScanResult>): void{
		console.log("Scan result")
	}
	
}
```
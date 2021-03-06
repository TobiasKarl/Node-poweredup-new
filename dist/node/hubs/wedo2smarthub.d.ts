/// <reference types="node" />
import { Peripheral } from "@abandonware/noble";
import { IBLEAbstraction } from "../interfaces";
import { BaseHub } from "./basehub";
/**
 * The WeDo2SmartHub is emitted if the discovered device is a WeDo 2.0 Smart Hub.
 * @class WeDo2SmartHub
 * @extends BaseHub
 */
export declare class WeDo2SmartHub extends BaseHub {
    static IsWeDo2SmartHub(peripheral: Peripheral): boolean;
    private _lastTiltX;
    private _lastTiltY;
    constructor(device: IBLEAbstraction);
    connect(): Promise<void>;
    /**
     * Shutdown the Hub.
     * @method WeDo2SmartHub#shutdown
     * @returns {Promise} Resolved upon successful disconnect.
     */
    shutdown(): Promise<void>;
    /**
     * Set the name of the Hub.
     * @method WeDo2SmartHub#setName
     * @param {string} name New name of the hub (14 characters or less, ASCII only).
     * @returns {Promise} Resolved upon successful issuance of command.
     */
    setName(name: string): Promise<void>;
    send(message: Buffer, uuid: string): Promise<void>;
    subscribe(portId: number, deviceType: number, mode: number): void;
    unsubscribe(portId: number, deviceType: number, mode: number): void;
    private _getCharacteristicNameFromUUID;
    private _parseHighCurrentAlert;
    private _parseBatteryMessage;
    private _parseFirmwareRevisionString;
    private _parsePortMessage;
    private _parseSensorMessage;
}
export declare const PortMap: {
    [portName: string]: number;
};

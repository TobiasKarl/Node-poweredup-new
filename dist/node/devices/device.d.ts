/// <reference types="node" />
import { EventEmitter } from "events";
import { IDeviceInterface } from "../interfaces";
import * as Consts from "../consts";
/**
 * @class Device
 * @extends EventEmitter
 */
export declare class Device extends EventEmitter {
    autoSubscribe: boolean;
    values: {
        [event: string]: any;
    };
    protected _mode: number | undefined;
    protected _busy: boolean;
    protected _finishedCallbacks: (() => void)[];
    private _hub;
    private _portId;
    private _connected;
    private _type;
    private _modeMap;
    private _isWeDo2SmartHub;
    private _isVirtualPort;
    private _eventTimer;
    constructor(hub: IDeviceInterface, portId: number, modeMap?: {
        [event: string]: number;
    }, type?: Consts.DeviceType);
    /**
     * @readonly
     * @property {boolean} connected Check if the device is still attached.
     */
    get connected(): boolean;
    /**
     * @readonly
     * @property {Hub} hub The Hub the device is attached to.
     */
    get hub(): IDeviceInterface;
    get portId(): number;
    /**
     * @readonly
     * @property {string} portName The port the device is attached to.
     */
    get portName(): string | undefined;
    /**
     * @readonly
     * @property {number} type The type of the device
     */
    get type(): Consts.DeviceType;
    get typeName(): string;
    /**
     * @readonly
     * @property {number} mode The mode the device is currently in
     */
    get mode(): number | undefined;
    protected get isWeDo2SmartHub(): boolean;
    /**
     * @readonly
     * @property {boolean} isVirtualPort Is this device attached to a virtual port (ie. a combined device)
     */
    protected get isVirtualPort(): boolean;
    writeDirect(mode: number, data: Buffer): Promise<void>;
    send(data: Buffer, characteristic?: string): Promise<void>;
    subscribe(mode: number): void;
    unsubscribe(mode: number): void;
    receive(message: Buffer): void;
    notify(event: string, values: any): void;
    requestUpdate(): void;
    finish(message: number): void;
    setEventTimer(timer: NodeJS.Timer): void;
    cancelEventTimer(): void;
    private _ensureConnected;
}

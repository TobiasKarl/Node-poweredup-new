import { Peripheral } from "@abandonware/noble";
import { IBLEAbstraction } from "../interfaces";
import { LPF2Hub } from "./lpf2hub";
/**
 * The TechnicSmallHub is emitted if the discovered device is a Technic Small Hub.
 * @class Hub
 * @extends LPF2Hub
 * @extends BaseHub
 */
export declare class TechnicSmallHub extends LPF2Hub {
    static IsTechnicSmallHub(peripheral: Peripheral): boolean;
    protected _currentPort: number;
    constructor(device: IBLEAbstraction);
    connect(): Promise<void>;
}
export declare const PortMap: {
    [portName: string]: number;
};

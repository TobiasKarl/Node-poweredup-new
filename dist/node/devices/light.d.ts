import { Device } from "./device";
import { IDeviceInterface } from "../interfaces";
/**
 * @class Light
 * @extends Device
 */
export declare class Light extends Device {
    constructor(hub: IDeviceInterface, portId: number);
    /**
     * Set the light brightness.
     * @method Light#setBrightness
     * @param {number} brightness Brightness value between 0-100 (0 is off)
     * @returns {Promise} Resolved upon successful completion of command.
     */
    setBrightness(brightness: number, interrupt?: boolean): Promise<void>;
    /**
     * Ramp the light brightness.
     * @method Light#rampBrightness
     * @param {number} fromBrightness Brightness value between 0-100 (0 is off)
     * @param {number} toBrightness Brightness value between 0-100 (0 is off)
     * @param {number} time How long the ramp should last (in milliseconds).
     * @returns {Promise} Resolved upon successful completion of command.
     */
    rampBrightness(fromBrightness: number, toBrightness: number, time: number): Promise<unknown>;
}

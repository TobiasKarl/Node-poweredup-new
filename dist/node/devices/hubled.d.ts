import { Device } from "./device";
import { IDeviceInterface } from "../interfaces";
/**
 * @class HubLED
 * @extends Device
 */
export declare class HubLED extends Device {
    constructor(hub: IDeviceInterface, portId: number);
    /**
     * Set the color of the LED on the Hub via a color value.
     * @method HubLED#setColor
     * @param {Color} color
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setColor(color: number | boolean): Promise<void>;
    /**
     * Set the color of the LED on the Hub via RGB values.
     * @method HubLED#setRGB
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setRGB(red: number, green: number, blue: number): Promise<void>;
}
export declare enum Mode {
    COLOR = 0,
    RGB = 1
}

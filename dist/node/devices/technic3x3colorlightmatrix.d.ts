import { Device } from "./device";
import { IDeviceInterface } from "../interfaces";
/**
 * @class Technic3x3ColorLightMatrix
 * @extends Device
 */
export declare class Technic3x3ColorLightMatrix extends Device {
    constructor(hub: IDeviceInterface, portId: number);
    /**
     * Set the LED matrix, one color per LED
     * @method Technic3x3ColorLightMatrix#setMatrix
     * @param {Color[] | Color} colors Array of 9 colors, 9 Color objects, or a single color
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setMatrix(colors: number[] | number): Promise<void>;
}
export declare enum Mode {
    LEV_0 = 0,
    COL_0 = 1,
    PIX_0 = 2,
    TRANS = 3
}

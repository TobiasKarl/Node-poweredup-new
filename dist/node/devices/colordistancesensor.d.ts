/// <reference types="node" />
import { Device } from "./device";
import { IDeviceInterface } from "../interfaces";
/**
 * @class ColorDistanceSensor
 * @extends Device
 */
export declare class ColorDistanceSensor extends Device {
    constructor(hub: IDeviceInterface, portId: number);
    receive(message: Buffer): void;
    /**
     * Switches the IR receiver into extended channel mode. After setting this, use channels 5-8 instead of 1-4 for this receiver.
     *
     * NOTE: Calling this with channel 5-8 with switch off extended channel mode for this receiver.
     * @method ColorDistanceSensor#setPFExtendedChannel
     * @param {number} channel Channel number, between 1-8
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setPFExtendedChannel(channel: number): Promise<void>;
    /**
     * Set the power of a Power Functions motor via IR
     * @method ColorDistanceSensor#setPFPower
     * @param {number} channel Channel number, between 1-4
     * @param {string} output Outport port, "RED" (A) or "BLUE" (B)
     * @param {number} power -7 (full reverse) to 7 (full forward). 0 is stop. 8 is brake.
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setPFPower(channel: number, output: Output, power: number): Promise<void>;
    /**
     * Start Power Functions motors running via IR
     *
     * NOTE: This command is designed for bang-bang style operation. To keep the motors running, the sensor needs to be within range of the IR receiver constantly.
     * @method ColorDistanceSensor#startPFMotors
     * @param {Buffer} channel Channel number, between 1-4
     * @param {Buffer} powerA -7 (full reverse) to 7 (full forward). 0 is stop. 8 is brake.
     * @param {Buffer} powerB -7 (full reverse) to 7 (full forward). 0 is stop. 8 is brake.
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    startPFMotors(channel: number, powerBlue: number, powerRed: number): Promise<void>;
    /**
     * Send a raw Power Functions IR command
     * @method ColorDistanceSensor#sendPFIRMessage
     * @param {Buffer} message 2 byte payload making up a Power Functions protocol command. NOTE: Only specify nibbles 1-3, nibble 4 should be zeroed.
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    sendPFIRMessage(message: Buffer): Promise<void>;
    /**
     * Set the color of the LED on the sensor via a color value.
     * @method ColorDistanceSensor#setColor
     * @param {Color} color
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setColor(color: number | boolean): Promise<void>;
    private _pfPowerToPWM;
}
export declare enum Mode {
    COLOR = 0,
    DISTANCE = 1,
    LED = 5,
    PF_IR = 7,
    COLOR_AND_DISTANCE = 8
}
export declare const ModeMap: {
    [event: string]: number;
};
export declare enum Output {
    RED = "RED",
    BLUE = "BLUE"
}

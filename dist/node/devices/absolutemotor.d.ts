/// <reference types="node" />
import { TachoMotor } from "./tachomotor";
import { IDeviceInterface } from "../interfaces";
import * as Consts from "../consts";
/**
 * @class AbsoluteMotor
 * @extends TachoMotor
 */
export declare class AbsoluteMotor extends TachoMotor {
    constructor(hub: IDeviceInterface, portId: number, modeMap?: {
        [event: string]: number;
    }, type?: Consts.DeviceType);
    receive(message: Buffer): void;
    /**
     * Rotate a motor by a given angle.
     * @method AbsoluteMotor#gotoAngle
     * @param {number} angle Absolute position the motor should go to (degrees from 0).
     * @param {number} [speed=100] For forward, a value between 1 - 100 should be set. For reverse, a value between -1 to -100.
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    gotoAngle(angle: [number, number] | number, speed?: number): Promise<void>;
    /**
     * Rotate motor to real zero position.
     *
     * Real zero is marked on Technic angular motors (SPIKE Prime). It is also available on Technic linear motors (Control+) but is unmarked.
     * @method AbsoluteMotor#gotoRealZero
     * @param {number} [speed=100] Speed between 1 - 100. Note that this will always take the shortest path to zero.
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    gotoRealZero(speed?: number): Promise<void>;
    /**
     * Reset zero to current position
     * @method AbsoluteMotor#resetZero
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    resetZero(): Promise<void>;
}
export declare enum Mode {
    ROTATION = 2,
    ABSOLUTE = 3
}
export declare const ModeMap: {
    [event: string]: number;
};

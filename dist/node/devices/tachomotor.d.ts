/// <reference types="node" />
import { BasicMotor } from "./basicmotor";
import { IDeviceInterface } from "../interfaces";
import * as Consts from "../consts";
/**
 * @class TachoMotor
 * @extends BasicMotor
 */
export declare class TachoMotor extends BasicMotor {
    protected _brakeStyle: Consts.BrakingStyle;
    protected _maxPower: number;
    useAccelerationProfile: boolean;
    useDecelerationProfile: boolean;
    constructor(hub: IDeviceInterface, portId: number, modeMap?: {
        [event: string]: number;
    }, type?: Consts.DeviceType);
    receive(message: Buffer): void;
    /**
     * Set the braking style of the motor.
     *
     * Note: This applies to setSpeed, rotateByDegrees, and gotoAngle.
     * @method TachoMotor#setBrakingStyle
     * @param {number} style Either BRAKE or HOLD
     */
    setBrakingStyle(style: Consts.BrakingStyle): void;
    /**
     * Set the max power of the motor.
     *
     * Note: This applies to setSpeed, rotateByDegrees, and gotoAngle.
     * @method TachoMotor#setMaxPower
     * @param {number} style Either BRAKE or HOLD
     */
    setMaxPower(maxPower: number): void;
    /**
     * Set the global acceleration time
     * @method TachoMotor#setAccelerationTime
     * @param {number} time How long acceleration should last (in milliseconds).
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    setAccelerationTime(time: number, profile?: number): void;
    /**
     * Set the global deceleration time
     * @method TachoMotor#setDecelerationTime
     * @param {number} time How long deceleration should last (in milliseconds).
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    setDecelerationTime(time: number, profile?: number): void;
    /**
     * Set the motor speed.
     * @method TachoMotor#setSpeed
     * @param {number} speed For forward, a value between 1 - 100 should be set. For reverse, a value between -1 to -100. Stop is 0.
     * @param {number} time How long the motor should run for (in milliseconds).
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setSpeed(speed: [number, number] | number, time: number | undefined): Promise<void>;
    /**
     * Rotate a motor by a given amount of degrees.
     * @method TachoMotor#rotateByDegrees
     * @param {number} degrees How much the motor should be rotated (in degrees).
     * @param {number} [speed=100] For forward, a value between 1 - 100 should be set. For reverse, a value between -1 to -100.
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    rotateByDegrees(degrees: number, speed: [number, number] | number): Promise<void>;
    protected useProfile(): number;
}
export declare enum Mode {
    ROTATION = 2
}
export declare const ModeMap: {
    [event: string]: number;
};

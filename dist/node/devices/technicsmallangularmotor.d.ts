import { AbsoluteMotor } from "./absolutemotor";
import { IDeviceInterface } from "../interfaces";
import * as Consts from "../consts";
/**
 * @class TechnicSmallAngularMotor
 * @extends AbsoluteMotor
 */
export declare class TechnicSmallAngularMotor extends AbsoluteMotor {
    constructor(hub: IDeviceInterface, portId: number, modeMap?: {
        [event: string]: number;
    }, type?: Consts.DeviceType);
}

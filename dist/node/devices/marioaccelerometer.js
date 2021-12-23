"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeMap = exports.Mode = exports.MarioAccelerometer = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class MarioAccelerometer
 * @extends Device
 */
class MarioAccelerometer extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, exports.ModeMap, Consts.DeviceType.MARIO_ACCELEROMETER);
    }
    receive(message) {
        const mode = this._mode;
        switch (mode) {
            case Mode.ACCEL:
                /**
                 * Emits when accelerometer detects movement. Measured in mG.
                 * @event MarioAccelerometer#accel
                 * @type {object}
                 * @param {number} x
                 * @param {number} y
                 * @param {number} z
                 */
                const x = message[4];
                const y = message[5];
                const z = message[6];
                this.notify("accel", { x, y, z });
                break;
            case Mode.GEST:
                /**
                 * Emits when a gesture is detected
                 * @event MarioAccelerometer#gest
                 * @type {object}
                 * @param {number} gesture
                 */
                const gesture = message[4];
                this.notify("gesture", { gesture });
                break;
        }
    }
}
exports.MarioAccelerometer = MarioAccelerometer;
var Mode;
(function (Mode) {
    Mode[Mode["ACCEL"] = 0] = "ACCEL";
    Mode[Mode["GEST"] = 1] = "GEST";
})(Mode = exports.Mode || (exports.Mode = {}));
exports.ModeMap = {
    "accel": Mode.ACCEL,
    "gesture": Mode.GEST,
};
//# sourceMappingURL=marioaccelerometer.js.map
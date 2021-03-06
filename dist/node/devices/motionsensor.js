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
exports.ModeMap = exports.Mode = exports.MotionSensor = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class MotionSensor
 * @extends Device
 */
class MotionSensor extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, exports.ModeMap, Consts.DeviceType.MOTION_SENSOR);
    }
    receive(message) {
        const mode = this._mode;
        switch (mode) {
            case Mode.DISTANCE:
                let distance = message[this.isWeDo2SmartHub ? 2 : 4];
                if (message[this.isWeDo2SmartHub ? 3 : 5] === 1) {
                    distance = distance + 255;
                }
                distance *= 10;
                /**
                 * Emits when a distance sensor is activated.
                 * @event MotionSensor#distance
                 * @type {object}
                 * @param {number} distance Distance, in millimeters.
                 */
                this.notify("distance", { distance });
                break;
        }
    }
}
exports.MotionSensor = MotionSensor;
var Mode;
(function (Mode) {
    Mode[Mode["DISTANCE"] = 0] = "DISTANCE";
})(Mode = exports.Mode || (exports.Mode = {}));
exports.ModeMap = {
    "distance": Mode.DISTANCE
};
//# sourceMappingURL=motionsensor.js.map
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
exports.ModeMap = exports.Mode = exports.MoveHubTiltSensor = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class MoveHubTiltSensor
 * @extends Device
 */
class MoveHubTiltSensor extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, exports.ModeMap, Consts.DeviceType.MOVE_HUB_TILT_SENSOR);
    }
    receive(message) {
        const mode = this._mode;
        switch (mode) {
            case Mode.TILT:
                /**
                 * Emits when a tilt sensor is activated.
                 * @event MoveHubTiltSensor#tilt
                 * @type {object}
                 * @param {number} x
                 * @param {number} y
                 */
                const x = -message.readInt8(4);
                const y = message.readInt8(5);
                this.notify("tilt", { x, y });
                break;
        }
    }
}
exports.MoveHubTiltSensor = MoveHubTiltSensor;
var Mode;
(function (Mode) {
    Mode[Mode["TILT"] = 0] = "TILT";
})(Mode = exports.Mode || (exports.Mode = {}));
exports.ModeMap = {
    "tilt": Mode.TILT
};
//# sourceMappingURL=movehubtiltsensor.js.map
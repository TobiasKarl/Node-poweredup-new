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
exports.ModeMap = exports.Mode = exports.TechnicMediumHubGyroSensor = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class TechnicMediumHubGyroSensor
 * @extends Device
 */
class TechnicMediumHubGyroSensor extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, exports.ModeMap, Consts.DeviceType.TECHNIC_MEDIUM_HUB_GYRO_SENSOR);
    }
    receive(message) {
        const mode = this._mode;
        switch (mode) {
            case Mode.GYRO:
                /**
                 * Emits when gyroscope detects movement. Measured in DPS - degrees per second.
                 * @event TechnicMediumHubGyroSensor#gyro
                 * @type {object}
                 * @param {number} x
                 * @param {number} y
                 * @param {number} z
                 */
                const x = Math.round(message.readInt16LE(4) * 7 / 400);
                const y = Math.round(message.readInt16LE(6) * 7 / 400);
                const z = Math.round(message.readInt16LE(8) * 7 / 400);
                this.notify("gyro", { x, y, z });
                break;
        }
    }
}
exports.TechnicMediumHubGyroSensor = TechnicMediumHubGyroSensor;
var Mode;
(function (Mode) {
    Mode[Mode["GYRO"] = 0] = "GYRO";
})(Mode = exports.Mode || (exports.Mode = {}));
exports.ModeMap = {
    "gyro": Mode.GYRO
};
//# sourceMappingURL=technicmediumhubgyrosensor.js.map
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
exports.ModeMap = exports.Mode = exports.VoltageSensor = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class VoltageSensor
 * @extends Device
 */
class VoltageSensor extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, exports.ModeMap, Consts.DeviceType.VOLTAGE_SENSOR);
    }
    receive(message) {
        const mode = this._mode;
        switch (mode) {
            case Mode.VOLTAGE:
                if (this.isWeDo2SmartHub) {
                    const voltage = message.readInt16LE(2) / 40;
                    this.notify("voltage", { voltage });
                }
                else {
                    let maxVoltageValue = MaxVoltageValue[this.hub.type];
                    if (maxVoltageValue === undefined) {
                        maxVoltageValue = MaxVoltageValue[Consts.HubType.UNKNOWN];
                    }
                    let maxVoltageRaw = MaxVoltageRaw[this.hub.type];
                    if (maxVoltageRaw === undefined) {
                        maxVoltageRaw = MaxVoltageRaw[Consts.HubType.UNKNOWN];
                    }
                    const voltage = message.readUInt16LE(4) * maxVoltageValue / maxVoltageRaw;
                    /**
                     * Emits when a voltage change is detected.
                     * @event VoltageSensor#voltage
                     * @type {object}
                     * @param {number} voltage
                     */
                    this.notify("voltage", { voltage });
                }
                break;
        }
    }
}
exports.VoltageSensor = VoltageSensor;
var Mode;
(function (Mode) {
    Mode[Mode["VOLTAGE"] = 0] = "VOLTAGE";
})(Mode = exports.Mode || (exports.Mode = {}));
exports.ModeMap = {
    "voltage": Mode.VOLTAGE
};
const MaxVoltageValue = {
    [Consts.HubType.UNKNOWN]: 9.615,
    [Consts.HubType.DUPLO_TRAIN_BASE]: 6.4,
    [Consts.HubType.REMOTE_CONTROL]: 6.4,
};
const MaxVoltageRaw = {
    [Consts.HubType.UNKNOWN]: 3893,
    [Consts.HubType.DUPLO_TRAIN_BASE]: 3047,
    [Consts.HubType.REMOTE_CONTROL]: 3200,
    [Consts.HubType.TECHNIC_MEDIUM_HUB]: 4095,
};
//# sourceMappingURL=voltagesensor.js.map
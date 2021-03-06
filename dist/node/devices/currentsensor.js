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
exports.ModeMap = exports.Mode = exports.CurrentSensor = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class CurrentSensor
 * @extends Device
 */
class CurrentSensor extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, exports.ModeMap, Consts.DeviceType.CURRENT_SENSOR);
    }
    receive(message) {
        const mode = this.mode;
        switch (mode) {
            case Mode.CURRENT:
                if (this.isWeDo2SmartHub) {
                    const current = message.readInt16LE(2) / 1000;
                    this.notify("current", { current });
                }
                else {
                    let maxCurrentValue = MaxCurrentValue[this.hub.type];
                    if (maxCurrentValue === undefined) {
                        maxCurrentValue = MaxCurrentValue[Consts.HubType.UNKNOWN];
                    }
                    let maxCurrentRaw = MaxCurrentRaw[this.hub.type];
                    if (maxCurrentRaw === undefined) {
                        maxCurrentRaw = MaxCurrentRaw[Consts.HubType.UNKNOWN];
                    }
                    const current = message.readUInt16LE(4) * maxCurrentValue / maxCurrentRaw;
                    /**
                     * Emits when a current change is detected.
                     * @event CurrentSensor#current
                     * @type {object}
                     * @param {number} current
                     */
                    this.notify("current", { current });
                }
                break;
        }
    }
}
exports.CurrentSensor = CurrentSensor;
var Mode;
(function (Mode) {
    Mode[Mode["CURRENT"] = 0] = "CURRENT";
})(Mode = exports.Mode || (exports.Mode = {}));
exports.ModeMap = {
    "current": Mode.CURRENT
};
const MaxCurrentValue = {
    [Consts.HubType.UNKNOWN]: 2444,
    [Consts.HubType.TECHNIC_MEDIUM_HUB]: 4175,
};
const MaxCurrentRaw = {
    [Consts.HubType.UNKNOWN]: 4095,
};
//# sourceMappingURL=currentsensor.js.map
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
exports.Mode = exports.HubLED = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class HubLED
 * @extends Device
 */
class HubLED extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, {}, Consts.DeviceType.HUB_LED);
    }
    /**
     * Set the color of the LED on the Hub via a color value.
     * @method HubLED#setColor
     * @param {Color} color
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setColor(color) {
        return new Promise((resolve) => {
            if (typeof color === "boolean") {
                color = 0;
            }
            if (this.isWeDo2SmartHub) {
                this.send(Buffer.from([0x06, 0x17, 0x01, 0x01]), Consts.BLECharacteristic.WEDO2_PORT_TYPE_WRITE);
                this.send(Buffer.from([0x06, 0x04, 0x01, color]), Consts.BLECharacteristic.WEDO2_MOTOR_VALUE_WRITE);
            }
            else {
                this.subscribe(Mode.COLOR);
                this.writeDirect(0x00, Buffer.from([color]));
            }
            return resolve();
        });
    }
    /**
     * Set the color of the LED on the Hub via RGB values.
     * @method HubLED#setRGB
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setRGB(red, green, blue) {
        return new Promise((resolve) => {
            if (this.isWeDo2SmartHub) {
                this.send(Buffer.from([0x06, 0x17, 0x01, 0x02]), Consts.BLECharacteristic.WEDO2_PORT_TYPE_WRITE);
                this.send(Buffer.from([0x06, 0x04, 0x03, red, green, blue]), Consts.BLECharacteristic.WEDO2_MOTOR_VALUE_WRITE);
            }
            else {
                this.subscribe(Mode.RGB);
                this.writeDirect(0x01, Buffer.from([red, green, blue]));
            }
            return resolve();
        });
    }
}
exports.HubLED = HubLED;
var Mode;
(function (Mode) {
    Mode[Mode["COLOR"] = 0] = "COLOR";
    Mode[Mode["RGB"] = 1] = "RGB";
})(Mode = exports.Mode || (exports.Mode = {}));
//# sourceMappingURL=hubled.js.map
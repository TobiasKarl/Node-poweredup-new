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
exports.ModeMap = exports.Mode = exports.TechnicDistanceSensor = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class TechnicDistanceSensor
 * @extends Device
 */
class TechnicDistanceSensor extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, exports.ModeMap, Consts.DeviceType.TECHNIC_DISTANCE_SENSOR);
    }
    receive(message) {
        const mode = this._mode;
        switch (mode) {
            case Mode.DISTANCE:
                const distance = message.readUInt16LE(4);
                /**
                 * Emits when the detected distance changes (Slow sampling covers 40mm to 2500mm).
                 * @event TechnicDistanceSensor#distance
                 * @type {object}
                 * @param {number} distance Distance, from 40 to 2500mm
                 */
                this.notify("distance", { distance });
                break;
            case Mode.FAST_DISTANCE:
                const fastDistance = message.readUInt16LE(4);
                /**
                 * Emits when the detected distance changes (Fast sampling covers 50mm to 320mm).
                 * @event TechnicDistanceSensor#fastDistance
                 * @type {object}
                 * @param {number} fastDistance Distance, from 50 to 320mm
                 */
                this.notify("fastDistance", { fastDistance });
                break;
        }
    }
    /**
     * Set the brightness (or turn on/off) of the lights around the eyes.
     * @method TechnicDistanceSensor#setBrightness
     * @param {number} topLeft Top left quadrant (above left eye). 0-100 brightness.
     * @param {number} bottomLeft Bottom left quadrant (below left eye). 0-100 brightness.
     * @param {number} topRight Top right quadrant (above right eye). 0-100 brightness.
     * @param {number} bottomRight Bottom right quadrant (below right eye). 0-100 brightness.
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setBrightness(topLeft, bottomLeft, topRight, bottomRight) {
        this.writeDirect(0x05, Buffer.from([topLeft, topRight, bottomLeft, bottomRight]));
    }
}
exports.TechnicDistanceSensor = TechnicDistanceSensor;
var Mode;
(function (Mode) {
    Mode[Mode["DISTANCE"] = 0] = "DISTANCE";
    Mode[Mode["FAST_DISTANCE"] = 1] = "FAST_DISTANCE";
})(Mode = exports.Mode || (exports.Mode = {}));
exports.ModeMap = {
    "distance": Mode.DISTANCE,
    "fastDistance": Mode.FAST_DISTANCE
};
//# sourceMappingURL=technicdistancesensor.js.map
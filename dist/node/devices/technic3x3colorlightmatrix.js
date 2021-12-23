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
exports.Mode = exports.Technic3x3ColorLightMatrix = void 0;
const color_1 = require("../color");
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class Technic3x3ColorLightMatrix
 * @extends Device
 */
class Technic3x3ColorLightMatrix extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, {}, Consts.DeviceType.TECHNIC_3X3_COLOR_LIGHT_MATRIX);
    }
    /**
     * Set the LED matrix, one color per LED
     * @method Technic3x3ColorLightMatrix#setMatrix
     * @param {Color[] | Color} colors Array of 9 colors, 9 Color objects, or a single color
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    setMatrix(colors) {
        return new Promise((resolve) => {
            this.subscribe(Mode.PIX_0);
            const colorArray = new Array(9);
            for (let i = 0; i < colorArray.length; i++) {
                if (typeof colors === 'number') {
                    // @ts-ignore
                    colorArray[i] = colors + (10 << 4);
                }
                // @ts-ignore
                if (colors[i] instanceof color_1.Color) {
                    // @ts-ignore
                    colorArray[i] = colors[i].toValue();
                }
                // @ts-ignore
                if (colors[i] === Consts.Color.NONE) {
                    colorArray[i] = Consts.Color.NONE;
                }
                // @ts-ignore
                if (colors[i] <= 10) {
                    // @ts-ignore
                    colorArray[i] = colors[i] + (10 << 4); // If a raw color value, set it to max brightness (10)
                }
            }
            this.writeDirect(Mode.PIX_0, Buffer.from(colorArray));
            return resolve();
        });
    }
}
exports.Technic3x3ColorLightMatrix = Technic3x3ColorLightMatrix;
var Mode;
(function (Mode) {
    Mode[Mode["LEV_0"] = 0] = "LEV_0";
    Mode[Mode["COL_0"] = 1] = "COL_0";
    Mode[Mode["PIX_0"] = 2] = "PIX_0";
    Mode[Mode["TRANS"] = 3] = "TRANS";
})(Mode = exports.Mode || (exports.Mode = {}));
//# sourceMappingURL=technic3x3colorlightmatrix.js.map
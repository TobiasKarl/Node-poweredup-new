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
exports.ButtonState = exports.ModeMap = exports.Mode = exports.RemoteControlButton = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class RemoteControlButton
 * @extends Device
 */
class RemoteControlButton extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, exports.ModeMap, Consts.DeviceType.REMOTE_CONTROL_BUTTON);
    }
    receive(message) {
        const mode = this._mode;
        switch (mode) {
            case Mode.BUTTON_EVENTS:
                /**
                 * Emits when a button on the remote is pressed or released.
                 * @event RemoteControlButton#button
                 * @type {object}
                 * @param {number} event
                 */
                const event = message[4];
                this.notify("remoteButton", { event });
                break;
        }
    }
}
exports.RemoteControlButton = RemoteControlButton;
var Mode;
(function (Mode) {
    Mode[Mode["BUTTON_EVENTS"] = 0] = "BUTTON_EVENTS";
})(Mode = exports.Mode || (exports.Mode = {}));
exports.ModeMap = {
    "remoteButton": Mode.BUTTON_EVENTS
};
exports.ButtonState = {
    "UP": 0x01,
    "DOWN": 0xff,
    "STOP": 0x7f,
    "RELEASED": 0x00,
};
//# sourceMappingURL=remotecontrolbutton.js.map
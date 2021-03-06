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
exports.Mode = exports.DuploTrainBaseSpeaker = void 0;
const device_1 = require("./device");
const Consts = __importStar(require("../consts"));
/**
 * @class DuploTrainBaseSpeaker
 * @extends Device
 */
class DuploTrainBaseSpeaker extends device_1.Device {
    constructor(hub, portId) {
        super(hub, portId, {}, Consts.DeviceType.DUPLO_TRAIN_BASE_SPEAKER);
    }
    /**
     * Play a built-in train sound.
     * @method DuploTrainBaseSpeaker#playSound
     * @param {DuploTrainBaseSound} sound
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    playSound(sound) {
        return new Promise((resolve) => {
            this.subscribe(Mode.SOUND);
            this.writeDirect(0x01, Buffer.from([sound]));
            return resolve();
        });
    }
    /**
     * Play a built-in system tone.
     * @method DuploTrainBaseSpeaker#playTone
     * @param {number} tone
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    playTone(tone) {
        this.subscribe(Mode.TONE);
        this.writeDirect(0x02, Buffer.from([tone]));
    }
}
exports.DuploTrainBaseSpeaker = DuploTrainBaseSpeaker;
var Mode;
(function (Mode) {
    Mode[Mode["SOUND"] = 1] = "SOUND";
    Mode[Mode["TONE"] = 2] = "TONE";
})(Mode = exports.Mode || (exports.Mode = {}));
//# sourceMappingURL=duplotrainbasespeaker.js.map
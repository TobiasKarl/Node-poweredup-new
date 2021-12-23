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
exports.TechnicSmallAngularMotor = void 0;
const absolutemotor_1 = require("./absolutemotor");
const Consts = __importStar(require("../consts"));
/**
 * @class TechnicSmallAngularMotor
 * @extends AbsoluteMotor
 */
class TechnicSmallAngularMotor extends absolutemotor_1.AbsoluteMotor {
    constructor(hub, portId, modeMap = {}, type = Consts.DeviceType.TECHNIC_SMALL_ANGULAR_MOTOR) {
        super(hub, portId, {}, type);
    }
}
exports.TechnicSmallAngularMotor = TechnicSmallAngularMotor;
//# sourceMappingURL=technicsmallangularmotor.js.map
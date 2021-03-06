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
exports.PortMap = exports.WeDo2SmartHub = void 0;
const basehub_1 = require("./basehub");
const Consts = __importStar(require("../consts"));
const utils_1 = require("../utils");
const Debug = require("debug");
const debug = Debug("wedo2smarthub");
/**
 * The WeDo2SmartHub is emitted if the discovered device is a WeDo 2.0 Smart Hub.
 * @class WeDo2SmartHub
 * @extends BaseHub
 */
class WeDo2SmartHub extends basehub_1.BaseHub {
    constructor(device) {
        super(device, exports.PortMap, Consts.HubType.WEDO2_SMART_HUB);
        this._lastTiltX = 0;
        this._lastTiltY = 0;
        debug("Discovered WeDo 2.0 Smart Hub");
    }
    static IsWeDo2SmartHub(peripheral) {
        return (peripheral.advertisement &&
            peripheral.advertisement.serviceUuids &&
            peripheral.advertisement.serviceUuids.indexOf(Consts.BLEService.WEDO2_SMART_HUB.replace(/-/g, "")) >= 0);
    }
    connect() {
        return new Promise(async (resolve) => {
            debug("Connecting to WeDo 2.0 Smart Hub");
            await super.connect();
            await this._bleDevice.discoverCharacteristicsForService(Consts.BLEService.WEDO2_SMART_HUB);
            await this._bleDevice.discoverCharacteristicsForService(Consts.BLEService.WEDO2_SMART_HUB_2);
            if (!utils_1.isWebBluetooth) {
                await this._bleDevice.discoverCharacteristicsForService(Consts.BLEService.WEDO2_SMART_HUB_3);
                await this._bleDevice.discoverCharacteristicsForService(Consts.BLEService.WEDO2_SMART_HUB_4);
                await this._bleDevice.discoverCharacteristicsForService(Consts.BLEService.WEDO2_SMART_HUB_5);
            }
            else {
                await this._bleDevice.discoverCharacteristicsForService("battery_service");
                await this._bleDevice.discoverCharacteristicsForService("device_information");
            }
            debug("Connect completed");
            this.emit("connect");
            resolve();
            this._bleDevice.subscribeToCharacteristic(Consts.BLECharacteristic.WEDO2_PORT_TYPE, this._parsePortMessage.bind(this));
            this._bleDevice.subscribeToCharacteristic(Consts.BLECharacteristic.WEDO2_SENSOR_VALUE, this._parseSensorMessage.bind(this));
            this._bleDevice.subscribeToCharacteristic(Consts.BLECharacteristic.WEDO2_BUTTON, this._parseSensorMessage.bind(this));
            if (!utils_1.isWebBluetooth) {
                this._bleDevice.subscribeToCharacteristic(Consts.BLECharacteristic.WEDO2_BATTERY, this._parseBatteryMessage.bind(this));
                this._bleDevice.readFromCharacteristic(Consts.BLECharacteristic.WEDO2_BATTERY, (err, data) => {
                    if (data) {
                        this._parseBatteryMessage(data);
                    }
                });
            }
            else {
                this._bleDevice.readFromCharacteristic("00002a19-0000-1000-8000-00805f9b34fb", (err, data) => {
                    if (data) {
                        this._parseBatteryMessage(data);
                    }
                });
                this._bleDevice.subscribeToCharacteristic("00002a19-0000-1000-8000-00805f9b34fb", this._parseHighCurrentAlert.bind(this));
            }
            this._bleDevice.subscribeToCharacteristic(Consts.BLECharacteristic.WEDO2_HIGH_CURRENT_ALERT, this._parseHighCurrentAlert.bind(this));
            if (!utils_1.isWebBluetooth) {
                this._bleDevice.readFromCharacteristic(Consts.BLECharacteristic.WEDO2_FIRMWARE_REVISION, (err, data) => {
                    if (data) {
                        this._parseFirmwareRevisionString(data);
                    }
                });
            }
            else {
                this._bleDevice.readFromCharacteristic("00002a26-0000-1000-8000-00805f9b34fb", (err, data) => {
                    if (data) {
                        this._parseFirmwareRevisionString(data);
                    }
                });
            }
        });
    }
    /**
     * Shutdown the Hub.
     * @method WeDo2SmartHub#shutdown
     * @returns {Promise} Resolved upon successful disconnect.
     */
    shutdown() {
        return this.send(Buffer.from([0x00]), Consts.BLECharacteristic.WEDO2_DISCONNECT);
    }
    /**
     * Set the name of the Hub.
     * @method WeDo2SmartHub#setName
     * @param {string} name New name of the hub (14 characters or less, ASCII only).
     * @returns {Promise} Resolved upon successful issuance of command.
     */
    setName(name) {
        if (name.length > 14) {
            throw new Error("Name must be 14 characters or less");
        }
        return new Promise((resolve) => {
            const data = Buffer.from(name, "ascii");
            // Send this twice, as sometimes the first time doesn't take
            this.send(data, Consts.BLECharacteristic.WEDO2_NAME_ID);
            this.send(data, Consts.BLECharacteristic.WEDO2_NAME_ID);
            this._name = name;
            return resolve();
        });
    }
    send(message, uuid) {
        if (debug.enabled) {
            debug(`Sent Message (${this._getCharacteristicNameFromUUID(uuid)})`, message);
        }
        return this._bleDevice.writeToCharacteristic(uuid, message);
    }
    subscribe(portId, deviceType, mode) {
        this.send(Buffer.from([0x01, 0x02, portId, deviceType, mode, 0x01, 0x00, 0x00, 0x00, 0x00, 0x01]), Consts.BLECharacteristic.WEDO2_PORT_TYPE_WRITE);
    }
    unsubscribe(portId, deviceType, mode) {
        this.send(Buffer.from([0x01, 0x02, portId, deviceType, mode, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00]), Consts.BLECharacteristic.WEDO2_PORT_TYPE_WRITE);
    }
    _getCharacteristicNameFromUUID(uuid) {
        const keys = Object.keys(Consts.BLECharacteristic);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (Consts.BLECharacteristic[key] === uuid) {
                return key;
            }
        }
        return "UNKNOWN";
    }
    _parseHighCurrentAlert(data) {
        debug("Received Message (WEDO2_HIGH_CURRENT_ALERT)", data);
    }
    _parseBatteryMessage(data) {
        debug("Received Message (WEDO2_BATTERY)", data);
        const batteryLevel = data[0];
        if (batteryLevel !== this._batteryLevel) {
            this._batteryLevel = batteryLevel;
            this.emit("batteryLevel", { batteryLevel });
        }
    }
    _parseFirmwareRevisionString(data) {
        debug("Received Message (WEDO2_FIRMWARE_REVISION)", data);
        this._firmwareVersion = data.toString();
    }
    _parsePortMessage(data) {
        debug("Received Message (WEDO2_PORT_TYPE)", data);
        const portId = data[0];
        const event = data[1];
        const deviceType = event ? data[3] : 0;
        if (event === 0x01) {
            const device = this._createDevice(deviceType, portId);
            this._attachDevice(device);
        }
        else if (event === 0x00) {
            const device = this._getDeviceByPortId(portId);
            if (device) {
                this._detachDevice(device);
            }
        }
    }
    _parseSensorMessage(message) {
        debug("Received Message (WEDO2_SENSOR_VALUE)", message);
        if (message[0] === 0x01) {
            /**
             * Emits when a button is pressed.
             * @event WeDo2SmartHub#button
             * @param {string} button
             * @param {ButtonState} state
             */
            this.emit("button", { event: Consts.ButtonState.PRESSED });
            return;
        }
        else if (message[0] === 0x00) {
            this.emit("button", { event: Consts.ButtonState.RELEASED });
            return;
        }
        const portId = message[1];
        const device = this._getDeviceByPortId(portId);
        if (device) {
            device.receive(message);
        }
    }
}
exports.WeDo2SmartHub = WeDo2SmartHub;
exports.PortMap = {
    "A": 1,
    "B": 2,
    "CURRENT_SENSOR": 3,
    "VOLTAGE_SENSOR": 4,
    "PIEZO_BUZZER": 5,
    "HUB_LED": 6
};
//# sourceMappingURL=wedo2smarthub.js.map
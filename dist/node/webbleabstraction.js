"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebBLEDevice = void 0;
const Debug = require("debug");
const events_1 = require("events");
const debug = Debug("bledevice");
class WebBLEDevice extends events_1.EventEmitter {
    constructor(device) {
        super();
        this._name = "";
        this._listeners = {};
        this._characteristics = {};
        this._queue = Promise.resolve();
        this._mailbox = [];
        this._connected = false;
        this._connecting = false;
        this._webBLEServer = device;
        this._uuid = device.device.id;
        this._name = device.device.name;
        device.device.addEventListener("gattserverdisconnected", () => {
            this._connecting = false;
            this._connected = false;
            this.emit("disconnect");
        });
        setTimeout(() => {
            this.emit("discoverComplete");
        }, 2000);
    }
    get uuid() {
        return this._uuid;
    }
    get name() {
        return this._name;
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        return this._connected;
    }
    connect() {
        return new Promise((resolve) => {
            this._connected = true;
            return resolve();
        });
    }
    disconnect() {
        return new Promise((resolve) => {
            this._webBLEServer.device.gatt.disconnect();
            return resolve();
        });
    }
    async discoverCharacteristicsForService(uuid) {
        debug("Service/characteristic discovery started");
        const service = await this._webBLEServer.getPrimaryService(uuid);
        const characteristics = await service.getCharacteristics();
        for (const characteristic of characteristics) {
            this._characteristics[characteristic.uuid] = characteristic;
        }
        debug("Service/characteristic discovery finished");
    }
    subscribeToCharacteristic(uuid, callback) {
        if (this._listeners[uuid]) {
            this._characteristics[uuid].removeEventListener("characteristicvaluechanged", this._listeners[uuid]);
        }
        // @ts-ignore
        this._listeners[uuid] = (event) => {
            const buf = Buffer.alloc(event.target.value.buffer.byteLength);
            const view = new Uint8Array(event.target.value.buffer);
            for (let i = 0; i < buf.length; i++) {
                buf[i] = view[i];
            }
            debug("Incoming data", buf);
            return callback(buf);
        };
        this._characteristics[uuid].addEventListener("characteristicvaluechanged", this._listeners[uuid]);
        const mailbox = Array.from(this._mailbox);
        this._mailbox = [];
        for (const data of mailbox) {
            debug("Replayed from mailbox (LPF2_ALL)", data);
            callback(data);
        }
        this._characteristics[uuid].startNotifications();
    }
    addToCharacteristicMailbox(uuid, data) {
        this._mailbox.push(data);
    }
    readFromCharacteristic(uuid, callback) {
        // @ts-ignore
        this._characteristics[uuid].readValue().then((data) => {
            const buf = Buffer.alloc(data.buffer.byteLength);
            const view = new Uint8Array(data.buffer);
            for (let i = 0; i < buf.length; i++) {
                buf[i] = view[i];
            }
            callback(null, buf);
        });
    }
    writeToCharacteristic(uuid, data) {
        return this._queue = this._queue.then(() => this._characteristics[uuid].writeValueWithoutResponse(data));
    }
    _sanitizeUUID(uuid) {
        return uuid.replace(/-/g, "");
    }
}
exports.WebBLEDevice = WebBLEDevice;
//# sourceMappingURL=webbleabstraction.js.map
const RECORD_TEXT = 0x01;
const RECORD_PATH = 0x02;
const RECORD_GROUP = 0x06;
const RECORD_LAYER = 0x0A;
const RECORD_PALETTE = 0x21;
const RECORD_22 = 0x22;
const RECORD_SAVE_LOCATION = 0x23;
const RECORD_STROKE_COLOUR = 0x24;
const RECORD_STROKE_WIDTH = 0x25;
const RECORD_FILL_COLOUR = 0x26;
const RECORD_JOIN_STYLE = 0x27;
const RECORD_LINE_CAP_START = 0x28;
const RECORD_LINE_CAP_END = 0x29;
const RECORD_2A = 0x2A;
const RECORD_2B = 0x2B;
const RECORD_2C = 0x2C;
const RECORD_CHARACTER = 0x2D;
const RECORD_FONT_NAME = 0x2F;
const RECORD_FONT_SIZE = 0x30;
const RECORD_32 = 0x32;
const RECORD_34 = 0x34;
const RECORD_35 = 0x35;
const RECORD_38 = 0x38;
const RECORD_FILE_INFO = 0x39;
const RECORD_3A = 0x3A;
const RECORD_3B = 0x3B;
const RECORD_3D = 0x3D;
const RECORD_3E = 0x3E;
const RECORD_3F = 0x3F;

const FILL_FLAT = 0;
const FILL_LINEAR = 1;
const FILL_RADIAL = 2;

const STRING_LENGTH_LIMIT = 2048;

class ArtworksError extends Error {
    constructor(message, position, data) {
        super(message);
        this.name = "ArtworksError";
        this.position = position;
        this.data = data;
    }
}

class ArtworksFile {
    constructor(buffer, length) {
        this.buffer = buffer;
        this.length = length;
        this.position = 0;
        this.reads = new Set();
    }

    getLength() {
        return this.length;
    }

    getPosition() {
        return this.position;
    }

    setPosition(v) {
        this.position = v;
    }

    getUnreadRanges() {
        const result = [];
        let start = 0;
        for (let i = 1; i < this.length + 1; i++) {
            const previous = this.reads.has(i - 1);
            const current = this.reads.has(i) || (i === this.length);
            if (previous !== current) {
                if (current) {
                    result.push({
                        range: [start, i],
                        length: i - start
                    });
                } else {
                    start = i;
                }
            }
        }
        return result;
    }

    check(condition, message, data = {}) {
        if (!condition) {
            throw new ArtworksError(message, this.getPosition(), data);
        }
    }

    fail(message, data = {}) {
        this.check(false, message, data);
    }

    checkAlignment(message) {
        this.check(this.getPosition() % 4 === 0, message);
    }

    readByte() {
        this.check(this.position >= 0, 'reading off the start of a file');
        this.check(this.position < this.length, 'reading off the end of the file');
        this.reads.add(this.position);
        const b = this.buffer[this.position];
        this.position = this.position + 1;
        return b;
    }

    readBytes(n) {
        const result = [];
        for (let i = 0; i < n; i++) {
            result.push(this.readByte());
        }
        return result;
    }

    readInt() {
        this.checkAlignment('misaligned int');
        const x = this.readByte();
        const y = this.readByte();
        const z = this.readByte();
        const w = this.readByte();
        return x + (y * 0x100) + (z * 0x10000) + (w * 0x1000000);
    }

    readSignedInt() {
        return this.readInt() | 0;
    }

    readStringFully(n) {
        this.checkAlignment('misaligned string');
        const chars = [];
        for (let i = 0, terminated = false; i < n; i = 1 + i) {
            const c = this.readByte();
            if (c === 0) {
                terminated = true;
            } else if (!terminated) {
                chars.push(c)
            }
        }
        return String.fromCharCode(...chars);
    }

    readString(n = STRING_LENGTH_LIMIT) {
        this.checkAlignment('misaligned string');
        const chars = [];
        for (let i = 0; i < n; i = 1 + i) {
            const c = this.readByte();
            if (c === 0) {
                break;
            }
            chars.push(c);
        }
        return String.fromCharCode(...chars);
    }

    readPoint() {
        this.checkAlignment('misaligned point');
        const x = this.readSignedInt();
        const y = this.readSignedInt();
        return {x, y};
    }

    readBoundingBox() {
        this.checkAlignment('misaligned bounding box');
        const minX = this.readSignedInt();
        const minY = this.readSignedInt();
        const maxX = this.readSignedInt();
        const maxY = this.readSignedInt();
        return {minX, minY, maxX, maxY};
    }

    readPolyline(n) {
        this.checkAlignment('misaligned polyline');
        const points = [];
        for (let i = 0; i < n; i++) {
            points.push(this.readPoint());
        }
        return points;
    }

    readPath() {
        this.checkAlignment('misaligned path');
        const path = [];
        while (true) {
            const tag = this.readInt();
            const maskedTag = tag & 0xFF;
            if (maskedTag === 0) {
                break;
            } else if (maskedTag === 2) {
                const p0 = this.readPoint();
                path.push({
                    tag: 'M',
                    points: [p0]
                });
            } else if (maskedTag === 4) {
                // skip
            } else if (maskedTag === 5) {
                path.push({tag: 'Z'});
            } else if (maskedTag === 6) {
                const p0 = this.readPoint();
                const p1 = this.readPoint();
                const p2 = this.readPoint();
                path.push({
                    tag: 'C',
                    points: [p0, p1, p2]
                });
            } else if (maskedTag === 8) {
                const p0 = this.readPoint();
                path.push({
                    tag: 'L',
                    points: [p0]
                });
            } else {
                this.fail('unsupported path tag', {tag: tag.toString(16)});
            }
        }
        return path;
    }

    readRecordText({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            unknown28: this.readInt(),
            unknown32: this.readInt(),
            unknown36: this.readInt(),
            unknown40: this.readInt(),
            unknown44: this.readInt(),
            rectangle: this.readPolyline(4),
        });
    }

    readRecordPath({populateRecord}) {
        populateRecord({
            path: this.readPath()
        });
    }

    readRecordGroup({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            unknown28: this.readInt(),
            unknown32: this.readInt()
        });
    }

    readRecordLayer({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            name: this.readStringFully(32)
        });
    }

    readRecordPalette({populateRecord}) {
        const unknown24 = this.readInt();
        const colours = [];
        const count = this.readInt() & 0x7FFFFFFF;
        for (let n = 0; n < count; n++) {
            colours.push({
                name: this.readStringFully(24),
                colour: this.readInt(),
                unknown32: this.readInt(),
                unknown36: this.readInt(),
                unknown40: this.readInt(),
                unknown44: this.readInt(),
                unknown48: this.readInt()
            });
        }
        populateRecord({
            unknown24,
            colours
        });
    }

    readRecord22() {
    }

    readRecordSaveLocation({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            saveLocation: this.readString()
        });
    }

    readRecordStrokeColour({populateRecord}) {
        populateRecord({
            strokeColour: this.readInt()
        });
    }

    readRecordStrokeWidth({populateRecord}) {
        populateRecord({
            strokeWidth: this.readInt()
        });
    }

    readRecordFillColour({populateRecord}) {
        const fillType = this.readInt();
        populateRecord({
            fillType,
            unknown28: this.readInt()
        });
        if (fillType === FILL_FLAT) {
            populateRecord({
                colour: this.readInt()
            });
        } else if (fillType === FILL_LINEAR) {
            populateRecord({
                gradientLine: this.readPolyline(2),
                startColour: this.readInt(),
                endColour: this.readInt()
            });
        } else if (fillType === FILL_RADIAL) {
            populateRecord({
                gradientLine: this.readPolyline(2),
                startColour: this.readInt(),
                endColour: this.readInt()
            });
        } else {
            this.fail('unsupported fill type', fillType);
        }
    }

    readRecordJoinStyle({populateRecord}) {
        populateRecord({
            joinStyle: this.readInt()
        });
    }

    readRecordLineCapEnd({populateRecord}) {
        populateRecord({
            capStyle: this.readInt(),
            unknown28: this.readInt()
        });
    }

    readRecordLineCapStart({populateRecord}) {
        populateRecord({
            capStyle: this.readInt(),
            unknown28: this.readInt()
        });
    }

    readRecord2A({populateRecord}) {
        populateRecord({
            unknown24: this.readInt()
        });
    }

    readRecord2B({populateRecord}) {
        populateRecord({
            unknown24: this.readInt()
        });
    }

    readRecord2C({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            path: this.readPath()
        });
    }

    readRecordCharacter({populateRecord}) {
        populateRecord({
            characterCode: this.readInt(),
            unknown28: this.readInt(),
            unknown32: this.readInt(),
            unknown36: this.readInt(),
            unknown40: this.readInt()
        });
    }

    readRecordFontName({populateRecord}) {
        populateRecord({
            fontName: this.readString()
        });
    }

    readRecordFontSize({populateRecord}) {
        populateRecord({
            xSize: this.readInt(),
            ySize: this.readInt()
        });
    }

    readRecord32({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
        });
    }

    readRecord34({populateRecord}) {
        populateRecord({
            triangle: this.readPolyline(3),
            path: this.readPath()
        });
    }

    readRecord35({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            triangle: this.readPolyline(3),
            path: this.readPath()
        });
    }

    readRecord38({populateRecord}) {
        populateRecord({
            path: this.readPath(),
            unknownTrailer: this.readBytes(68)
        });
    }

    readRecordFileInfo({populateRecord}) {
        populateRecord({
            fileInfo: this.readString(),
        });
    }

    readRecord3A({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            unknown28: this.readInt(),
            unknown32: this.readInt(),
            unknown36: this.readInt(),
            unknown40: this.readInt(),
            unknown44: this.readInt(),
            unknown48: this.readInt(),
            unknown52: this.readInt(),
            unknown56: this.readInt(),
            unknown60: this.readInt(),
            unknown64: this.readInt()
        });
    }

    readRecord3B({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            unknown28: this.readInt(),
            unknown32: this.readInt(),
            unknown36: this.readInt(),
            unknown40: this.readInt(),
            unknown44: this.readInt(),
            unknown48: this.readInt(),
            unknown52: this.readInt(),
            unknown56: this.readInt(),
            unknown60: this.readInt(),
        });
    }

    readRecord3D({populateRecord}) {
        populateRecord({
            path: this.readPath()
        });
    }

    readRecord3E({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            unknown28: this.readInt(),
            unknown32: this.readInt()
        });
    }

    readRecord3F({populateRecord}) {
        populateRecord({
            unknown24: this.readInt(),
            unknown28: this.readInt(),
            unknown32: this.readInt()
        });
    }

    readRecord(callbacks, {next}) {
        const checkLast = (message) => { this.check(next === 0, message);}
        const {populateRecord, unsupportedRecord} = callbacks;
        const type = this.readInt();
        const unknown4 = this.readInt();
        const boundingBox = this.readBoundingBox();
        populateRecord({type, boundingBox, unknown4});
        switch (type & 0xFF) {
            case RECORD_TEXT:
                this.readRecordText(callbacks);
                break;
            case RECORD_PATH:
                this.readRecordPath(callbacks);
                break;
            case RECORD_GROUP:
                this.readRecordGroup(callbacks);
                break;
            case RECORD_LAYER:
                this.readRecordLayer(callbacks);
                break;
            case RECORD_PALETTE:
                checkLast('records after palette');
                this.readRecordPalette(callbacks);
                break;
            case RECORD_22:
                checkLast('records after record 22');
                this.readRecord22(callbacks);
                break;
            case RECORD_SAVE_LOCATION:
                checkLast('records after save location');
                this.readRecordSaveLocation(callbacks);
                break;
            case RECORD_STROKE_COLOUR:
                checkLast('records after stroke colour');
                this.readRecordStrokeColour(callbacks);
                break;
            case RECORD_STROKE_WIDTH:
                checkLast('records after stroke width');
                this.readRecordStrokeWidth(callbacks);
                break;
            case RECORD_FILL_COLOUR:
                checkLast('records after fill colour');
                this.readRecordFillColour(callbacks);
                break;
            case RECORD_JOIN_STYLE:
                checkLast('records after join style');
                this.readRecordJoinStyle(callbacks);
                break;
            case RECORD_LINE_CAP_END:
                checkLast('records after end line cap');
                this.readRecordLineCapEnd(callbacks);
                break;
            case RECORD_LINE_CAP_START:
                checkLast('records after start line cap');
                this.readRecordLineCapStart(callbacks);
                break;
            case RECORD_2A:
                checkLast('records after record 2a');
                this.readRecord2A(callbacks);
                break;
            case RECORD_2B:
                checkLast('records after record 2b');
                this.readRecord2B(callbacks);
                break;
            case RECORD_2C:
                this.readRecord2C(callbacks);
                break;
            case RECORD_CHARACTER:
                this.readRecordCharacter(callbacks);
                break;
            case RECORD_FONT_NAME:
                checkLast('records after font name');
                this.readRecordFontName(callbacks);
                break;
            case RECORD_FONT_SIZE:
                checkLast('records after font size');
                this.readRecordFontSize(callbacks);
                break;
            case RECORD_32:
                checkLast('records after record 32');
                this.readRecord32(callbacks);
                break;
            case RECORD_34:
                this.readRecord34(callbacks);
                break;
            case RECORD_35:
                this.readRecord35(callbacks);
                break;
            case RECORD_38:
                this.readRecord38(callbacks);
                break;
            case RECORD_FILE_INFO:
                checkLast('records after file info');
                this.readRecordFileInfo(callbacks);
                break;
            case RECORD_3A:
                this.readRecord3A(callbacks);
                break;
            case RECORD_3B:
                checkLast('records after record 3b');
                this.readRecord3B(callbacks);
                break;
            case RECORD_3D:
                checkLast('records after 3d');
                this.readRecord3D(callbacks);
                break;
            case RECORD_3E:
                checkLast('records after record 3e');
                this.readRecord3E(callbacks);
                break;
            case RECORD_3F:
                checkLast('records after record 3f');
                this.readRecord3F(callbacks);
                break;
            default:
                unsupportedRecord();
                break;
        }
    }

    checkPointer(pointer) {
        const {position, previous, next} = pointer;
        this.check(previous <= 0, 'positive previous pointer', pointer);
        this.check(next >= 0, 'negative next pointer', pointer);
        this.check(position + next < this.getLength(), 'next pointer would overrun', pointer);
    }

    readNodePointer() {
        const position = this.getPosition();
        const previous = this.readSignedInt();
        const next = this.readSignedInt();
        const pointer = {position, previous, next};
        this.checkPointer(pointer);
        return pointer;
    }

    readChildPointer() {
        const position = this.getPosition();
        const next = this.readSignedInt();
        const previous = this.readSignedInt();
        const pointer = {position, previous, next};
        this.checkPointer(pointer);
        return pointer;
    }

    readNodes(callbacks) {
        const {startRecord, finishRecord} = callbacks;
        while (true) {
            const pointer = this.readNodePointer();
            const {position, next} = pointer;
            startRecord({pointer});
            this.readChildren(callbacks);
            finishRecord();
            if (next === 0) {
                break;
            }
            this.setPosition(position + next);
        }
    }

    readChildren(callbacks) {
        const {startRecord, finishRecord} = callbacks;
        while (true) {
            const pointer = this.readChildPointer();
            const {position, next} = pointer;
            startRecord({pointer});
            this.readRecord(callbacks, pointer);
            if (next !== 0) {
                this.readGrandchildren(callbacks, position + next - 8);
            }
            finishRecord();
            if (next === 0) {
                break;
            }
            this.setPosition(position + next);
        }
    }

    readGrandchildren(callbacks, pointerPosition) {
        const {populateRecord} = callbacks;
        const current = this.getPosition();
        this.check(current <= pointerPosition,
            'insufficient space for grandchild pointer',
            {current, pointerPosition}
        );
        this.setPosition(pointerPosition);
        const pointer = this.readNodePointer();
        const {position, next} = pointer;
        if (next > 0) {
            populateRecord({
                childPointer: pointer
            });
            this.setPosition(position + next);
            this.readNodes(callbacks);
        }
    }

    load() {
        const unsupported = [];
        const records = [];
        const stack = [];

        const checkStack = () => {
            this.check(stack.length !== 0 , 'empty stack');
        }

        const startRecord = (data) => {
            stack.push({...data, children: []});
        }

        const populateRecord = (data) => {
            checkStack();
            const {children, ...oldData} = stack.pop();
            stack.push({...oldData, ...data, children});
        }

        const finishRecord = () => {
            checkStack();
            if (stack.length > 1) {
                const child = stack.pop();
                const parent = stack.pop();
                parent.children.push(child);
                stack.push(parent);
            } else {
                records.push(stack.pop());
            }
        }

        const unsupportedRecord = () => {
            checkStack();
            const record = stack[stack.length - 1];
            unsupported.push(record);
        }

        this.setPosition(0);

        try {
            const header = {
                identifier: this.readStringFully(4),
                version: this.readInt(),
                program: this.readStringFully(8),
                unknown16: this.readInt(),
                bodyPosition: this.readInt()
            };

            const {bodyPosition} = header;
            this.setPosition(bodyPosition);
            this.readNodes({
                startRecord,
                finishRecord,
                populateRecord,
                unsupportedRecord
            });
            return {
                header,
                records,
                unsupported,
                unreadRanges: this.getUnreadRanges()
            };
        } catch (error) {
            return {
                error,
                recordStack: stack
            }
        }
    }
}

function load(buffer, length) {
    return new ArtworksFile(buffer, length).load();
}

module.exports = {
    RECORD_TEXT,
    RECORD_PATH,
    RECORD_GROUP,
    RECORD_LAYER,
    RECORD_PALETTE,
    RECORD_22,
    RECORD_SAVE_LOCATION,
    RECORD_STROKE_COLOUR,
    RECORD_STROKE_WIDTH,
    RECORD_FILL_COLOUR,
    RECORD_JOIN_STYLE,
    RECORD_LINE_CAP_START,
    RECORD_LINE_CAP_END,
    RECORD_2A,
    RECORD_2B,
    RECORD_2C,
    RECORD_CHARACTER,
    RECORD_FONT_NAME,
    RECORD_FONT_SIZE,
    RECORD_32,
    RECORD_34,
    RECORD_35,
    RECORD_38,
    RECORD_FILE_INFO,
    RECORD_3A,
    RECORD_3B,
    RECORD_3D,
    RECORD_3E,
    RECORD_3F,

    FILL_FLAT,
    FILL_LINEAR,
    FILL_RADIAL,

    Artworks: {
        load
    }
}

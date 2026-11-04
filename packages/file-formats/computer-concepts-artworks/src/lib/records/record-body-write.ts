import { BinaryWriter } from '@rbrown/io';

import { ARTWORKS_RECORD_TYPE_TAG, ArtworksRecord } from '../types/index.js';
import { writeRecordBodyLayer } from './record-0a-layer.js';
import { writeRecordBodyPath } from './record-02-path.js';
import { writeRecordBodyWindingRule } from './record-2a-winding-rule.js';
import { writeRecordBodyDashPattern } from './record-2b-dash-pattern.js';
import { writeRecordBodyRectangle } from './record-2c-rectangle.js';
import { writeRecordBodyBlendGroup } from './record-3a-blend-group.js';
import { writeRecordBodyBlendGroupOptions } from './record-3b-blend-group-options.js';
import { writeRecordBodyBlendPath } from './record-3d-blend-path.js';
import { writeRecordBodyMarkerStart } from './record-3e-marker-start.js';
import { writeRecordBodyMarkerEnd } from './record-3f-marker-end.js';
import { writeRecordBodyGroup } from './record-06-group.js';
import { writeRecordBodyWorkArea } from './record-21-work-area.js';
import { writeRecordBodyStrokeColour } from './record-24-stroke-colour.js';
import { writeRecordBodyStrokeWidth } from './record-25-stroke-width.js';
import { writeRecordBodyFillColour } from './record-26-fill-colour.js';
import { writeRecordBodyJoinStyle } from './record-27-join-style.js';
import { writeRecordBodyLineCapEnd } from './record-28-line-cap-end.js';
import { writeRecordBodyLineCapStart } from './record-29-line-cap-start.js';
import { writeRecordBodyEllipse } from './record-34-ellipse.js';
import { writeRecordBodyRoundedRectangle } from './record-35-rounded-rectangle.js';

function unsupportedErrorMessage(type: number): string {
  return `write: unsupported record body ${type.toString()}, (0x${type.toString(16)})`;
}

export function writeRecordBody(
  writer: BinaryWriter,
  record: ArtworksRecord,
): void {
  switch (record.type) {
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_02_PATH:
      writeRecordBodyPath(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_0A_LAYER:
      writeRecordBodyLayer(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_06_GROUP:
      writeRecordBodyGroup(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_21_WORK_AREA:
      writeRecordBodyWorkArea(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_24_STROKE_COLOUR:
      writeRecordBodyStrokeColour(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_25_STROKE_WIDTH:
      writeRecordBodyStrokeWidth(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_26_FILL_COLOUR:
      writeRecordBodyFillColour(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_27_JOIN_STYLE:
      writeRecordBodyJoinStyle(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_28_LINE_CAP_END:
      writeRecordBodyLineCapEnd(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_29_LINE_CAP_START:
      writeRecordBodyLineCapStart(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2A_WINDING_RULE:
      writeRecordBodyWindingRule(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2B_DASH_PATTERN:
      writeRecordBodyDashPattern(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2C_RECTANGLE:
      writeRecordBodyRectangle(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_34_ELLIPSE:
      writeRecordBodyEllipse(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_35_ROUNDED_RECTANGLE:
      writeRecordBodyRoundedRectangle(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3A_BLEND_GROUP:
      writeRecordBodyBlendGroup(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3B_BLEND_GROUP_OPTIONS:
      writeRecordBodyBlendGroupOptions(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3D_BLEND_PATH:
      writeRecordBodyBlendPath(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3E_MARKER_START:
      writeRecordBodyMarkerStart(writer, record.body);
      break;
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3F_MARKER_END:
      writeRecordBodyMarkerEnd(writer, record.body);
      break;
    default:
      throw new Error(unsupportedErrorMessage(record.type));
  }
}

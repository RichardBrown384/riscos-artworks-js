import { BinaryReader } from '@rbrown/io';
import { check } from '@rbrown/check';
import {
  ARTWORKS_RECORD_TYPE_TAG,
  ArtworksRecordBody,
  ArtworksRecordHeader,
  FilePointer,
} from '../types/index.js';
import { readRecordBody00 } from './record-00.js';
import { readRecordBodyText } from './record-01-text.js';
import { readRecordBodyPath } from './record-02-path.js';
import { readRecordBodySprite } from './record-05-sprite.js';
import { readRecordBodyGroup } from './record-06-group.js';
import { readRecordBodyLayer } from './record-0a-layer.js';
import { readRecordBodyWorkArea } from './record-21-work-area.js';
import { readRecordBody22 } from './record-22.js';
import { readRecordBodySaveLocation } from './record-23-save-location.js';
import { readRecordBodyStrokeColour } from './record-24-stroke-colour.js';
import { readRecordBodyStrokeWidth } from './record-25-stroke-width.js';
import { readRecordBodyFillColour } from './record-26-fill-colour.js';
import { readRecordBodyJoinStyle } from './record-27-join-style.js';
import { readRecordBodyLineCapEnd } from './record-28-line-cap-end.js';
import { readRecordBodyLineCapStart } from './record-29-line-cap-start.js';
import { readRecordBodyWindingRule } from './record-2a-winding-rule.js';
import { readRecordBodyDashPattern } from './record-2b-dash-pattern.js';
import { readRecordBodyRectangle } from './record-2c-rectangle.js';
import { readRecordBodyCharacter } from './record-2d-character.js';
import { readRecordBody2E } from './record-2e.js';
import { readRecordBodyFontName } from './record-2f-font-name.js';
import { readRecordBodyFontSize } from './record-30-font-size.js';
import { readRecordBody31 } from './record-31.js';
import { readRecordBody32 } from './record-32.js';
import { readRecordBody33 } from './record-33.js';
import { readRecordBodyEllipse } from './record-34-ellipse.js';
import { readRecordBodyRoundedRectangle } from './record-35-rounded-rectangle.js';
import { readRecordBodyDistortionGroup } from './record-37-distortion-group.js';
import { readRecordBodyPerspectiveGroup } from './record-38-perspective-group.js';
import { readRecordBodyFileInfo } from './record-39-file-info.js';
import { readRecordBodyBlendGroup } from './record-3a-blend-group.js';
import { readRecordBodyBlendGroupOptions } from './record-3b-blend-group-options.js';
import { readRecordBodyBlendPath } from './record-3d-blend-path.js';
import { readRecordBodyMarkerStart } from './record-3e-marker-start.js';
import { readRecordBodyMarkerEnd } from './record-3f-marker-end.js';
import { readRecordBodyDistortionSubgroup } from './record-42-distortion-subgroup.js';

function unsupportedErrorMessage(type: number): string {
  return `read: unsupported record body ${type.toString()}, (0x${type.toString(16)})`;
}

export function readRecordBody(
  reader: BinaryReader,
  header: ArtworksRecordHeader,
  pointer: FilePointer,
): ArtworksRecordBody {
  const isLast = pointer.next === 0;
  const { type } = header;
  switch (type) {
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_00:
      return { type, body: readRecordBody00() };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_01_TEXT:
      return { type, body: readRecordBodyText(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_02_PATH:
      return { type, body: readRecordBodyPath(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_05_SPRITE: {
      check(isLast, 'records after sprite');
      return { type, body: readRecordBodySprite(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_06_GROUP:
      return { type, body: readRecordBodyGroup(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_0A_LAYER:
      return { type, body: readRecordBodyLayer(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_21_WORK_AREA: {
      check(isLast, 'records after work area');
      return { type, body: readRecordBodyWorkArea(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_22: {
      check(isLast, 'records after record 22');
      return { type, body: readRecordBody22() };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_23_SAVE_LOCATION: {
      check(isLast, 'records after save location');
      return { type, body: readRecordBodySaveLocation(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_24_STROKE_COLOUR: {
      check(isLast, 'records after stroke colour');
      return { type, body: readRecordBodyStrokeColour(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_25_STROKE_WIDTH: {
      check(isLast, 'records after stroke width');
      return { type, body: readRecordBodyStrokeWidth(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_26_FILL_COLOUR: {
      check(isLast, 'records after fill colour');
      return { type, body: readRecordBodyFillColour(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_27_JOIN_STYLE: {
      check(isLast, 'records after join style');
      return { type, body: readRecordBodyJoinStyle(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_28_LINE_CAP_END: {
      check(isLast, 'records after end line cap');
      return { type, body: readRecordBodyLineCapEnd(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_29_LINE_CAP_START: {
      check(isLast, 'records after start line cap');
      return { type, body: readRecordBodyLineCapStart(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2A_WINDING_RULE: {
      check(isLast, 'records after winding rule');
      return { type, body: readRecordBodyWindingRule(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2B_DASH_PATTERN: {
      check(isLast, 'records after record dash pattern');
      return { type, body: readRecordBodyDashPattern(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2C_RECTANGLE:
      return { type, body: readRecordBodyRectangle(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2D_CHARACTER:
      return { type, body: readRecordBodyCharacter(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2E: {
      check(isLast, 'records after record 2e');
      return { type, body: readRecordBody2E(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_2F_FONT_NAME: {
      check(isLast, 'records after font name');
      return { type, body: readRecordBodyFontName(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_30_FONT_SIZE: {
      check(isLast, 'records after font size');
      return { type, body: readRecordBodyFontSize(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_31:
      return { type, body: readRecordBody31(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_32: {
      check(isLast, 'records after record 32');
      return { type, body: readRecordBody32(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_33:
      return { type, body: readRecordBody33(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_34_ELLIPSE:
      return { type, body: readRecordBodyEllipse(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_35_ROUNDED_RECTANGLE:
      return { type, body: readRecordBodyRoundedRectangle(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_37_DISTORTION_GROUP:
      return { type, body: readRecordBodyDistortionGroup(reader, isLast) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_38_PERSPECTIVE_GROUP:
      return { type, body: readRecordBodyPerspectiveGroup(reader, isLast) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_39_FILE_INFO: {
      check(isLast, 'records after file info');
      return { type, body: readRecordBodyFileInfo(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3A_BLEND_GROUP:
      return { type, body: readRecordBodyBlendGroup(reader) };
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3B_BLEND_GROUP_OPTIONS: {
      check(isLast, 'records after record 3b');
      return { type, body: readRecordBodyBlendGroupOptions(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3D_BLEND_PATH: {
      check(isLast, 'records after 3d');
      return { type, body: readRecordBodyBlendPath(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3E_MARKER_START: {
      check(isLast, 'records after record marker start');
      return { type, body: readRecordBodyMarkerStart(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_3F_MARKER_END: {
      check(isLast, 'records after record marker end');
      return { type, body: readRecordBodyMarkerEnd(reader) };
    }
    case ARTWORKS_RECORD_TYPE_TAG.RECORD_42_DISTORTION_SUBGROUP:
      return { type, body: readRecordBodyDistortionSubgroup() };
    default:
      throw new Error(unsupportedErrorMessage(type));
  }
}

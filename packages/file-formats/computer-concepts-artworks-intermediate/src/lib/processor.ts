import {
  ARTWORKS_RECORD_TYPE_TAG,
  ArtworksRecord,
  ArtworksRecordWithPath,
  ArtworksSpriteRecord,
  List,
} from '@rbrown/computer-concepts-artworks';

import { Mapper } from './mapper.js';
import { RenderStateStack } from './render-state-stack.js';
import { RenderState } from './render-state.js';

class ArtworksProcessor {
  private readonly mapper: Mapper;
  private readonly renderStateStack: RenderStateStack;

  constructor({
    mapper,
    renderState,
  }: {
    mapper: Mapper;
    renderState: RenderState;
  }) {
    this.mapper = mapper;
    this.renderStateStack = new RenderStateStack(renderState);
  }

  processLists(lists: List[] = []): void {
    for (const list of lists) {
      this.processRecords(list.records);
    }
  }

  processRecords(list: ArtworksRecord[] = []) {
    for (const record of list) {
      this.processRecord(record);
    }
  }

  processRecord(record: ArtworksRecord): void {
    switch (record.type) {
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_02_PATH:
        this.processPath(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_05_SPRITE:
        this.processSprite(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_24_STROKE_COLOUR:
        this.renderStateStack.setStroke(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_25_STROKE_WIDTH:
        this.renderStateStack.setStrokeWidth(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_26_FILL_COLOUR:
        this.renderStateStack.setFill(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_27_JOIN_STYLE:
        this.renderStateStack.setJoinStyle(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_28_LINE_CAP_END:
        this.renderStateStack.setStrokeLineCapEnd(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_29_LINE_CAP_START:
        this.renderStateStack.setStrokeLineCapStart(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_2A_WINDING_RULE:
        this.renderStateStack.setWindingRule(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_2B_DASH_PATTERN:
        this.renderStateStack.setDashPattern(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_2C_RECTANGLE:
        this.processPath(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_34_ELLIPSE:
        this.processPath(record);
        break;
      case ARTWORKS_RECORD_TYPE_TAG.RECORD_35_ROUNDED_RECTANGLE:
        this.processPath(record);
        break;
      default:
        this.renderStateStack.duplicate();
        this.processLists(record.lists);
        this.renderStateStack.pop();
        break;
    }
  }

  processPath(pathRecord: ArtworksRecordWithPath): void {
    this.renderStateStack.duplicate();
    this.processLists(pathRecord.lists);
    const state = this.renderStateStack.peek();
    this.mapper.path(pathRecord, state);
    this.renderStateStack.pop();
  }

  processSprite(spriteRecord: ArtworksSpriteRecord): void {
    this.mapper.sprite(spriteRecord);
  }
}

export function artworksProcess({
  lists,
  mapper,
  renderState,
}: {
  lists: List[];
  mapper: Mapper;
  renderState: RenderState;
}) {
  new ArtworksProcessor({
    mapper,
    renderState,
  }).processLists(lists);
}

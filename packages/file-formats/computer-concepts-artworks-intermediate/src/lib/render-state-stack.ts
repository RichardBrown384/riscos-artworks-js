import {
  ArtworksRecordDashPattern,
  ArtworksRecordFillColour,
  ArtworksRecordJoinStyle,
  ArtworksRecordLineCapEnd,
  ArtworksRecordLineCapStart,
  ArtworksRecordStrokeColour,
  ArtworksRecordStrokeWidth,
  ArtworksRecordWindingRule,
} from '@rbrown/computer-concepts-artworks';
import { preprocessEdgeCaseFills } from './preprocess-edge-case-fills.js';
import { RenderState } from './render-state.js';

export class RenderStateStack {
  private readonly stack: RenderState[];

  constructor(state: RenderState) {
    this.stack = [{ ...state }];
  }

  peek(): RenderState {
    const state = this.stack.at(-1);
    if (!state) {
      throw new Error('RenderState: stack is empty');
    }
    return state;
  }

  pop(): void {
    if (this.stack.length === 1) {
      throw new Error('RenderState: cannot pop the initial render state');
    }
    this.stack.pop();
  }

  push(state: RenderState): void {
    this.stack.push({ ...state });
  }

  duplicate(): void {
    this.push(this.peek());
  }

  setDashPattern(dash: ArtworksRecordDashPattern): void {
    this.peek().dash = dash;
  }

  setFill(fill: ArtworksRecordFillColour): void {
    this.peek().fill = preprocessEdgeCaseFills(fill);
  }

  setJoinStyle(joinStyle: ArtworksRecordJoinStyle): void {
    this.peek().joinStyle = joinStyle;
  }

  setStrokeLineCapEnd(capStyle: ArtworksRecordLineCapEnd): void {
    this.peek().capStyleEnd = capStyle;
  }

  setStrokeLineCapStart(capStyle: ArtworksRecordLineCapStart): void {
    this.peek().capStyleStart = capStyle;
  }

  setStroke(stroke: ArtworksRecordStrokeColour): void {
    this.peek().stroke = stroke;
  }

  setStrokeWidth(strokeWidth: ArtworksRecordStrokeWidth): void {
    this.peek().strokeWidth = strokeWidth;
  }

  setWindingRule(windingRule: ArtworksRecordWindingRule): void {
    this.peek().windingRule = windingRule;
  }
}

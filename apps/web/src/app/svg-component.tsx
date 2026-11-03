import React from 'react';
import { intermediateFromArrayBuffer } from '@rbrown/riscos-file-formats';
import {
  svgFromIntermediate,
  type SvgImageNode,
  type SvgNode,
  type SvgRootNode,
} from '@rbrown/svg';

function useObjectURL(blob: Blob): string {
  const url = React.useMemo(() => URL.createObjectURL(blob), [blob]);

  React.useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  return url;
}

interface ImageNodeProps {
  node: SvgImageNode;
}

function ImageNode({ node }: ImageNodeProps) {
  const {
    attributes: { data, mimetype, ...attributes },
  } = node;
  const blob = React.useMemo(
    () => new Blob([data], { type: mimetype }),
    [data, mimetype],
  );
  const url = useObjectURL(blob);
  if (!url) return null;
  return <image href={url} {...attributes} />;
}

function renderChildren(children: SvgNode[]) {
  return children.map((child, i) => (
    <React.Fragment key={i}>{mapElement(child)}</React.Fragment>
  ));
}

function mapElement(node: SvgNode) {
  switch (node.tag) {
    case 'path':
      return <path {...node.attributes} />;

    case 'image':
      return <ImageNode node={node} />;

    case 'g':
      return <g {...node.attributes}>{renderChildren(node.children)}</g>;

    case 'defs':
      return <defs>{renderChildren(node.children)}</defs>;

    case 'linearGradient':
      return (
        <linearGradient {...node.attributes}>
          {renderChildren(node.children)}
        </linearGradient>
      );

    case 'radialGradient':
      return (
        <radialGradient {...node.attributes}>
          {renderChildren(node.children)}
        </radialGradient>
      );

    case 'stop':
      return <stop {...node.attributes} />;
  }
}

function mapRootNode(node: SvgRootNode) {
  return <svg {...node.attributes}>{renderChildren(node.children)}</svg>;
}

interface SVGComponentProps {
  buffer?: ArrayBuffer;
}

export function SVGComponent({ buffer }: SVGComponentProps) {
  const intermediate = intermediateFromArrayBuffer(buffer);
  if (!intermediate) return null;
  const svgRootNode = svgFromIntermediate(intermediate);
  if (!svgRootNode) return null;
  return mapRootNode(svgRootNode);
}

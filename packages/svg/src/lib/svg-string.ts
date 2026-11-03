import type { SvgImageNode, SvgNode, SvgRootNode } from './svg-types.js';

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const KEBAB_CASE_ATTRIBUTES = new Set([
  'fillRule',
  'strokeWidth',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeDasharray',
  'strokeDashoffset',
  'stopColor',
  'vectorEffect',
]);

function attributeName(name: string): string {
  return KEBAB_CASE_ATTRIBUTES.has(name)
    ? name.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)
    : name;
}

function serializeAttributes(
  attributes: Record<string, string | number | undefined>,
): string {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        ` ${attributeName(key)}="${escapeAttribute(String(value))}"`,
    )
    .join('');
}

function serializeImage(node: SvgImageNode): string {
  const { data, mimetype, ...attributes } = node.attributes;
  const href = `data:${mimetype};base64,${Buffer.from(data).toString('base64')}`;

  return `<image${serializeAttributes({ ...attributes, href })}/>`;
}

function serializeNode(node: SvgNode): string {
  switch (node.tag) {
    case 'path':
      return `<path${serializeAttributes(node.attributes)}/>`;

    case 'image':
      return serializeImage(node);

    case 'g':
      return `<g${serializeAttributes(node.attributes)}>${node.children
        .map(serializeNode)
        .join('')}</g>`;

    case 'defs':
      return `<defs>${node.children.map(serializeNode).join('')}</defs>`;

    case 'linearGradient':
      return `<linearGradient${serializeAttributes(node.attributes)}>${node.children
        .map(serializeNode)
        .join('')}</linearGradient>`;

    case 'radialGradient':
      return `<radialGradient${serializeAttributes(node.attributes)}>${node.children
        .map(serializeNode)
        .join('')}</radialGradient>`;

    case 'stop':
      return `<stop${serializeAttributes(node.attributes)}/>`;
  }
}

export function svgToString(node: SvgRootNode): string {
  return `<svg xmlns="http://www.w3.org/2000/svg"${serializeAttributes(node.attributes)}>${node.children
    .map(serializeNode)
    .join('')}</svg>`;
}

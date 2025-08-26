import { Fill, Stroke, Text } from "ol/style.js";

function stringDivider(
  str: string,
  width: number,
  spaceReplacer: string,
): string {
  if (str.length > width) {
    let p = width;
    while (p > 0 && str[p] != " " && str[p] != "-") {
      p--;
    }
    if (p > 0) {
      let left;
      if (str.substring(p, p + 1) == "-") {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      const right = str.substring(p + 1);
      return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
    }
  }
  return str;
}

const getText = function (feature: any, resolution: any, dom: any) {
  const type = dom.text.value;
  const maxResolution = dom.maxreso.value;
  let text = feature.get("name");

  if (resolution > maxResolution) {
    text = "";
  } else if (type == "hide") {
    text = "";
  } else if (type == "shorten") {
    text = text.trunc(12);
  } else if (
    type == "wrap" &&
    (!dom.placement || dom.placement.value != "line")
  ) {
    text = stringDivider(text, 16, "\n");
  }

  return text;
};

const createTextStyle = function (feature: any, resolution: any, dom: any) {
  const align = dom.align.value;
  const baseline = dom.baseline.value;
  const size = dom.size.value;
  const height = dom.height.value;
  const offsetX = parseInt(dom.offsetX.value, 10);
  const offsetY = parseInt(dom.offsetY.value, 10);
  const weight = dom.weight.value;
  const placement = dom.placement ? dom.placement.value : undefined;
  const maxAngle = dom.maxangle ? parseFloat(dom.maxangle.value) : undefined;
  const overflow = dom.overflow ? dom.overflow.value == "true" : undefined;
  const rotation = parseFloat(dom.rotation.value);

  const font = weight + " " + size + "/" + height + " " + dom.font.value;
  const fillColor = dom.color.value;
  const outlineColor = dom.outline.value;
  const outlineWidth = parseInt(dom.outlineWidth.value, 10);

  return new Text({
    textAlign: align == "" ? undefined : align,
    textBaseline: baseline,
    font: font,
    text: getText(feature, resolution, dom),
    fill: new Fill({ color: fillColor }),
    stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
    offsetX: offsetX,
    offsetY: offsetY,
    placement: placement,
    maxAngle: maxAngle,
    overflow: overflow,
    rotation: rotation,
  });
};

export default createTextStyle;

import { Stage, Layer, Circle, Shape, Text } from "react-konva";
import Konva from "konva";
import { useEffect, useState } from "react";

const MonthCircle = ({
  x,
  y,
  rad,
  text,
  fill,
}: {
  x: number;
  y: number;
  rad: number;
  text: string;
  fill: string;
}) => {
  return (
    <>
      <Circle x={x} y={y} radius={rad} fill={fill} />
      <Text
        x={x - 50}
        y={y - 13}
        text={text}
        fontSize={26}
        align="center"
        fontStyle="bold"
        width={100}
        verticalAlign="center"
        height={100}
      />
    </>
  );
};

const Paths = ({
  source,
  dest,
}: {
  source: { x: number; y: number };
  dest: { x: number; y: number };
}) => {
  return (
    <Shape
      stroke={"black"}
      strokeWidth={1}
      sceneFunc={(ctx, shape) => {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.bezierCurveTo(source.x, dest.y, dest.x, source.y, dest.x, dest.y);
        ctx.fillStrokeShape(shape);
      }}
    />
  );
};

const months = ["JAN", "FEB", "MAR", "APR"];

function Canvas() {
  const monthConfig = months.map((month: string, idx: number) => {
    if (idx % 2 == 0) {
      return {
        x: 200,
        y: 200 + idx * 300,
        rad: 50,
        text: month,
        fill: "#FCDFA6",
      };
    } else {
      return {
        x: window.screen.width - 200,
        y: 200 + idx * 300,
        rad: 50,
        text: month,
        fill: "#FFDAD5",
      };
    }
  });

  const monthCircles = monthConfig.map((month: any) => {
    return (
      <MonthCircle
        x={month.x}
        y={month.y}
        rad={month.rad}
        fill={month.fill}
        text={month.text}
      />
    );
  });

  const drawPaths: any[] = [];

  for (let i = 0; i < monthConfig.length - 1; i++) {
    const currx = monthConfig[i].x,
      curry = monthConfig[i].y,
      currdest = monthConfig[i + 1].x,
      currdesty = monthConfig[i + 1].y;

    drawPaths.push(
      <Paths
        source={{ x: currx, y: curry }}
        dest={{ x: currdest, y: currdesty }}
      />
    );
  }

  return (
    <Stage width={window.screen.width} height={300 * 12}>
      <Layer>
        {drawPaths}
        {monthCircles}
      </Layer>
    </Stage>
  );
}

export default Canvas;

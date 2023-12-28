import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle, Shape, Text } from "react-konva";

const MonthCircle = ({
  x,
  y,
  rad,
  text,
  fill,
  fontSize = 26,
}: {
  x: number;
  y: number;
  rad: number;
  text: string;
  fill: string;
  fontSize?: number;
}) => {
  return (
    <>
      <Circle x={x} y={y} radius={rad} fill={fill} />
      <Text
        x={x - 50}
        y={y - fontSize / 2}
        text={text}
        fontSize={fontSize}
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
  stroke,
}: {
  source: { x: number; y: number };
  dest: { x: number; y: number };
  stroke: string;
}) => {
  return (
    <Shape
      stroke={stroke}
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

const TextGroup = ({
  events,
  x,
  y,
  width,
  fill,
}: {
  events: string[];
  x: number;
  y: number;
  width: number;
  fill: string;
}) => {
  const shift = 20,
    initial = Math.floor(events.length / 2) * shift;

  return events.map((event, index) => {
    return (
      <Text
        text={event}
        x={x}
        y={y - initial + index * shift}
        align="center"
        width={width}
        fontSize={shift - 4}
        key={index}
        fill={fill}
      />
    );
  });
};

function Canvas({
  timelineData,
  darkConfig,
}: {
  timelineData: any;
  darkConfig?: {
    monthColor1: string;
    monthColor2: string;
    lineColor: string;
    textColor: string;
    onMonthColorl: string;
    onMonthColor2: string;
  };
}) {
  const [width, height] = useWindowSize();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const divRef = useRef<any>(null);

  useEffect(() => {
    console.log("divref", divRef.current);
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);
  // Darw months
  const monthConfig = timelineData.map((monthData: any, idx: number) => {
    const events = monthData.events;
    if (width < 786) {
      const config = {
        x: 100,
        y: 100 + idx * 200,
        rad: 35,
        text: monthData.month,
        fill: darkConfig?.monthColor1 || "#FCDFA6",
        fontSize: 18,
        events,
      };
      if (idx % 2 != 0) config.fill = darkConfig?.monthColor2 || "#FFDAD5";

      return config;
    }
    if (idx % 2 == 0) {
      return {
        x: 400,
        y: 500 + idx * 300,
        rad: 60,
        text: monthData.month,
        fill: darkConfig?.monthColor1 || "#FCDFA6",
        events,
      };
    } else {
      return {
        x: width - 500,
        y: 500 + idx * 300,
        rad: 60,
        text: monthData.month,
        fill: darkConfig?.monthColor2 || "#FFDAD5",
        events,
      };
    }
  });

  const monthCircles = monthConfig.map((month: any, index: number) => {
    return (
      <MonthCircle
        x={month.x}
        y={month.y}
        rad={month.rad}
        fill={month.fill}
        text={month.text}
        fontSize={month.fontSize}
        key={index}
      />
    );
  });

  const textGroups = monthConfig.map((month: any, index: number) => {
    if (width < 768) {
      return (
        <TextGroup
          events={month.events}
          x={100}
          y={month.y}
          width={width - 100}
          key={index}
          fill={darkConfig?.textColor || "#201a19"}
        />
      );
    }
    return (
      <TextGroup
        events={month.events}
        x={400}
        y={month.y}
        key={month}
        width={width - 500 - 400}
        fill={darkConfig?.textColor || "#201a19"}
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
        key={i}
        stroke={darkConfig?.lineColor || "#201a19"}
      />
    );
  }

  return (
    <>
      <div className="text-onBackground dark:text-onBackgroundDark lg:absolute left-0 text-center right-0  top-8 mt-12">
        <h1 className="md:text-7xl text-5xl font-bold">
          THE
          <span className="text-primary dark:text-primaryDark block">YEAR</span>
        </h1>
        <p className="mt-2">Through our Lense</p>
      </div>
      <div ref={divRef} className="h-full">
        <Stage width={width} height={width > 768 ? height * 5 : height * 4}>
          <Layer>
            {width > 768 ? (
              <Paths
                source={{ x: width - 500, y: 150 }}
                dest={{ x: 400, y: 500 }}
                stroke={darkConfig?.lineColor || "#201a19"}
              />
            ) : null}
            {width > 768 ? (
              <MonthCircle
                x={width - 500}
                y={150}
                text="2023"
                rad={100}
                fill={"#FFB6B6"}
                fontSize={40}
              />
            ) : null}
            {drawPaths}
            {monthCircles}
            {textGroups}
          </Layer>
        </Stage>
      </div>
    </>
  );
}

export default Canvas;

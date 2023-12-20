import useWindowSize from "@/hooks/useWindowSize";
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

const TextGroup = ({
  events,
  x,
  y,
  width,
}: {
  events: string[];
  x: number;
  y: number;
  width: number;
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
      />
    );
  });
};

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function Canvas() {
  const [width, height] = useWindowSize();

  // Darw months
  const monthConfig = months.map((month: string, idx: number) => {
    if (width < 786) {
      const config = {
        x: 100,
        y: 100 + idx * 200,
        rad: 35,
        text: month,
        fill: "#FCDFA6",
        fontSize: 18,
      };
      if (idx % 2 != 0) config.fill = "#FFDAD5";

      return config;
    }
    if (idx % 2 == 0) {
      return {
        x: 400,
        y: 500 + idx * 300,
        rad: 60,
        text: month,
        fill: "#FCDFA6",
      };
    } else {
      return {
        x: width - 500,
        y: 500 + idx * 300,
        rad: 60,
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
        fontSize={month.fontSize}
      />
    );
  });

  const textGroups = monthConfig.map((month: any) => {
    if (width < 768) {
      return (
        <TextGroup
          events={[
            "Digital Fortress",
            "Open Source Starter Pack",
            "Tech Mentorship",
          ]}
          x={100}
          y={month.y}
          width={width - 100}
        />
      );
    }
    return (
      <TextGroup
        events={[
          "Digital Fortress",
          "Open Source Starter Pack",
          "Tech Mentorship",
        ]}
        x={400}
        y={month.y}
        width={width - 500 - 400}
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
    <>
      <div className="text-onBackground dark:text-onBackgroundDark lg:absolute left-0 text-center right-0  top-8 mt-12">
        <h1 className="md:text-7xl text-5xl font-bold">
          THE
          <span className="text-primary dark:text-primaryDark block">YEAR</span>
        </h1>
        <p className="mt-2">Through our Lense</p>
      </div>
      <Stage width={width} height={300 * 14}>
        <Layer>
          {width > 768 ? (
            <Paths
              source={{ x: width - 500, y: 150 }}
              dest={{ x: 400, y: 500 }}
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
    </>
  );
}

export default Canvas;

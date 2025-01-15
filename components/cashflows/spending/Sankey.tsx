"use client";

import { cashFormatter } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Sankey, Tooltip, Rectangle, Layer } from "recharts";

interface SankeyLinks {
  source: number;
  target: number;
  value: number;
}
interface SankeyNode {
  name: string;
}

export default function SankeyChart({
  nodes,
  links,
}: {
  nodes: SankeyNode[];
  links: SankeyLinks[];
}) {
  const data0 = {
    nodes: [
      {
        name: "income", // 0
      },
      {
        name: "one time", // 1
      },
      {
        name: "recurring", // 2
      },
      {
        name: "remaining", // 3
      },
    ],
    links: [
      {
        source: 0,
        target: 1, // expenses
        value: 2256.12, // amt
      },
      {
        source: 0,
        target: 5, // remaining
        value: 2256.12, // amt
      },
      {
        source: 0,
        target: 2,
        value: 7172.99,
      },

      // for each in transactionreoccuringcateogries
      {
        source: 2,
        target: 3,
        value: 4832,
      },
      {
        source: 2,
        target: 4,
        value: 249.99,
      },
    ],
  };

  const data1 = { nodes: nodes, links: links };

  return (
    <>
      <Sankey
        width={1000}
        height={1000}
        data={data1}
        nodePadding={30}
        node={<CNode />}
        link={{ stroke: "#0692FC" }}
        margin={{
          left: 200,
          right: 200,
          top: 100,
          bottom: 100,
        }}
      >
        <Tooltip />
      </Sankey>
    </>
  );
}

const CNode = ({
  x,
  y,
  width,
  height,
  index,
  payload,
  containerWidth,
}: any) => {
  const isOut = x + width + 6 > containerWidth;

  return (
    <>
      <Layer key={`CNODE${index}${x * y}${y}${payload.height}`}>
        <Rectangle
          x={x}
          y={y}
          width={width}
          height={height}
          fill={NODE_FILL}
          fillOpacity="1"
        />

        <text
          textAnchor={isOut ? "end" : "start"}
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2}
          fontSize="14"
        >
          {payload.name}
        </text>
        <text
          textAnchor={isOut ? "end" : "start"}
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2 + 13}
          fontSize="12"
          strokeOpacity="0.5"
        >
          {cashFormatter(payload.value)}
        </text>
      </Layer>
    </>
  );
};

const NODE_FILL = "#7dd3fc";

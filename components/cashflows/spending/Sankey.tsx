"use client";
import fetchTranscationsByTypes, {
  fetchTransactionByCategory,
  TransactionCategoryTotals,
  TransactionTypesTotals,
} from "@/lib/data";
import { cashFormatter } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Sankey, Tooltip, Rectangle, Layer } from "recharts";
import type { User } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

interface SankeyLinks {
  source: number;
  target: number;
  value: number;
}
interface SankeyNode {
  name: string;
}

export default function SankeyChart({ user }: { user: User }) {
  // const data1 = { nodes: nodes, links: links };
  const [data, setData] = useState<{
    nodes: SankeyNode[];
    links: SankeyLinks[];
  }>();

  // on mount fetch data and hydrate chart
  useEffect(() => {
    const fetchData = async () => {
      const transactionCategoryTotals: TransactionCategoryTotals[] =
        await fetchTransactionByCategory(user.id);
      const transactionTypesTotals: TransactionTypesTotals[] =
        await fetchTranscationsByTypes(user.id);

      // console.log(transactionTypesTotals);

      // sort data from transaction types into categories
      const oneTimeTotals =
        Math.abs(
          Number(
            transactionTypesTotals.find((item) => item.type == "expense")
              ?.total_amount,
          ),
        ) || 0.001;

      const recurringTotals =
        Math.abs(
          Number(
            transactionTypesTotals.find((item) => item.type == "reoccuring")
              ?.total_amount,
          ),
        ) || 0.001;

      const paycheckTotals =
        Math.abs(
          Number(
            transactionTypesTotals.find((item) => item.type == "paycheck")
              ?.total_amount,
          ),
        ) || 0.001;

      // console.log(transactionCategoryTotals);

      // attach all nodes to chart
      const nodes: { name: string }[] = [
        {
          name: "income", // 0
        },
        {
          name: "recurring", // 1
        },
        {
          name: "one time expenses", // 2
        },
        {
          name: "left over", // 3
        },
        {
          name: "overspent", // 4
          color: "#ef4444",
        },
      ].concat(
        transactionCategoryTotals.map((item) => {
          return { name: item.category };
        }),
      );

      // append links for recurring transactions w/ categories
      const formattedDataLinks: {
        source: number;
        target: number;
        value: number;
      }[] = transactionCategoryTotals.map((item, index) => {
        return {
          source: 1,
          target: index + 5,
          value: Math.abs(Number(item.total_amount)),
        };
      });

      const links: { source: number; target: number; value: number }[] = [
        {
          source: 0,
          target: 2,
          value: Number.isNaN(oneTimeTotals) ? 0.001 : oneTimeTotals,
          // value: oneTimeTotals,
        },
        {
          source: 0,
          target: 1,
          value: Number.isNaN(recurringTotals) ? 0.001 : recurringTotals,
        },
        {
          source: 0,
          target: 3,
          value: Number.isNaN(paycheckTotals - oneTimeTotals - recurringTotals)
            ? 0.001
            : paycheckTotals - (oneTimeTotals + recurringTotals),
        },
        {
          source: 0,
          target: 4,
          value:
            paycheckTotals - (oneTimeTotals + recurringTotals) < 0
              ? Math.abs(paycheckTotals - (oneTimeTotals + recurringTotals))
              : 0.001,
        },
      ].concat(formattedDataLinks);

      setData({ nodes: nodes, links: links });

      // console.log(Math.abs(paycheckTotals - (oneTimeTotals + 25)));
      // console.log(nodes);
      // console.log(links);
    };

    fetchData();
  }, [user.id]);

  return (
    <div className="p-4 h-fit w-full relative bg-gradient-to-b from-[#FAFAFA] to-[#f3f3f3] dark:from-[#171717] dark:to-[#121212] border border-border rounded-xl shadow-md overflow-x-scroll">
      <h1>Overview</h1>

      {data && (
        <Sankey
          data={data}
          width={675}
          height={750}
          nodePadding={30}
          nodeWidth={20}
          node={<CNode />}
          link={{ stroke: "#f0abfc" }}
          linkCurvature={0.25}
          margin={{
            left: 35,
            right: 150,
            top: 30,
            bottom: 30,
          }}
        >
          <Tooltip />
        </Sankey>
      )}

      {!data && <Skeleton className="h-[700px] rounded-xl" />}
    </div>
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
  const { theme } = useTheme();

  return (
    <>
      <Layer key={`CNODE${index}${x * y}${y}${payload.height}`}>
        <Rectangle
          x={x}
          y={y}
          width={width}
          height={height}
          fill={payload.color || NODE_FILL}
          fillOpacity="1"
          radius={5}
        />

        <text
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2}
          className="text-sm"
          fill={theme === "dark" ? "#fff" : "#000"}
        >
          {payload.name}
        </text>
        <text
          x={isOut ? x - 6 : x + width + 6}
          y={y + height / 2 + 13}
          className="text-xs"
          fill={theme === "dark" ? "#fff" : "#000"}
        >
          {cashFormatter(payload.value)}
        </text>
      </Layer>
    </>
  );
};

const NODE_FILL = "#f0abfc";

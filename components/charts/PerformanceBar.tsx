import React from "react";
import { View, Text } from "react-native";
import { PerformancePt } from "../../services/analytics";

export const PerformanceBar: React.FC<{ data: PerformancePt[]; width?: number; height?: number }> = ({ data, width = 320, height = 220 }) => {
  let Victory: any = null;
  try {
    // Dynamically require to avoid web/unsupported env crashes
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Victory = require("victory-native");
  } catch {}

  if (!Victory || !Victory.VictoryBar) {
    // Fallback placeholder
    return (
      <View style={{ alignItems: "center", justifyContent: "center", height }}>
        <Text>Chart unavailable</Text>
      </View>
    );
  }

  const { VictoryBar } = Victory;

  return (
    <VictoryBar
      data={data}
      x="subject"
      y="score"
      style={{ data: { fill: "#F59E0B" } }}
      alignment="middle"
      width={width}
      height={height}
    />
  );
};

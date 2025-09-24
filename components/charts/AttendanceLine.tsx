import React from "react";
import { View, Text } from "react-native";
import { AttendancePt } from "../../services/analytics";

export const AttendanceLine: React.FC<{ data: AttendancePt[]; width?: number; height?: number }> = ({ data, width = 320, height = 220 }) => {
  let Victory: any = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Victory = require("victory-native");
  } catch {}

  if (!Victory || !Victory.VictoryLine) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", height }}>
        <Text>Chart unavailable</Text>
      </View>
    );
  }

  const { VictoryLine } = Victory;
  const pts = data.map((d, idx) => ({ x: idx + 1, y: d.present ? 1 : 0 }));

  return (
    <VictoryLine
      data={pts}
      style={{ data: { stroke: "#1E3A8A" } }}
      width={width}
      height={height}
    />
  );
};

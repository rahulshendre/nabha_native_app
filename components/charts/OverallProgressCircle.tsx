import React from "react";
import { View, Text } from "react-native";

export const OverallProgressCircle: React.FC<{ value: number; size?: number }> = ({ value, size = 240 }) => {
  let Victory: any = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Victory = require("victory-native");
  } catch {}

  if (!Victory || !Victory.VictoryPie) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", height: size }}>
        <Text>Chart unavailable</Text>
      </View>
    );
  }

  const { VictoryPie } = Victory;
  const v = Math.max(0, Math.min(100, value));
  const data = [
    { x: 1, y: v },
    { x: 2, y: 100 - v },
  ];
  return (
    <VictoryPie
      innerRadius={size / 2 - 50}
      padAngle={2}
      data={data}
      colorScale={["#10B981", "#E5E7EB"]}
      labels={() => ""}
      width={size}
      height={size}
    />
  );
};

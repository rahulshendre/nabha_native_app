import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { PerformancePt } from "../../services/analytics";

export const PerformanceBar: React.FC<{ data: PerformancePt[]; width?: number; height?: number }> = ({ data, width = 320, height = 220 }) => {
  let Victory: any = null;
  try {
    // Dynamically require to avoid web/unsupported env crashes
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Victory = require("victory-native");
  } catch {}

  if (!Victory || !Victory.VictoryBar) {
    const { colors } = useTheme();
    // Fallback: simple horizontal bars
    return (
      <View style={{ padding: 12, gap: 8 }}>
        {data.map((d) => (
          <View key={d.subject}>
            <Text style={{ marginBottom: 4 }}>{d.subject}</Text>
            <View style={{ height: 10, backgroundColor: colors.border, borderRadius: 6, overflow: 'hidden' }}>
              <View style={{ width: `${Math.max(0, Math.min(100, d.score))}%`, backgroundColor: colors.accent, height: '100%' }} />
            </View>
          </View>
        ))}
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

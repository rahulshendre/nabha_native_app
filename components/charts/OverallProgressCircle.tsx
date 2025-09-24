import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export const OverallProgressCircle: React.FC<{ value: number; size?: number }> = ({ value, size = 240 }) => {
  let Victory: any = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Victory = require("victory-native");
  } catch {}

  if (!Victory || !Victory.VictoryPie) {
    const { colors } = useTheme();
    const v = Math.max(0, Math.min(100, value));
    // Fallback: ring progress using nested Views
    return (
      <View style={{ alignItems: "center", justifyContent: "center", padding: 16 }}>
        <View style={{ width: size, height: size, borderRadius: size/2, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: size - 20, height: size - 20, borderRadius: (size-20)/2, backgroundColor: colors.card, position: 'absolute' }} />
          <Text style={{ position: 'absolute', fontWeight: '700' }}>{v}%</Text>
          <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${v}%`, backgroundColor: colors.success, opacity: 0.2, borderTopLeftRadius: size/2, borderBottomLeftRadius: size/2 }} />
        </View>
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

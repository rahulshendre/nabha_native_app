import React from "react";
import { View, Text } from "react-native";
import { AttendancePt } from "../../services/analytics";
import { useTheme } from "../../contexts/ThemeContext";

export const AttendanceLine: React.FC<{ data: AttendancePt[]; width?: number; height?: number }> = ({ data, width = 320, height = 220 }) => {
  let Victory: any = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Victory = require("victory-native");
  } catch {}

  if (!Victory || !Victory.VictoryLine) {
    const { colors } = useTheme();
    // Simple fallback: dots timeline for presence
    return (
      <View style={{ paddingVertical: 12, paddingHorizontal: 8 }}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {data.map((d, idx) => (
            <View
              key={`${d.date}-${idx}`}
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: d.present ? colors.success : colors.border,
              }}
            />
          ))}
        </View>
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

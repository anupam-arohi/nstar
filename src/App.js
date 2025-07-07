import React, { useState } from 'react';

const categories = [
  { name: "Connections", color: "#f9c0d9" },
  { name: "Wealth", color: "#fca652" },
  { name: "Work", color: "#fff176" },
  { name: "Play", color: "#4a5cf5" },
  { name: "Health", color: "#4caf50" }
];

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function App() {
  const [values, setValues] = useState([5, 5, 5, 5, 5]);

  const handleSliderChange = (index, event) => {
    const newVals = [...values];
    newVals[index] = parseInt(event.target.value);
    setValues(newVals);
  };

  const center = [200, 200];
  const outerRadius = 100;
  const innerRadius = 40;

  const getStarPoints = () => {
    const points = [];
    for (let i = 0; i < 5; i++) {
      const angleOuter = ((-90 + i * 72) * Math.PI) / 180;
      const angleInner1 = ((-90 + i * 72 - 36) * Math.PI) / 180;
      const angleInner2 = ((-90 + i * 72 + 36) * Math.PI) / 180;

      const valRatio = values[i] / 10;
      const radius = innerRadius + valRatio * (outerRadius - innerRadius);

      const outerX = center[0] + radius * Math.cos(angleOuter);
      const outerY = center[1] + radius * Math.sin(angleOuter);

      const innerX1 = center[0] + innerRadius * Math.cos(angleInner1);
      const innerY1 = center[1] + innerRadius * Math.sin(angleInner1);

      const innerX2 = center[0] + innerRadius * Math.cos(angleInner2);
      const innerY2 = center[1] + innerRadius * Math.sin(angleInner2);

      points.push([center, [innerX1, innerY1], [outerX, outerY], [innerX2, innerY2]]);
    }
    return points;
  };

  const starPolygons = getStarPoints();
  const today = formatDate(new Date());

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 ml-8">
      <h1 className="text-4xl font-bold mb-1 text-center">Your North-Star Today!</h1>
      <h2 className="text-xl mb-8 text-center">{today}</h2>

      <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-5xl gap-16">
        <div className="flex flex-col w-full max-w-sm">
          {categories.map((cat, i) => (
            <div key={cat.name} className="flex flex-col w-full">
              <div className="flex items-center gap-4 w-full">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={values[i]}
                  onChange={(e) => handleSliderChange(i, e)}
                  className="flex-grow accent-blue-600 order-1"
                />
                <label className="w-28 text-base text-left order-2">{cat.name}</label>
              </div>
              {i !== categories.length - 1 && (
                <div style={{ height: 32 }} />
              )}
            </div>
          ))}
        </div>

        <svg width="400" height="400">
          {starPolygons.map((triangle, i) => (
            <polygon
              key={i}
              points={triangle.map(p => p.join(",")).join(" ")}
              fill={categories[i].color}
              stroke="black"
            />
          ))}
          {categories.map((cat, i) => {
            const angle = ((-90 + i * 72) * Math.PI) / 180;
            const labelX = center[0] + (outerRadius + 20) * Math.cos(angle);
            const labelY = center[1] + (outerRadius + 20) * Math.sin(angle);
            return (
              <text
                key={cat.name}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="14"
                fill="#333"
              >
                {cat.name}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

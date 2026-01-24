import React from "react";
import styles from "../css/HexagonHoneycomb.module.css";

interface HexagonItem {
  image: string;
  name: string;
}

interface HexagonHoneycombProps {
  items: HexagonItem[];
}

const HexagonHoneycomb: React.FC<HexagonHoneycombProps> = ({ items }) => {
  const hexWidth = 147.2; // width = sqrt(3) * 85 (reduced from 173.2)
  const hexHeight = 170; // reduced from 200
  const gap = 8; // gap between hexagons
  const rowOverlap = hexHeight * 0.25 - gap;

  return (
    <div className={styles.honeycombContainer}>
      <div className={styles.honeycombWrapper}>
        {/* Row 1: 4 hexagons */}
        <div
          className={styles.row}
          style={{ marginBottom: `-${rowOverlap}px` }}
        >
          {items.slice(0, 4).map((item, index) => (
            <Hexagon key={index} image={item.image} name={item.name} index={index} />
          ))}
        </div>

        {/* Row 2: 4 hexagons (offset) */}
        <div
          className={styles.row}
          style={{
            marginLeft: `${hexWidth / 2 + gap}px`,
            marginBottom: `-${rowOverlap}px`
          }}
        >
          {items.slice(4, 8).map((item, index) => (
            <Hexagon key={index + 4} image={item.image} name={item.name} index={index + 4} />
          ))}
        </div>

        {/* Row 3: 4 hexagons (aligned with row 1) */}
        {items.length > 8 && (
          <div className={styles.row}>
            {items.slice(8, 12).map((item, index) => (
              <Hexagon key={index + 8} image={item.image} name={item.name} index={index + 8} />
            ))}
          </div>
        )}
      </div>

      {/* Horizontal continuation for remaining clients */}
      {items.length > 12 && (
        <div className={styles.horizontalContinuation}>
          {items.slice(12).map((item, index) => (
            <Hexagon key={index + 12} image={item.image} name={item.name} index={index + 12} />
          ))}
        </div>
      )}
    </div>
  );
};

interface HexagonProps {
  image: string;
  name: string;
  index: number;
}

const Hexagon: React.FC<HexagonProps> = ({ image, name, index }) => {
  return (
    <div className={styles.hexagonWrapper}>
      <svg
        width="147.2"
        height="170"
        viewBox="0 0 173.2 200"
        className={styles.hexagonSvg}
      >
        <defs>
          <clipPath id={`hexClip-${index}`}>
            <polygon points="86.6,0 173.2,50 173.2,150 86.6,200 0,150 0,50" />
          </clipPath>
        </defs>
        {/* Black outline */}
        <polygon
          points="86.6,0 173.2,50 173.2,150 86.6,200 0,150 0,50"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
        />
        <image
          href={image}
          width="120"
          height="120"
          x="26.6"
          y="40"
          clipPath={`url(#hexClip-${index})`}
          preserveAspectRatio="xMidYMid meet"
          className={styles.hexagonImage}
        />
      </svg>
      <div className={styles.hexagonLabel}>
        <span className={styles.hexagonLabelText}>{name}</span>
      </div>
    </div>
  );
};

export default HexagonHoneycomb;

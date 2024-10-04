interface Props {
  items: {
    cropName: string;
    areaSi: number;
    color?: string;
    percentage?: number;
  }[];
}

const ChartBar = ({ items }: Props) => {
  return (
    <div style={styles.progressBar}>
      {items.map((item: any, index: number) => (
        <div
          key={index}
          style={{
            ...styles.progressSegment,
            width: `${item.percentage}%`,
            backgroundColor: item.color,
          }}
        />
      ))}
    </div>
  );
};

const styles = {
  progressBar: {
    display: "flex",
    height: "20px",
    width: "100%",
    borderRadius: "4px",
    overflow: "hidden",
  },
  progressSegment: {
    height: "100%",
    transition: "width 0.5s ease",
  },
};

export default ChartBar;

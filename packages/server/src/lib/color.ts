export function getRandomColor(): string {
  const colors = [
    "#e74c3c", // red
    "#3498db", // blue
    "#2ecc71", // green
    "#f1c40f", // yellow
    "#9b59b6", // purple
    "#1abc9c", // turquoise
    "#e67e22", // orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

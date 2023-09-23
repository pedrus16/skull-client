export default function computePlayerMatPosition(
  radius: number,
  total: number,
  index: number
) {
  const ratio = index / total;
  return {
    x: Math.cos(Math.PI * 2 * ratio) * radius,
    z: Math.sin(Math.PI * 2 * ratio) * radius,
    angle: -Math.PI * 2 * ratio,
  };
}

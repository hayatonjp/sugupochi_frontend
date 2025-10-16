/**
 * 与えられた数に応じて均等に色を生成（HSL）
 * @param {number} count - 必要な色数
 * @returns {string[]} - 色コード配列（例: ['hsl(0,70%,60%)', ...]）
 */
export function generateColorPalette(count) {
  const colors = []
  for (let i = 0; i < count; i++) {
    const hue = Math.round((360 / count) * i)
    colors.push(`hsl(${hue}, 70%, 60%)`)
  }
  return colors
}
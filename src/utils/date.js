export function jst(date) {
    const created = new Date(date)
    const jst =  new Date(created.getTime() + 9 * 60 * 60 * 1000)
    const yyyy = jst.getFullYear()
    const mm = String(jst.getMonth() + 1).padStart(2, '0')
    const dd = String(jst.getDate()).padStart(2, '0')
    const hh = String(jst.getHours()).padStart(2, '0')
    const min = String(jst.getMinutes()).padStart(2, '0')
    const sec = String(jst.getSeconds()).padStart(2, '0')

    return `${yyyy}/${mm}/${dd} ${hh}:${min}:${sec}`
}
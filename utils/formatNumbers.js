export const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
export const thousandSeparator = s => s.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// export const e2pn = s => {
//     const result = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//     return result.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
// }
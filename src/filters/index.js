
export function format(s, n) {
  /*
   * 参数说明：
   * s：要格式化的数字
   * n：保留几位小数
   * */

  n = n >= 0 && n <= 20 ? n : 2;
  s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + '';
  if (n > 0) {
    let l = s.split('.')[0].split('').reverse()
    let r = s.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
  } else {
    let l = s.split('.')[0].split('').reverse()
    let t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    return t.split('').reverse().join('');
  }
}

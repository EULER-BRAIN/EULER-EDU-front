const level2str = (x) => {
  if (x === 'administrator') return '시스템 관리자'
  else if (x === 'director') return '캠퍼스 운영자'
  else if (x === 'teacher') return '선생님'
  return x
}

const getRandomPassword = () => {
  // const randomKeySet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()-_=+?/';
  const randomKeySet = '0123456789abcdefghijklmnopqrstuvwxyz';
  const keyLength = 15;
  let key = '';
  for(var i=0; i<keyLength; i++){
      const index = Math.floor(Math.random() * randomKeySet.length);
      key = key + randomKeySet.charAt(index);
  }
  return key;
}

const timeParsePositive = (t) => {
  t = t/1000;
  if(t<60) return `${ parseInt(t) }초`
  if(t<60*60) return `${ parseInt(t/60) }분`
  if(t<60*60*24) return `${ parseInt(t/60/60) }시간`
  if(t<60*60*24*30) return `${ parseInt(t/60/60/24) }일`
  if(t<60*60*24*365) return `${ parseInt(t/60/60/24/30) }개월`
  return `${ parseInt(t/60/60/24/365) }년`
}

const date2Str = (x) => {
  const t = new Date(x);
  return `${ t.getFullYear() }년 ${ t.getMonth()+1 }월 ${ t.getDate() }일 ${ t.getHours() }시 ${ t.getMinutes() }분`;
}

const date2Str2 = (x, y) => {
  const dateFlow = new Date(x) - new Date(y);
  if (dateFlow > 0) return `${ timeParsePositive(dateFlow) } 후`
  else return `${ timeParsePositive(-dateFlow) } 전`
}

export { level2str, getRandomPassword, date2Str, date2Str2 };

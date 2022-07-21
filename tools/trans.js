const level2str = (x) => {
  if (x === 'administrator') return '시스템 관리자'
  else if (x === 'director') return '캠퍼스 운영자'
  else if (x === 'teacher') return '선생님'
  return x
}

export { level2str };

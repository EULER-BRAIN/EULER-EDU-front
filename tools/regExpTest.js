const loginId = (x) => RegExp("^[a-z0-9_-]{5,20}$").test(x);
const loginPw = (x) => RegExp("^.{10,30}$").test(x);

export default { loginId, loginPw };

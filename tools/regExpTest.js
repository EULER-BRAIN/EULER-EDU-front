const loginId = (x) => RegExp("^[a-z0-9_-]{5,20}$").test(x);
const loginPw = (x) => RegExp("^.{10,30}$").test(x);
const name = (x) => RegExp("^[A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ0-9-_ ]{2,15}$").test(x);
const noticeTitle = (x) => RegExp("^.{1,40}$").test(x);
const noticeLink = (x) => RegExp("^.{1,100}$").test(x);
const awardName = (x) => RegExp("^.{1,30}$").test(x);
const awardContent = (x) => RegExp("^.{1,50}$").test(x);

export default { loginId, loginPw, name, noticeTitle, noticeLink, awardName, awardContent };

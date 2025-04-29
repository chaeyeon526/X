let users = [
  {
    id: "1",
    userid: "kkapple",
    password: "12345678",
    name: "김사과",
    email: "apple@apple.com",
  },
];

// 회원가입
export async function signUp(userid, password, name, email) {
  const exists = users.find((user) => user.userid === userid);
  if (exists) {
    throw new Error("이미 존재하는 아이디입니다.");
  }

  const user = {
    id: Date.now().toString(),
    userid,
    password,
    name,
    email,
  };
  users.push(user);
  return user;
}

// 로그인
export async function login(userid, password) {
  const user = users.find((user) => user.userid === userid);
  if (!user) {
    throw new Error("존재하지 않는 아이디입니다.");
  }
  if (user.password !== password) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }
  return user;
}

// authRepository.js

// 임시 메모리 저장소 (DB 대신 배열 사용)
const users = [];

// userid로 사용자 찾기
function findByUserid(userid) {
  return users.find((user) => user.userid === userid);
}

// 새로운 사용자 저장
function save(user) {
  users.push(user);
  return user;
}

// users 전체 보기 (디버깅용)
function findAll() {
  return users;
}

module.exports = {
  findByUserid,
  save,
  findAll,
};

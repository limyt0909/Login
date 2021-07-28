//https://shyunju7.tistory.com/37

//https://blog.javabom.com/minhee/session/storage/localstorage-sessionstorage/react
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const LocalStorageComponent = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userpw, setUserpw] = useState("");
  const [check, setCheck] = useState(false);

  const saveData = () => {
    const userObj = { name: userName };
    console.log(userObj);
    window.sessionStorage.setItem("userName", JSON.stringify(userObj));

    const userObj2 = { pw: userpw };
    console.log(userObj2);
    window.sessionStorage.setItem("userpw", JSON.stringify(userObj2));
  };

  const callData = () => {
    setCheck(true);
  };

  const onChange = (e) => {
    setUserName(e.target.value);
    setCheck(false);
  };

  const onChangepw = (e) => {
    setUserpw(e.target.value);
    setCheck(false);
  };

  //로그인 정보를 올리는 API
  const login = () => {
    const loginInfo = {
      name: userName,
      pw: userpw,
    };
    console.log(loginInfo);
    axios.post("http://localhost:8080/login/courses", loginInfo).then((res) => {
      history.push("/");
    });
  };

  return (
    <div>
      <input
        name="userName"
        value={userName}
        onChange={onChange}
        placeholder="이름을 입력하세요!"
      />
      <input
        name="pw"
        value={userpw}
        onChange={onChangepw}
        placeholder="비밀번호 입력하세요!"
      />

      <button onClick={saveData}>저장하기</button>
      <button onClick={callData}> 불러오기</button>
      <button onClick="">로그아웃</button>
      <button onClick={login}>로그인 API</button>

      {check ? (
        <p>
          {window.sessionStorage.getItem("userName")}
          {window.sessionStorage.getItem("userpw")}
        </p>
      ) : (
        <> </>
      )}
    </div>
  );
};

export default LocalStorageComponent;

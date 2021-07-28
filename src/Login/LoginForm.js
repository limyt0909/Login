//https://shyunju7.tistory.com/37

//https://blog.javabom.com/minhee/session/storage/localstorage-sessionstorage/react
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LocalStorageComponent = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [userpw, setUserpw] = useState("");
  const [check, setCheck] = useState(false);

  const saveData = () => {
    //로그인 API
    const loginInfo = {
      id: userID,
      pw: userpw,
    };
    console.log(loginInfo);
    axios.post("http://localhost:8080/login/", loginInfo).then((x) => {
      console.log(x.data);
      window.sessionStorage.setItem("userName", x.data.name);

      // const userObj2 = { pw: userpw };
      // console.log(userObj2);
      // window.sessionStorage.setItem("userpw", JSON.stringify(userObj2));
      setUserName(window.sessionStorage.getItem("userName"));
      setCheck(true);
    });
  };

  const LogCurrentName = () => {
    console.log({ name: window.sessionStorage.getItem("userName") });
  };
  //삭제 API
  const deleteData = () => {
    window.sessionStorage.clear();
    LogCurrentName();

    setUserName("");
    setCheck(false);
  };

  const callData = () => {
    LogCurrentName();
  };
  const onChange = (e) => {
    setUserID(e.target.value);
  };

  const onChangepw = (e) => {
    setUserpw(e.target.value);
  };

  //로그인 정보를 올리는 API

  return (
    <div>
      {check ? (
        <p>{userName + "님 환영합니다."}</p>
      ) : (
        <div>
          <input
            name="ID"
            value={userID}
            onChange={onChange}
            placeholder="이름을 입력하세요!"
          />
          <input
            name="pw"
            value={userpw}
            onChange={onChangepw}
            placeholder="비밀번호 입력하세요!"
          />
        </div>
      )}
      {!check ? (
        <button onClick={saveData}>로그인</button>
      ) : (
        <button onClick={deleteData}>로그아웃</button>
      )}

      <button onClick={callData}>세션정보</button>
    </div>
  );
};

export default LocalStorageComponent;

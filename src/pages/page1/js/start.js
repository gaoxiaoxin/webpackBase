document.addEventListener("DOMContentLoaded", ready);
import axios from "axios";
async function ready() {
  sessionStorage.setItem("code", "");
  var keyword = await prompt("请输入上一关卡得到的密码：");
  var id = prompt("请输入用户名(年级-专业-姓名）：");
  var x = document.getElementById("info-box");
  axios({
    method: "post",
    url: "http://2022.sipcoj.com:38080/keycheck",
    data: {
      userName: id,
      password: keyword,
      level: 5,
    },
    headers: {
      "content-type": "application/json",
    },
  })
    .then(function (response) {
      if (response.data.code == "00000") {
        x.style.visibility = "visible";
      } else if (response.data.code == "C0000") {
        alert("用户名不能为空");
        location.reload();
      } else {
        alert("密码错误");
        location.reload();
      }
    })
    .catch(function () {
      alert("密码错误");
    });
}

window.onload = function () {
  console.log("听说学长喜欢用-连接的东西");
};

function send() {
  console.log("start...");
  console.log("有时候许多东西需要连续尝试~");
  var ipt = document.getElementById("fasong");
  var code = ipt.value;
  sessionStorage.setItem("code", code);
  axios({
    method: "post",
    baseURL: "",
    url: "api/task5/login",
    data: { code },
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      code: code,
    },
    withCredentials: true,
  })
    .then((res) => {
      if (res.data.code === "00000") {
        var link = document.querySelector(".btna");
        link.href = "./download.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export { send };

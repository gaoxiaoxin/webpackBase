import axios from "axios";

function sent() {
  alert("恭喜你进入hyg学姐的秘密花园");
  window.location.replace("/code.html");
}
function send() {
  console.log("111");
  window.location.href = "http://2022.sipcoj.com/level5/DAXIE.zip";
}
function fasong() {
  var ipt = document.getElementById("fasong");
  var secretKey = ipt.value;
  console.log(secretKey);
  let codeId = sessionStorage.getItem("code");
  axios({
    method: "post",
    baseURL: "",
    url: "api/task5/part2",
    data: { secretKey },
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      code: codeId,
    },
    withCredentials: true,
  })
    .then((res) => {
      console.log(res.data.code);
      if (res.data.code === "00000") {
        window.location.replace("/final.html");
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export { sent, send, fasong };

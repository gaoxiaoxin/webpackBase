import axios from "axios";
function check() {
  var ipt = document.getElementById("ipt");
  var secretKey = ipt.value;
  axios({
    method: "post",
    baseURL: "",
    url: "api/task5/part3",
    data: {
      secretKey,
    },
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      code: sessionStorage.getItem("code"),
    },
    withCredentials: true,
  })
    .then((res) => {
      console.log(res);
      if (res.data.code !== "00000") {
        return alert(res.data.message);
      }
      alert(res.data.message + ",恭喜你完成了隐藏关卡!");
      window.location.replace("/download.html");
    })
    .catch((err) => {
      console.log(err);
    });
}

export { check };

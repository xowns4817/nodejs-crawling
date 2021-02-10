const request = require("request-promise");
const cheerio = require("cheerio");
const v = require("voca");
const readline = require("readline");

let location = "서울특별시 동대문구 전농동 날씨";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('주소를 입력하세요 : ', answer => {
    location = answer;
    location += ' 날씨';
    getWeatherData();

    rl.close();
  });

function getWeatherData() {
  console.log("데이터 수집중...");
  let requestUrl =
    "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=" +
    encodeURI(location) +
    "&oquery=" +
    encodeURI("날씨");

  request(requestUrl).then(function (html) {
    // Cheerio 오브젝트 생성
    const $ = cheerio.load(html);

    // 셀렉터 캐시로 Cheerio 오브젝트 생성
    const todayWeatherData = $(".today_area .main_info .info_data");
    const todayAirData = $(".today_area .sub_info");

    console.log("======현재 날씨!======");
    let title = todayWeatherData.text();
    console.log(title);
    let title2 = todayAirData.text();
    console.log(title2);
  });
}

const loadBtn = document.getElementById('btn-load');
const filterBtn = document.getElementById('btn-filter');
const bikeList = document.getElementById('bike-list');

const API_URL = "http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/bikeList/1/30/";

// [함수 1] 화면에 리스트를 그려주는 기능
function render(stations) {
    bikeList.innerHTML = ""; // 이전 내용 삭제

    console.log(stations);

    stations.forEach(station => {

        console.log(station);

        const li = document.createElement('li');

        // 이름에서 번호 제거 (정규표현식) 및 대수 가져오기
        const name = station.stationName.replace(/.*\. /, "");
        const count = station.parkingBikeTotCnt;

        li.textContent = `${name} : ${count}대 남음`;
        bikeList.appendChild(li);
    });
}

// [함수 2] fetch 통신 기능 (.then 방식)
function getData(isFilter) {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error("연결 실패");
            return response.json();
        })
        .then(data => {
            let rows = data.rentBikeStatus.row;

            // 필터 모드일 때만 고차함수 filter 사용
            if (isFilter) {
                rows = rows.filter(item => Number(item.parkingBikeTotCnt) >= 5);
            }

            render(rows); // 화면 그리기 함수 호출
        })
        .catch(err => console.error("에러:", err));
}

// [이벤트 연결]
loadBtn.addEventListener('click', () => getData(false));
filterBtn.addEventListener('click', () => getData(true));
# 로또 웹

로또 당첨번호가 업데이트 되면 항상 네이버에서 로또 당첨번호 조회를 검색하거나 동행복권 홈페이지에서 당첨번호 결과를 확인했는데 이에 불편함을 느끼고 당첨번호 조회, 결과 확인을 할 수 있는 웹을 개발 해보기로 했다.

## 사이트
[https://hyeokjoon.com/lotto](https://hyeokjoon.com/lotto)

## 기능

- 최근 당첨번호 확인
- 1년치 당첨번호 내역 조회
- 수기입력으로 당첨 결과 확인
- QR 코드로 당첨 결과 확인
- AR 기술 적용해서 당첨 결과 확인

## 구현 방법

- 파이썬으로 웹 크롤링해서 당첨번호 업데이트
- 크롤링한 데이터 개인 라즈베리파이4 서버에 JSON파일로 저장
- Vue.js로 웹 개발
- 웹에서 API 호출해서 JSON 데이터 가져오기

## 전체 코드

웹 : [https://github.com/orijoon98/LottoVue](https://github.com/orijoon98/LottoVue)

크롤링 : [https://github.com/orijoon98/LottoApi](https://github.com/orijoon98/LottoApi)

## 크롤링

![스크린샷 2021-09-14 오후 2 13 12](https://user-images.githubusercontent.com/74812188/135011033-4526dd7e-4a60-418c-b3af-e4f655bfcdb1.png)

[https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=978](https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=978)

drwNo에 회차 번호를 입력하면 다음과 같은 JSON을 확인할 수 있다.

가장 최근에 업데이트된 회차부터 53개의 회차가 1년치 회차인데 동행복권 사이트에 업데이트 된 가장 최근 회차 번호를 크롤링 한 후 해당 회차부터 53개 회차를 위의 url로 검색해서 JSON 데이터를 모두 가져왔다.

```python
def setNew(): # 가장 최근 회차 번호 업데이트
    
    url = 'https://dhlottery.co.kr/gameResult.do?method=byWin&wiselog=H_C_1_1'
    html = urllib.request.urlopen(url).read()
    soup = BeautifulSoup(html, 'html.parser')

    text = ""

    for meta in soup.head.find_all('meta'):
        text += str(meta.get('content'))
        text += '\n'

    index = 0
    numbers = []
    flag = False

    for x in text:
        if x >= '0'and x <= '9':
            if flag == False:
                numbers.append("")
            numbers[index] += str(x)
            flag = True
        else:
            if flag == True: 
                index += 1
                flag = False

    return int(numbers[0]) # 가장 최근 회차 번호
		# numbers index 별 정보
    # 0 : 회차
    # 1 ~ 6 : 당첨 번호
    # 7 : 보너스 번호
    # 9 : 1등 당첨 인원 수
    # 11 ~ end : 1등 1인당 당첨 금액
```

beautifulsoup4 라이브러리를 사용해서 필요한 html 부분을 받아왔고 numbers 배열에 최근 회차에 대한 정보들을 저장했다. 필요한 부분은 최근 회차 번호인 numbers[0] 이다.

```python
def setData(): # 토요일 오후 10시마다 호출
    LottoList = OrderedDict()
    
    LottoList["datas"] = []

    new = setNew() + 1 # 가장 최근 회차 + 1, 다음에 받아올 회차
    old = new - 53  # 가장 최근 회차 - 52

    for i in range(old, new): # 최근 1년치 정보
        url = "https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=" + str(i)
        result = urlopen(url).read()
        lotto = json.loads(result)

        drwNoDate = lotto["drwNoDate"]
        drwNo = lotto["drwNo"]
        drwtNo1 = lotto["drwtNo1"]
        drwtNo2 = lotto["drwtNo2"]
        drwtNo3 = lotto["drwtNo3"]
        drwtNo4 = lotto["drwtNo4"]
        drwtNo5 = lotto["drwtNo5"]
        drwtNo6 = lotto["drwtNo6"]
        bnusNo = lotto["bnusNo"]
        firstWinamnt = lotto["firstWinamnt"]
        firstAccumamnt = lotto["firstAccumamnt"]
        firstPrzwnerCo = lotto["firstPrzwnerCo"]
        totSellamnt = lotto["totSellamnt"]

        LottoList["datas"].append({
            "drwNoDate":drwNoDate,
            "drwNo":drwNo,
            "drwtNo1":drwtNo1,
            "drwtNo2":drwtNo2,
            "drwtNo3":drwtNo3,
            "drwtNo4":drwtNo4,
            "drwtNo5":drwtNo5,
            "drwtNo6":drwtNo6,
            "bnusNo":bnusNo,
            "firstWinamnt":firstWinamnt,
            "firstAccumamnt":firstAccumamnt,
            "firstPrzwnerCo":firstPrzwnerCo,
            "totSellamnt":totSellamnt
        })

    with open("/home/pi/Lotto/lotto.json", 'w', encoding="utf-8") as make_file:
        json.dump(LottoJson, make_file, ensure_ascii=False, indent="\t")
```

이후 53개 회차에 대한 JSON 정보를 배열에 저장해 라즈베리파이에 저장했다. 라즈베리파이에서 백그라운드로 토요일 저녁 10시마다 크롤링을 실행하게 해서 일주일마다 데이터가 업데이트 되게 구현했다.

```php
<?php
    $fp = fopen("/home/pi/Lotto/lotto.json", r) or die("파일을 열 수 없습니다!");

    while(!feof($fp)){
        echo fgets($fp);
    }

    fclose($fp);
?>
```

lotto.json 에 저장된 데이터들을 라즈베리파이에 설치한 apache2 웹 서버에 표시 할 수 있도록 php 파일을 만들었다.

## 웹에서 API 호출

Vue.js 로 개발을 진행했고 axios를 사용해 라즈베리파이의 lotto.json 파일의 데이터들을 사용할 수 있게 처리했다.

```jsx
created() {
      const URI = "https://hyeokjoon.com/data/lottodata.php";
      axios.get(URI)
      .then((result) => {
        this.datas = result.data.datas;
			})
}
```

## 홈 화면

![스크린샷 2021-09-14 오후 2 34 39](https://user-images.githubusercontent.com/74812188/135011083-90483972-0c00-46ca-9fd1-5faddaab500d.png)

## 지난 내역 화면

![스크린샷 2021-09-14 오후 3 03 32](https://user-images.githubusercontent.com/74812188/135011100-b6dad9b2-de44-40e1-a432-77764238853b.png)


```html
<b-table class="historytable" striped hover :items="items" :fields="fields" dark></b-table>
```

```jsx
fields: ["회차", "당첨번호", "당첨자수", "1등 당첨금"];

for(var i=0;i<=52;i++) {
	this.drwNo[i] = this.datas[i].drwNo;
  this.drwNoDate[i] = this.datas[i].drwNoDate;
  this.drwtNo1[i] = this.datas[i].drwtNo1;
  this.drwtNo2[i] = this.datas[i].drwtNo2;
  this.drwtNo3[i] = this.datas[i].drwtNo3;
  this.drwtNo4[i] = this.datas[i].drwtNo4;
  this.drwtNo5[i] = this.datas[i].drwtNo5;
  this.drwtNo6[i] = this.datas[i].drwtNo6;
  this.bnusNo[i] = this.datas[i].bnusNo;
  this.firstWinamnt[i] = this.datas[i].firstWinamnt;
  this.firstPrzwnerCo[i] = this.datas[i].firstPrzwnerCo;
  this.firstAccumamnt[i] = this.datas[i].firstAccumamnt;
	
	this.items.splice(52-i, 1, {
	  "회차": this.drwNo[i],
    "당첨번호": winNumber,
    "당첨자수": this.firstPrzwnerCo[i],
    "1등 당첨금": winAmnt
  });
}
```

bootstrap vue 의 table을 이용해서 구현했다.

## 수기입력 확인 화면

![스크린샷 2021-09-14 오후 2 37 30](https://user-images.githubusercontent.com/74812188/135011131-b25b5c07-82e9-4bd2-83d8-fd527188fe44.png)


번호를 입력하면 숫자를 모두 입력했는지, 1 ~ 45 범위 내의 숫자인지, 중복되지 않았는지, 1년 이내의 회차인지 확인한 후 만약 조건을 만족하지 않는다면 모달을 띄운다.

![스크린샷 2021-09-14 오후 2 41 20](https://user-images.githubusercontent.com/74812188/135011158-f16f000e-6c09-45af-8a4d-f530f8428476.png)


조건을 모두 만족하면 당첨 결과를 모달로 띄워준다.

![스크린샷 2021-09-14 오후 2 42 26](https://user-images.githubusercontent.com/74812188/135011177-faed1d3b-ae5e-4cf2-8573-aa67791d032e.png)


```jsx
for(var input of inputArr) {
	for(var i=0;i<6;i++) {
	  if(parseInt(input) == parseInt(winNum[i])) {
	     cnt++;
		}
    if(parseInt(input) == parseInt(winNum[6])) {
       bnusCnt++;
       break;
    }
  }
}
```

당첨번호 6개와 일치하는 개수, 보너스 번호와 일치하는 개수에 따라 등수를 구분해준다.

## QR 코드 확인 화면

![스크린샷 2021-09-14 오후 2 51 45 (1)](https://user-images.githubusercontent.com/74812188/135011213-0e964d12-496c-4a6e-851d-828053793eef.png)


vue-qrcode-reader 라는 라이브러리를 사용했고 복권용지에 있는 QR코드를 촬영하게 되면 url을 결과값으로 준다.

[https://m.dhlottery.co.kr/qr.do?method=winQr&v=0949q142135364044q052330344344q030913314245q132432333738q0406151823261904598894](https://m.dhlottery.co.kr/qr.do?method=winQr&v=0949q142135364044q052330344344q030913314245q132432333738q0406151823261904598894%EF%BB%BF)

이런 형태의 url이 결과값으로 나오는데 자세히 보면 번호들에 회차정보, 입력 번호들이 주어진다.

```jsx
str = str.replace(/[^0-9]/g, '');
this.inputs[i] = str.substr(4 + 12 * i, 12);
var one = parseInt(this.inputs[i].substr(0, 2));
var two = parseInt(this.inputs[i].substr(2, 2));
var three = parseInt(this.inputs[i].substr(4, 2));
var four = parseInt(this.inputs[i].substr(6, 2));
var five = parseInt(this.inputs[i].substr(8, 2));
var six = parseInt(this.inputs[i].substr(10, 2));
```

url에서 숫자들만 가져온 후 substr을 이용해서 번호들을 분리해서 데이터화했다.

![스크린샷 2021-09-14 오후 2 59 14](https://user-images.githubusercontent.com/74812188/135011248-db1992f7-3b91-47f2-b70a-f3b3a9fdfd32.png)

QR 코드를 촬영하면 다음과 같이 결과가 출력된다.

## AR 기능 확인 화면

![스크린샷 2021-09-17 오후 4 24 58](https://user-images.githubusercontent.com/74812188/135011278-fbdcdb1d-3fd5-4c43-9a4f-cc04c869beba.png)

### 구현 방법

1. 사진을 촬영하고 원하는 글자가 있는 부분을 잘라내서 사용한다.
2. 잘라낸 부분의 인식률을 높이기 위해 grayscale을 적용한다.
3. tesseract.js 를 사용해서 글자를 읽는다.
4. 읽은 글자 중 숫자만 추려내서 데이터화한다.

```jsx
capture() {
  this.cropcanvas = this.$refs.cropcanvas;
  if (this.device == "PC") {
  // PC
    this.cropcanvas
    .getContext("2d")
    .drawImage(this.video, 212, 150, 255, 195, 0, 0, 255, 195);
    const cropimg = document.getElementById("crop-img");
    cropimg.setAttribute("src", this.cropcanvas.toDataURL());
  } else {
     // 모바일
     this.cropcanvas
     .getContext("2d")
     .drawImage(this.video, 108, 195, 297, 240, 0, 0, 297, 240);
     const cropimg = document.getElementById("crop-img");
     cropimg.setAttribute("src", this.cropcanvas.toDataURL());
  }
  this.captured = true;
}
```

이미지를 캡쳐한 후 원하는 부분만큼 잘라내는 코드이다.

데스크탑과 모바일에서 비디오 영역이 다르기 때문에 따로 구현해줬다.

```jsx
gray() {
  // 그레이 스케일
  var image = document.getElementById("crop-img");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  var imageData = ctx.getImageData(0, 0, image.width, image.height);
  for (var i = 0; i < imageData.data.length; i += 4) {
    var avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = avg;
    imageData.data[i + 1] = avg;
    imageData.data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0, 0, 0, imageData.width, imageData.height);
  const img = document.getElementById("crop-img");
  img.setAttribute("src", canvas.toDataURL());
}
```

이미지를 grayscale 하는 부분인데 핵심은 red green blue 를 각각 3으로 나눈 값으로 바꿔주면 된다.

```jsx
recognize: async () => {
  const img = document.getElementById("crop-img");
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  await worker.setParameters({
    tessedit_char_whitelist: "0123456789",
  });
  const { data: { text } } = await worker.recognize(img);
  await worker.terminate();
  console.log(text);
  return text;
}
```

tesseract.js 를 사용해서 이미지에서 글자를 읽는 코드이다. 깔끔한 텍스트는 인식률이 제법 높지만 글자들의 위치가 일정하지 않거나 글자 이외에 그림이 섞여있거나 한다면 인식률이 많이 떨어진다. 이미지를 잘라내서 인식을 시도한 이유이다.

![lotto (1)](https://user-images.githubusercontent.com/74812188/135011481-8bc287cd-647f-4868-8559-9b37171d825d.jpeg)


이렇게 사진을 촬영한다고 하면 필요한 데이터는 회차 번호와 추첨 번호들인데 로고, qr코드, 알파벳, 한글 등이 숫자를 읽는데 방해가 될 수 있다.


![스크린샷 2021-09-17 오후 4 40 12 (1)](https://user-images.githubusercontent.com/74812188/135011505-034a89ed-30f6-4529-b0b2-25aaa6ddc891.png)


그래서 이미지를 잘라낼 때는 이런식으로 잘라낸 후 grayscale을 적용하고 인식을 시도했다. 

![스크린샷 2021-09-17 오후 4 41 11 (1)](https://user-images.githubusercontent.com/74812188/135011521-706e963b-971c-4213-90f9-4eaf7a1ed256.png)

그럼에도 불구하고 인식률은 많이 떨어진다. 사진을 찍는 각도에 따라, 거리에 따라 잘라내지는 이미지가 원하는 형태로 나오지 않는 경우가 많고 정확히 나오더라도 원인 모를 문자들이 인식되는 경우가 있다.

![스크린샷 2021-09-17 오후 4 43 08](https://user-images.githubusercontent.com/74812188/135011543-c0fa29ff-7a7a-4ede-96ea-111f7ae59887.png)

인식을 성공했을 때는 QR코드의 결과화면과 동일하게 출력된다.

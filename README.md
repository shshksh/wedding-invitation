# 모바일 청첩장 (GitHub Pages)

## 구조
```
index.html          페이지 본문 (공유 썸네일 og: 태그 포함)
css/style.css       디자인
js/config.js        ★ 이름·날짜·장소·링크·계좌·사진 경로 (여기만 수정)
js/main.js          인터랙션 (수정 불필요)
images/
  hero.jpg          메인 표지 사진      1080x1920 세로
  groom.jpg         신랑 프로필         600x800 (3:4)
  bride.jpg         신부 프로필         600x800 (3:4)
  map.jpg           약도 이미지         960x420 (생략 가능)
  thumb.jpg         메신저 공유 썸네일  1200x630
  gallery/
    gallery-01.jpg  가로 4:3   (예: 1600x1200)
    gallery-02.jpg  세로 3:4   (예: 1200x1600)
    gallery-03.jpg  세로 3:4
    gallery-04.jpg  정사각 1:1 (예: 1200x1200)
    gallery-05.jpg  정사각 1:1
    gallery-06.jpg  정사각 1:1
```
임시 이미지를 **같은 파일명으로 덮어쓰기**만 하면 교체됩니다. 사진당 300~500KB 이하(JPG) 권장.

## 배포
1. GitHub에 저장소를 만들고 이 폴더 내용을 그대로 업로드합니다.
2. Settings → Pages → Branch: `main` / `(root)` 선택 후 저장합니다.
3. 주소는 `https://USERNAME.github.io/REPO/` 입니다.

## 공유 썸네일
`index.html` 상단 `og:image`, `og:url` 의 `USERNAME`/`REPO` 를 본인 주소로 바꾸세요.
제목·설명(`og:title`, `og:description`)도 같은 곳에서 수정합니다. 카카오톡은 썸네일을 캐시하므로,
바꾼 뒤 반영이 안 되면 카카오 개발자 도구의 공유 디버거에서 캐시를 초기화하세요.

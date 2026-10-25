# 개인 홈페이지 사용 안내

CV를 바탕으로 만든 영문 연구자 홈페이지입니다. [홈페이지 보기](https://sohyunkim3.github.io/) · [GitHub 파일 보관함](https://github.com/sohyunkim3/sohyunkim3.github.io)

논문은 **Journal 5편**과 **Conference 2편**으로 나눕니다. Journal 안에서 상태 태그로 **Published 2편 / Under revision 2편 / Preprint 1편**을 표시합니다.

## 1. 내 컴퓨터에서 보고 고치기

`index.html`을 두 번 클릭하면 브라우저에서 열립니다. 내용을 고칠 때는 이 파일을 메모장이나 코드 편집기로 열어 문장을 수정하고 저장하세요. 브라우저를 새로고침하면 확인할 수 있습니다. 처음에는 `<...>`로 둘러싸인 코드보다 문장만 바꾸는 것이 쉽습니다.

- `index.html`: 자기소개, 논문, 수상 내역과 링크
- `styles.css`: 색상, 글꼴, 화면 배치
- `script.js`: 메뉴 표시와 그림 배치·확대 보기
- `assets/profile.png`: 프로필 사진
- `assets/cv.pdf`: 방문자가 내려받는 CV
- `assets/icons/`, `assets/favicon.svg`: 아이콘

CV나 프로필 사진은 같은 파일 이름으로 교체하면 됩니다. 원본 CV 자료가 있는 `CV/`와 방문자에게 공개하는 `assets/cv.pdf`는 별개입니다.

## 2. 논문과 상장 파일 정리

논문·상장은 **항목마다 폴더 하나**에 모으고, 공개할 최종 `figure.png` 또는 `certificate.jpg`만 둡니다. 기존 원본 8개는 `.archive/original-figures.zip` 하나로 압축 보관합니다. 이 압축파일은 Git에서 제외해 컴퓨터에만 남깁니다.

```text
publications/
├── journal/
│   ├── shaping-filter-ekf/              # figure.png
│   ├── aerial-threat-review/            # 현재 그림 없음
│   ├── bayesian-cann/                   # figure.png
│   ├── adaptive-tobit-kalman-filter/     # figure.png
│   └── lstm-kalman-filter/              # figure.png
└── conference/
    ├── threat-assessment-eda/            # 현재 그림 없음
    └── parameter-updating-dbn/           # 현재 그림 없음

awards/
├── masters-excellence-scholarship/       # certificate.jpg
├── national-science-technology-scholarship/ # certificate.jpg
├── ev-energy-challenger/                 # certificate.jpg
└── academic-excellence-scholarships/      # 현재 그림 없음
```

그림이 없는 폴더의 `.gitkeep`는 빈 폴더를 Git에 남겨 두는 파일입니다. 그림을 넣기 전까지 그대로 두면 됩니다. 상장 사진은 내용을 가리지 않은 `certificate.jpg`를 사용합니다.

## 3. 연구 그림 추가·교체

해당 논문 폴더의 `figure.png`를 교체하세요. 새 그림을 연결할 때는 `index.html`에서 논문 제목을 찾은 다음, 그 논문의 `<article ...>` 시작 부분에 경로와 짧은 그림 설명을 넣습니다. `data-type`은 기존 값을 유지하세요.

```html
<article class="publication" data-type="journal" data-image="publications/journal/shaping-filter-ekf/figure.png" data-image-alt="Comparison of railway vehicle estimation results">
```

그림 없이 글만 표시하려면 경로를 비우세요.

```html
<article class="publication" data-type="journal" data-image="">
```

`data-image` 속성을 넣지 않아도 글만 표시됩니다. 그림을 불러오지 못해도 글은 그대로 보입니다. 그림은 누르면 크게 볼 수 있습니다.

데스크톱에서는 왼쪽에 폭 186px의 같은 **4:3 틀**로 배치합니다. 그림 전체가 원래 비율을 유지하며 가로·세로 중앙에 들어갑니다. 세로 그림은 좌우에, 가로 그림은 위아래에 여백이 생길 수 있습니다. 이미지 파일 자체에 들어 있는 흰 여백은 자동으로 제거하지 않습니다. 모바일에서는 원래 비율에 따라 높이를 맞추며, 최대 폭 260px·높이 210px 안에 표시합니다.

## 4. GitHub에서 홈페이지 업데이트하기

**Git이 내 컴퓨터의 폴더 전체를 자동으로 업로드하는 것은 아닙니다. 선택한 파일의 변경 내용을 저장하고 GitHub에 반영하는 방식입니다.** 컴퓨터에서 수정한 것만으로 공개 홈페이지가 바뀌지는 않습니다.

처음에는 터미널 없이 GitHub 웹 화면에서 수정할 수 있습니다.

1. [기존 홈페이지 저장소](https://github.com/sohyunkim3/sohyunkim3.github.io)의 **Code** 화면을 여세요.
2. 문구만 바꿀 때는 `index.html`을 열고 연필 모양의 **Edit** 버튼으로 수정한 뒤 **Commit changes**를 누르세요. Commit은 변경 내용을 저장하고 기록한다는 뜻입니다.
3. 컴퓨터에서 고친 파일을 올릴 때는 **GitHub의 같은 폴더**를 연 뒤 **Add file → Upload files**를 누르세요. 예를 들어 연구 그림을 바꿨다면 `publications/journal/shaping-filter-ekf/` 안에서 **`figure.png` 하나만** 선택합니다. 상장은 해당 `awards/항목이름/` 안에서 **`certificate.jpg` 하나만** 선택합니다.
4. `index.html`, `styles.css`, `script.js`는 저장소 맨 위에 올리고, CV는 `assets/` 안에 `cv.pdf`로 올리세요. 올릴 파일을 확인한 다음 **Commit changes**를 누르세요.

**웹 화면의 Upload files에는 `.gitignore`가 적용되지 않습니다.** `.archive/`, `CV/`, `.preview/`나 작업 폴더 전체를 올리지 말고, 공개할 사이트용 파일만 선택하세요. 이 세 폴더는 로컬 Git에서도 제외합니다.

파일 위치를 바꾸면 `index.html`의 경로도 함께 바꿔야 합니다. GitHub에서 직접 문구를 고친 경우에는 컴퓨터 파일도 같은 내용으로 맞춰 두면 다음 업로드 때 헷갈리지 않습니다.

## 5. 공개 상태 확인하기

저장소의 **Settings → Pages**에서 공개 상태를 확인할 수 있습니다. 공개 설정은 **Deploy from a branch → main → /(root) → Save**입니다. 설정이 되어 있으면 파일을 바꿀 때마다 다시 설정할 필요가 없습니다.

변경 내용이 [https://sohyunkim3.github.io/](https://sohyunkim3.github.io/)에 반영되기까지 최대 10분 정도 걸릴 수 있습니다. Pages 화면의 **Visit site**로 확인하세요.

공식 도움말: [GitHub Pages 공개 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 6. 방문 통계 확인하기

홈페이지에는 Google Analytics 측정 ID **`G-3KG1H16RN8`**를 연결했습니다. 측정 대상 주소는 `https://sohyunkim3.github.io/`이며, GitHub 저장소 화면 방문과는 별개입니다. `index.html`의 `<head>` 안에 태그를 한 번만 넣었으므로 같은 태그를 추가로 붙일 필요가 없습니다.

[Google Analytics](https://analytics.google.com/)에서 이 측정 ID가 연결된 속성을 선택하고 **보고서 → 실시간**을 열면 최근 접속을 확인할 수 있습니다. 일반 보고서의 방문자 수·지역·참여 시간은 수집 이후부터 쌓이며, 반영까지 24–48시간 걸릴 수 있습니다.

**관리 → 데이터 스트림 → 해당 웹 스트림 → 향상된 측정**에서 파일 다운로드와 외부 링크 클릭이 켜져 있으면 CV PDF 클릭과 논문 링크 클릭도 확인할 수 있습니다. About·Publications·Background는 한 페이지 안의 구간이므로 각각 별도의 페이지 조회로 집계되는 구성은 아닙니다.

공식 도움말: [태그 설치](https://support.google.com/analytics/answer/9744165?hl=ko), [실시간 보고서](https://support.google.com/analytics/answer/9271392?hl=ko), [향상된 측정](https://support.google.com/analytics/answer/9216061?hl=ko)

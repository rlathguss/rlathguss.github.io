# 개인 홈페이지 사용 안내

CV를 바탕으로 만든 영문 연구자 홈페이지입니다. 별도 프로그램 설치 없이 열 수 있습니다.

**홈페이지 주소:** [https://rlathguss.github.io/](https://rlathguss.github.io/)  
**파일 보관함:** [rlathguss/rlathguss.github.io](https://github.com/rlathguss/rlathguss.github.io)

아래에는 내용 수정 방법과 최초 공개 설정을 정리했습니다. 실제 배포 상태는 저장소의 **Settings → Pages**에서 확인할 수 있습니다.

## 1. 내 컴퓨터에서 보기

이 폴더의 `index.html`을 두 번 클릭하면 브라우저에서 열립니다. 파일을 수정한 뒤 브라우저에서 새로고침하면 변경 내용을 볼 수 있습니다.

- `index.html`: 자기소개, 연구, 논문 등 화면에 표시되는 내용
- `styles.css`: 색상, 글꼴, 화면 배치
- `script.js`: 메뉴 등 화면 동작
- `assets/profile.png`: 프로필 사진
- `assets/cv.pdf`: 방문자가 내려받는 CV

## 2. 내용 수정하기

`index.html`을 메모장이나 코드 편집기로 열고, 수정하려는 문장을 검색해서 바꾸면 됩니다. `<...>`로 둘러싸인 부분은 화면 구조를 만드는 코드이므로 처음에는 문장만 수정하는 것이 쉽습니다. 저장 후 브라우저를 새로고침하세요.

CV를 갱신할 때는 새 PDF를 `assets` 폴더에 넣고 파일 이름을 **`cv.pdf`**로 맞춰 기존 파일을 교체하세요. 프로필 사진도 같은 방식으로 `profile.png`를 교체할 수 있습니다.

## 3. GitHub에 홈페이지 보관함 만들기 (최초 설정 참고)

GitHub 계정은 [rlathguss](https://github.com/rlathguss)입니다. 그 안에 홈페이지 파일을 담을 **저장소(repository)**를 하나 만들면 됩니다. 처음에는 터미널이나 Git 명령어를 몰라도 웹 화면에서 작업할 수 있습니다.

1. GitHub에 로그인하고 [새 저장소 만들기](https://github.com/new)를 여세요.
2. Owner가 `rlathguss`인지 확인하세요.
3. Repository name에 **`rlathguss.github.io`**를 정확히 입력하세요.
4. **Public**을 선택하고 **Add README**를 켠 뒤 **Create repository**를 누르세요.

이미 같은 이름의 저장소가 있다면 새로 만들지 말고 그 저장소를 여세요.

## 4. 홈페이지 파일 올리기

1. 저장소의 **Code** 화면에서 **Add file → Upload files**를 누르세요.
2. 이 폴더에서 `index.html`, `styles.css`, `script.js`와 **`assets` 폴더 자체**를 업로드 영역으로 끌어다 놓으세요. `README.md`도 함께 올려도 됩니다.
3. 아래의 **Commit changes**를 눌러 저장하세요. Commit은 변경 내용을 저장하고 기록한다는 뜻입니다.

업로드 후 다음 구조로 보여야 합니다. 바깥의 `개인 홈페이지` 폴더 전체를 올려서 한 단계 더 들어가지 않도록 확인하세요.

```text
rlathguss.github.io
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets
    ├── profile.png
    ├── cv.pdf
    └── favicon.svg
```

`assets` 안의 두 파일을 홈페이지 파일과 같은 위치로 꺼내 놓으면 사진과 CV 링크가 작동하지 않습니다. 원본 자료가 있는 `CV` 폴더는 업로드할 필요가 없습니다.

## 5. 인터넷에 공개하기

1. 저장소의 **Settings → Pages**로 들어가세요.
2. **Build and deployment**에서 Source를 **Deploy from a branch**로 선택하세요.
3. Branch는 **main**, 폴더는 **/(root)**로 선택하고 **Save**를 누르세요.
4. 배포가 끝나면 Pages 화면의 **Visit site**로 확인하세요.

공개 주소는 **[https://rlathguss.github.io/](https://rlathguss.github.io/)**입니다. 처음 공개하거나 내용을 바꾼 뒤 반영되기까지 최대 10분 정도 걸릴 수 있습니다. 설정을 마친 뒤에는 Pages 화면의 배포 상태를 확인하세요.

## 6. 나중에 업데이트하기

컴퓨터에서 파일을 수정하고 미리보기로 확인한 다음, GitHub의 같은 위치에 수정한 파일을 다시 업로드하고 **Commit changes**를 누르세요. Pages 설정은 처음 한 번이면 됩니다. GitHub에 올린 변경 내용이 홈페이지에 자동으로 반영됩니다.

GitHub 화면에서도 파일을 열고 연필 모양의 **Edit** 버튼으로 간단한 문구를 수정할 수 있습니다. 이때 컴퓨터의 파일도 같은 내용으로 맞춰 두면 다음 업로드 때 헷갈리지 않습니다.

공식 도움말: [사이트 만들기](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [Pages 공개 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

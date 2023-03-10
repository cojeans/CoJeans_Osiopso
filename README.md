

<br>
<br>

# 프로젝트 진행 기간 
2023.01.03(화) ~  2023.02.17(금) (45일간 진행) <br>
SSAFY 8기 2학기 공통 프로젝트 - `OSIOPSO`
> ## [팀노션](https://comet-sailfish-e6b.notion.site/S-076fbfa5a4bd4e27bae894063fc05392)
> ## [소개 영상 보기 : UCC 링크](https://youtu.be/hS9hGuiZsVM)

<br>
<br>

# `OSIOPSO` - 배경
  외출 준비를 하는 당신, 옷장을 열며 '입을 옷이 없네 ...'라는 생각 자주 하지 않으셨나요? 사실 옷장엔 입을 옷이 아주 많은데 말이죠 ... 특별한 날을 기다리는 당신, 무엇을 입을지 괴로운 고민을 하고 계시지는 않는지요? 또 새 옷을 사야하나 머리가 이프지는 않으신지요?

  Osiopso는 당신의 고민을 해결하기 위해 제작된 옷장 기반 코디 추천 SNS 입니다. Osiopso와 함께라면, 새 옷을 사지 않고도 새로운 스타일을 도전할 수 있습니다.
<br>
<br>

# `OSIOPSO` - 개요
  *- 내 옷장을 앱속으로 -*
  Osiopso는 앱 속에 '옷장'을 만들고 옷을 등록하여, 등록한 옷을 기반으로 다른 유저들로부터 코디 'Advice'를 받을 수 있는 웹서비스 입니다.

  뿐만아니라, 자신의 코디를 자랑할 수 있는 'OOTD' 기능 및 팔로우, 피드 등 SNS 주요 기능을 통해 유저들이 서로의 코디를 자유로이 열람하고 소통할 수 있도록 하였습니다. 

<br>
<br>

# 주요 기능
  - ### 회원 기능
    - 일반 로그인, 소셜 로그인(구글, 카카오, 깃허브)가 가능합니다.
    - 아이디(이메일)은 타 사용자의 아이디와 중복될 수 없습니다.
    - 이메일 인증을 완료해야 계정이 활성화됩니다.
    - 사용자 본인이 등록한 Advice, OOTD 게시물들을 확인할 수 있습니다.
    - 사용자 본인이 등록한 옷장들을 확인하고 관리할 수 있습니다.
    <br/>
  - ### 메인 화면
    - 현재 인기가 있는 태그들로 인기 태그가 변화합니다.
    - 인기 태그와 관련있는 OOTD를 최신순으로 보여줍니다.
    - 현재 논란이 되고있는 Advice를 댓글수가 많은 순으로 보여줍니다.
    - 하단은 OOTD와 연결됩니다.
    <br/>
  - ### 옷장 등록
    - 내가 원하는 카테고리별 옷장을 생성 가능합니다.
    - 옷장에는 내가 원하는 옷들을 등록할 수 있습니다.
    <br/>
  - ### 옷 등록
    - 내가 만든 옷장에 옷을 등록할 수 있습니다.
    - 옷 사진을 업로드하면 자동으로 배경을 제거한 이미지로 변경됩니다.
    - 선택한 이미지를 자르고 지워서 수정할 수 있습니다.
    - 옷을 등록할 때 색깔, 계절, 카테고리 등을 선택합니다.
    - 색깔과 카테고리는 AI를 활용하여 자동으로 태깅되고 수정할 수 있습니다.
      <br/>
  - ### Advice
    - 사진과 글을 기반으로한 게시물을 업로드합니다.
    - 게시글을 올린 유저의 옷장에 등록된 옷을 드래그&드롭 하여 이미지 형태의 코디 조합을 생성할 수 있습니다. 
    - 코디 조합 이미지를 기반으로 Adivce를 작성할 수 있습니다.
    - 유저들은 게시물에 좋아요를 누르거나 댓글 및 대댓글 을 작성할 수 있습니다.
    <br/>
  - ### Ootd
    - 사진과 글을 기반으로한 게시물을 업로드합니다.
    - style 태그(ex: 캐주얼, 비즈니스), tpo 태그(ex: 데일리, 운동) 등을 설정할 수 있습니다. 
    - 유저들은 게시물에 좋아요를 누르거나 덧글을 작성할 수 있습니다.
    - 대표사진(첫 번째 사진)과 댓글수, 좋아요수, 등록경과 시간을 보여줍니다.
    - 무한 스크롤이 적용됩니다.
    <br/>
  - ### 팔로우
    - OOTD가 맘에 드는 유저를 팔로우 해서 게시물을 확인할 수 있습니다.
<br>
<br>

# 주요 기술
  **백엔드**
  - SpringBoot: 2.5
  - SpringSecurity
  - SpringDataJPA
  - Oauth2-client
  - JWT 

  **프론트엔드**
  - React : 18.2
  - Redux tool kit
  - Axios

  **AI**
  - tensorflow
  - tensorflow.js : 4.2 
  - google collab

  **인프라**
  - AWS EC2
  - Docker
  - Nginx

  **기획**
  - Figma
  - Notion
  - JIRA
  - GitLab
<br>
<br>

# 프로젝트 파일 구조
 ### Back
```
Osiopso
├── config
├── controller
├── dto
│   ├── request
│   │   ├── closet
│   │   ├── comment
│   │   ├── feed
│   │   └── filter
│   ├── response
│   │   ├── closet
│   │   ├── comment
│   │   ├── feed
│   │   └── tag
│   ├── tag
│   └── user
├── entity
│   ├── closet
│   ├── comment
│   ├── feed
│   ├── tag
│   └── user
├── exception
├── repository
│   ├── article
│   ├── closet
│   ├── comment
│   └── user
├── security
│   └── oauth2
│       └── user
├── service
│   ├── article
│   ├── closet
│   └── user
└── util
```
<br>

 ### Front
 ```
 osiopso-front
├── model
├── public
│   └── model
└── src
    ├── assets
    │   ├── fashion_dataset
    │   ├── fonts
    │   └── components
    ├── constants
    ├── model
    ├── routes
    ├── store
    └── utils
 ```


 # 형상관리 및 협업 툴
 - 1
 - 2
 - 3
 - 4


 # 협업 환경
 - 1 
 - 2
 - 3


 # 팀원 역할 분배
 ![members](https://user-images.githubusercontent.com/39759666/221364459-55ecc390-14bc-4c3d-a67d-bcd4cb7100f9.png)


<br>
<br>

# 프로젝트 산출물
<details>
<summary>기능명세서</summary>
<div markdown="1">       
</div>
</details>

<details>
<summary>시퀀스다이어그램</summary>
<div markdown="1">       
</div>
</details>

<details>
<summary>와이어프레임</summary>
<div markdown="1">       
</div>
</details>
<details>

<summary>컨벤션</summary>
<div markdown="1">       
</div>
</details>

<details>
<summary>스토리보드 : 더 보기(링크)</summary>
<div markdown="1">       
<br><img width="1440" alt="" src="https://user-images.githubusercontent.com/67217686/221364797-7a270d5b-e77c-41a7-a80c-b20fd6234619.PNG"><br>
</div>
</details>

<details>
<summary>아키텍처</summary>
<div markdown="1">  
<br><img width="1440" alt="" src="https://user-images.githubusercontent.com/67217686/221364506-ea80eb64-2ffd-49cb-b386-9c6f53a31cd2.png"><br>
</div>
</details>

<details>
<summary>API</summary>
<div markdown="1">       
<br><img width="1440" alt="api" src="https://user-images.githubusercontent.com/67217686/221365631-40a505b4-7730-448a-9e01-dec8bce3d73a.png"><br>
</div>
</details>

<details>
<summary>ERD</summary>
<div markdown="1">       
<br><img width="1440" alt="api" src="https://user-images.githubusercontent.com/67217686/221365631-40a505b4-7730-448a-9e01-dec8bce3d73a.png"><br>
</div>
</details>

<details>
<summary>회의록</summary>
<div markdown="1">       
<br><img width="1440" alt="api" src="https://user-images.githubusercontent.com/67217686/221365631-40a505b4-7730-448a-9e01-dec8bce3d73a.png"><br>
</div>
</details>

<details>
<summary>시스템기술서</summary>
<div markdown="1">       
<br><img width="1440" alt="api" src="https://user-images.githubusercontent.com/67217686/221365631-40a505b4-7730-448a-9e01-dec8bce3d73a.png"><br>
</div>
</details>

<details>
<summary>명세기술서</summary>
<div markdown="1">       
<br><img width="1440" alt="api" src="https://user-images.githubusercontent.com/67217686/221365631-40a505b4-7730-448a-9e01-dec8bce3d73a.png"><br>
</div>
</details>

<br>
<br>

# 프로젝트 결과물
- 포팅메뉴얼
- 중간발표자료
- 최종발표자료

<br>
<br>

# `Osiopso` 서비스 (구동화면)
- 1
- 2
- 3

<br>
<br>

---
---
---


# BTS 봉준호 제이팍 코진스 Let's go

## 🖤 브랜치 생성 컨벤션

1. 최대한 Git Flow를 따라주세요.
2. 상세 기능은 소제목 형식으로 하겠습니다.
- GitFlow브랜치명/지라이슈넘버-지라이슈이름
- 공백에는 하이픈(-)을 넣어주시면 됩니다.
- ex) Feature/S08P12C106-91-BE-옷장-등록

## 🖤 커밋 메시지 컨벤션

- 접두사와 콜론은 붙이고, 콜론 후 한 칸은 띄어쓰기
- git commit -m "접두사: 메시지"

## 🖤 Daily Docs 컨벤션

- git commit -m "Docs: 월-일 이름 Daily"
- ex) git commit -m "Docs: 01-30 희주 Daily"

### 1. 커밋 유형 지정

- 커밋 유형은 영어 대문자로 작성하기
  
  | 커밋 유형            | 의미                                       |
  | ---------------- | ---------------------------------------- |
  | Feat             | 새로운 기능 추가                                |
  | Fix              | 버그 수정                                    |
  | Docs             | 문서 수정                                    |
  | Style            | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
  | Refactor         | 코드 리팩토링                                  |
  | Test             | 테스트 코드, 리팩토링 테스트 코드 추가                   |
  | Chore            | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore     |
  | Design           | CSS 등 사용자 UI 디자인 변경                      |
  | Comment          | 필요한 주석 추가 및 변경                           |
  | Rename           | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우            |
  | Remove           | 파일을 삭제하는 작업만 수행한 경우                      |
  | !BREAKING CHANGE | 커다란 API 변경의 경우                           |
  | !HOTFIX          | 급하게 치명적인 버그를 고쳐야 하는 경우                   |

### 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)

### 3. 제목 첫 글자는 대문자로, 끝에는 `.` 금지

### 4. 제목은 영문 기준 50자 이내로 할 것

### 5. 자신의 코드가 직관적으로 바로 파악할 수 있다고 생각하지 말자

### 6. 여러가지 항목이 있다면 글머리 기호를 통해 가독성 높이기

### 7. 🖤 한 커밋에는 한 가지 문제만!

- 추적 가능하게 유지해주기
- 너무 많은 문제를 한 커밋에 담으면 추적하기 어렵다.

```
- 변경 내용 1
- 변경 내용 2
- 변경 내용 3
```

### 🖤 규칙에 맞는 좋은 커밋메시지를 작성해야 하는 이유

- 팀원과의 소통
- 편리하게 과거 추적 가능
- 나중에 실무에서 익숙해지기 위해


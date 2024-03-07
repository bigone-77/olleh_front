# 올래 리드미 파일 작성

# 시니어를 위한 교육 매칭 웹 서비스 올래

## 프로젝트 소개

---

- 올래는 50-60대 [액티브 시니어](https://50plus.or.kr/detail.do?id=155038) 분들을 위한 교육 매칭 시스템입니다.
- 유저는 원하는 공고를 선택하고 신청할 수 있습니다.
    - 비회원 또한 교육 선택이 가능합니다.
- 설문조사를 통해 유저에게 해당 교육을 추천합니다.
- 소통하러 올래를 통해 다른 유저들과 댓글 달기 등등 소통할 수 있습니다.
- 올래 생활 뉴스를 통해 유저들에게 다양한 소식을 전해드립니다.

## 팀원 구성

---

**FE**

| 신태일 | 윤해민 | 천윤서 | 최현민 |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

**BE**

| 신희민 | 임효진 | 최현목 | 한진경 |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |

## 1. 개발 환경

---

- Front: React, Typescript, TailwindCSS, Redux toolkit, Redux Persist, RTK Query
- Back:
- 협업 툴: Github, Notion, Discord
- 서비스 배포 환경:
- 디자인: [Figma](https://www.figma.com/file/ovIHreydwbFYyZ3iu5QEKx/%EC%98%AC%EB%9E%98?type=design&node-id=0-1&mode=design&t=D45MSxjxIXKJewuw-0)

## 2. 개발 기술 및 협업 전략

---

### FE

**React, TypeScript, TailwindCSS**

- React
    - 리액트를 채택한 가장 큰 이유는 **Single Page Application**을 구현하는데 있어서 가장 대표적인 프레임워크이기 때문입니다. 기존 페이지별로 html을 관리하는것에서 하나의 index.html 을 통해 변경된 부분만 재렌더링하여 보여주는 형식으로 더욱 자연스러운 UI를 보여줄 수 있었습니다.
    - 함수형 선언을 통해 불필요한 코드를 배제하고 비즈니스 로직과 UI 를 분리시킬 수 있어 리소스 절약이 가능했습니다.
- TypeScript
    - 개발 중 추가 요구사항에 쉽게 변환이 가능해야 좋은 아키텍쳐라고 생각합니다. 특히 유저의 intent가 포함된 비즈니스 로직 같은 경우 기존에 만들었던 구조들과 상응하기 힘든 부분에 있어서 타입스크립트는 상태를 제어하는 메서드들, 서버로부터 받아온 데이터들의 타입을 명시를 함으로써 플로우를 유연하게 가져갈 수 있는 장점이 있습니다.
- TailwindCSS
    - 커스터마이징, 반응형 구현 그리고 props를 통한 조건부 스타일링 활용으로 한정된 개발 기간 동안 비즈니스 로직에 시간투자를 더 가져갈 수 있었습니다.
    - 가독성이 낮은게 흠이지만 컴포넌트 분할을 통해 이 부분을 최소화시켰습니다.

**Redux Toolkit, Redux Persist, RTK Query**

- Redux Toolkit
    - 기존 boilerplate가 많았던 Redux중에서 저희는 Redux Toolkit을 선택했습니다. `createSlice` 을 통해 해당 슬라이스 이름에 액션, 리듀서, 상태를 한 번에 저장하고 관리할 수 있고 가장 장점이라고 생각하는 부분은 Chrome에서 제공하는 Redux devTool을 통해 상태와 액션을 가시적으로 확인을 할 수 있었습니다.
- Redux Persist
    - `Redux Persist`를 통해 회원들의 로그인 유무, 비회원의 전화번호를 세션에 저장하여 다른 리듀서들과 선택적으로 저장할 수 있습니다.
        
        ```tsx
        const rootReducer = combineReducers({
          step: stepReducer,
          currentUser: currentUserReducer,
          joinPhone: joinPhoneReducer,
          nonUser: nonUserReducer,
          survey: surveyReducer,
          [apiSlice.reducerPath]: apiSlice.reducer,
        });
        
        const persistConfig = {
          key: 'root',
          storage,
          whitelist: ['currentUser', 'nonUser'],
        };
        ```
        
- RTK Query
    - apiSlice를 하나의 api 저장 매개체로 삼아 `injectEndPoints` 로 도메인 네임 앞단어를 따서 유연하게 대응할 수 있었습니다. 이때 폴더관리 및 파일관리가 용이하고 응답객체에 **tag**를 적용함으로써 캐시된 데이터에 접근 및 조작이 가능했었습니다. 아래 코드는 단적인 예시입니다.
        
        ```tsx
        export const guestApi = apiSlice.injectEndpoints({
          endpoints: (builder) => ({
            // 비회원 신청 내역 조회
            getLessons: builder.query<MyPageLessonResponse, string>({
              invalidatesTags: ['Guest'],
              query: (phoneNum) => {
                return {
                  url: `/guest/lessons/${phoneNum}`,
                  method: 'GET',
                };
              },
            }),
          });
        ```
        

## 3. 프로젝트 구조

---

```tsx
```
📦 olleh_front
.gitignore
.prettierrc
README.md
package-lock.json
package.json
postcss.config.js
public
│  ├─ assets 
│  │  ├─ logo.svg
│  │  ├─ .
│  │  ├─ .
│  │  └─ .
│  └─ index.html
├─ s
│  ├─ App.tsx
│  ├─ Components
│  │  ├─ AlertModal
│  │  │  ├─ CancelModal.tsx
│  │  │  ├─ ConfirmModal.tsx
│  │  │  ├─ FormModal.tsx
│  │  │  ├─ FormModal
│  │  │  │  ├─ FormModal.tsx
│  │  │  │  └─ FormModalDone.tsx
│  │  │  ├─ LoginModal.tsx
│  │  │  └─ SignupModal
│  │  │     ├─ RequiredFieldsModal.tsx
│  │  │     ├─ TermsOfServiceModal.tsx
│  │  │     └─ WelcomeModal.tsx
│  │  ├─ Announcement
│  │  │  ├─ FilterBox.tsx
│  │  │  └─ LessonCard.tsx
│  │  ├─ Auth
│  │  │  └─ Join
│  │  │     ├─ AuthModal.tsx
│  │  │     ├─ FirstArea
│  │  │     │  ├─ Timer.tsx
│  │  │     │  └─ index.tsx
│  │  │     ├─ JoinHeader.tsx
│  │  │     ├─ SecondArea
│  │  │     │  ├─ TermsOfUse.tsx
│  │  │     │  └─ index.tsx
│  │  │     └─ ThirdArea
│  │  │        ├─ Toggle.tsx
│  │  │        ├─ citySelector.tsx
│  │  │        └─ index.tsx
│  │  ├─ Communication
│  │  │  ├─ CommunityCard.tsx
│  │  │  ├─ DetailPage
│  │  │  │  ├─ Contents.tsx
│  │  │  │  ├─ EnteredComment.tsx
│  │  │  │  └─ Profile.tsx
│  │  │  └─ FilterBox.tsx
│  │  ├─ Home
│  │  │  ├─ Banner
│  │  │  │  └─ index.tsx
│  │  │  ├─ Category
│  │  │  │  └─ index.tsx
│  │  │  ├─ Community
│  │  │  │  └─ index.tsx
│  │  │  ├─ FloatingButton.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ News
│  │  │  │  └─ index.tsx
│  │  │  ├─ Row
│  │  │  │  └─ index.tsx
│  │  │  ├─ SearchInput
│  │  │  │  └─ index.tsx
│  │  │  └─ Teacher
│  │  │     └─ index.tsx
│  │  ├─ LessonComponent
│  │  │  ├─ Apply.tsx
│  │  │  ├─ Input.tsx
│  │  │  ├─ Input2.tsx
│  │  │  └─ LeassonDetail.tsx
│  │  ├─ MyPage
│  │  │  ├─ Lesson.tsx
│  │  │  ├─ Member
│  │  │  │  ├─ Header.tsx
│  │  │  │  ├─ HeartLesson
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ HeartLessonCard.tsx
│  │  │  │  ├─ Lesson.tsx
│  │  │  │  ├─ LessonApply
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ LessonTake
│  │  │  │  │  └─ index.tsx
│  │  │  │  ├─ MyInfo
│  │  │  │  │  ├─ Modify
│  │  │  │  │  │  ├─ ModifyUser.tsx
│  │  │  │  │  │  ├─ PasswordCheck.tsx
│  │  │  │  │  │  ├─ PasswordUpdate.tsx
│  │  │  │  │  │  └─ index.tsx
│  │  │  │  │  ├─ ShowUser.tsx
│  │  │  │  │  ├─ Toggle.tsx
│  │  │  │  │  └─ index.tsx
│  │  │  │  └─ index.tsx
│  │  │  └─ NonMember
│  │  │     ├─ CheckPhone.tsx
│  │  │     ├─ HasNumber
│  │  │     │  ├─ LessonApply
│  │  │     │  │  └─ index.tsx
│  │  │     │  └─ LessonComplete
│  │  │     │     └─ index.tsx
│  │  │     ├─ Header.tsx
│  │  │     └─ index.tsx
│  │  ├─ Navbar
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ Menu
│  │  │  │  ├─ ShortMenu.tsx
│  │  │  │  ├─ WideMenu.tsx
│  │  │  │  └─ index.tsx
│  │  │  └─ index.tsx
│  │  ├─ News
│  │  │  ├─ DetailPage
│  │  │  │  ├─ Contents.tsx
│  │  │  │  └─ Profile.tsx
│  │  │  ├─ FilterBox.tsx
│  │  │  └─ NewsCard.tsx
│  │  ├─ Pagination
│  │  │  ├─ PaginationLink.tsx
│  │  │  └─ index.tsx
│  │  ├─ Survey
│  │  │  ├─ Input
│  │  │  │  ├─ Input1.tsx
│  │  │  │  └─ Input2.tsx
│  │  │  ├─ Label
│  │  │  │  ├─ Label1.tsx
│  │  │  │  ├─ Label2.tsx
│  │  │  │  └─ Label3.tsx
│  │  │  └─ SurveyComponent
│  │  │     ├─ ProgressBar.tsx
│  │  │     ├─ Result.tsx
│  │  │     ├─ Survey1.tsx
│  │  │     ├─ Survey2.tsx
│  │  │     ├─ Survey3.tsx
│  │  │     ├─ Survey4.tsx
│  │  │     ├─ Survey5.tsx
│  │  │     └─ Survey6.tsx
│  │  ├─ SurveyFloating
│  │  │  ├─ FloatingBanner.tsx
│  │  │  ├─ Input
│  │  │  │  └─ FlotingLabel.tsx
│  │  │  ├─ ProgressBar.tsx
│  │  │  └─ SurveyComponents
│  │  │     ├─ Floating1.tsx
│  │  │     ├─ Floating2.tsx
│  │  │     ├─ Floating4.tsx
│  │  │     ├─ Floating5.tsx
│  │  │     ├─ Floating6.tsx
│  │  │     ├─ Floating7.tsx
│  │  │     ├─ Floating8.tsx
│  │  │     └─ Result.tsx
│  │  ├─ TimeLine
│  │  │  └─ index.tsx
│  │  └─ ToolTip.tsx
│  ├─ Fonts
│  │  └─ Roboto-Bold.ttf
│  ├─ hooks
│  │  └─ Auth
│  │     ├─ useJoin.ts
│  │     ├─ useLogin.ts
│  │     └─ useLogout.ts
│  ├─ index.css
│  ├─ index.tsx
│  ├─ pages
│  │  ├─ Auth
│  │  │  ├─ JoinPage
│  │  │  │  └─ page.tsx
│  │  │  └─ LoginPage
│  │  │     └─ page.tsx
│  │  ├─ CategoryPage
│  │  │  ├─ LessonResult.tsx
│  │  │  └─ page.tsx
│  │  ├─ CommunicationPage
│  │  │  ├─ DetailPage.tsx
│  │  │  └─ page.tsx
│  │  ├─ Homepage
│  │  │  └─ page.tsx
│  │  ├─ LessonPage
│  │  │  └─ page.tsx
│  │  ├─ MyPage
│  │  │  └─ page.tsx
│  │  ├─ NewsPage
│  │  │  ├─ DetailPage.tsx
│  │  │  ├─ page.tsx
│  │  │  └─ style.css
│  │  ├─ NotFound
│  │  │  └─ page.tsx
│  │  └─ Survey
│  │     ├─ SurveyFloating
│  │     │  └─ page.tsx
│  │     └─ page.tsx
│  ├─ redux
│  │  ├─ apis
│  │  │  ├─ communityApi.ts
│  │  │  ├─ guestApi.ts
│  │  │  ├─ index.ts
│  │  │  ├─ lessonApi.ts
│  │  │  ├─ myPageApi.ts
│  │  │  ├─ newsApi.ts
│  │  │  └─ surveyApi.ts
│  │  ├─ slices
│  │  │  ├─ currentUserSlice.ts
│  │  │  ├─ joinPhoneSlice.ts
│  │  │  ├─ nonUserSlice.ts
│  │  │  ├─ stepSlice.ts
│  │  │  └─ surveySlice.ts
│  │  └─ store.ts
│  ├─ router
│  │  └─ Routes.tsx
│  ├─ types
│  │  ├─ NewsDataProps.ts
│  │  ├─ Response
│  │  │  ├─ Category
│  │  │  │  ├─ CategoryLessonsType.ts
│  │  │  │  ├─ DetailLessonType.ts
│  │  │  │  ├─ HeaderSearchType.ts
│  │  │  │  └─ RowType.ts
│  │  │  ├─ Community
│  │  │  │  ├─ CommunityType.ts
│  │  │  │  └─ DetailCommunityType.ts
│  │  │  ├─ MyPage
│  │  │  │  ├─ currentUserType.ts
│  │  │  │  ├─ getLessonsType.ts
│  │  │  │  └─ likeLessonType.ts
│  │  │  ├─ News
│  │  │  │  ├─ DetailNewsType.ts
│  │  │  │  └─ NewsType.ts
│  │  │  └─ Survey
│  │  │     ├─ SubCategoryType.ts
│  │  │     └─ SurveyLessonType.ts
│  │  └─ TeacherDataProps.ts
│  └─ utils
│     ├─ cookies.ts
│     ├─ dayjs.ts
│     ├─ formatPhone.ts
│     ├─ generateRandomNumber.ts
│     ├─ getHour.ts
│     ├─ transKrCategoryId.ts
│     ├─ transValue.ts
│     ├─ truncate.ts
│     ├─ useDebounce.ts
│     ├─ useScroll.ts
│     ├─ validation.ts
│     └─ viewFormat.ts
├─ tailwind.config.js
└─ tsconfig.json
```
```

## 4. 역할 분담

---

## 5. 개발 기간 및 작업 관리

---

### 개발 기간

- 전체 개발 기간: 2023-12-22 ~ 2024.02-20
- UI 구현: 2024-02-01 ~ 2024-02-20
- 기능 구현: 2024-02-04~ 2024-02-20

### 작업 관리

- Github commit message로 추가된 부분 코멘트 및 notion에 담당 부분 시연을 통해 진행 상황 공유했습니다.
- 팀 전체 회의 및 파트별 팀 주간회의를 진행하며 일주일동안 해야할 작업, 완성한 작업에 대해서 의사소통 및 논의를 거쳤습니다.

## 6. Trouble Issue

---

- [UI 전면 변경](https://github.com/bigone-77/olleh_front/issues/1#issue-2152759207)
- [역할 분담의 어려움](https://github.com/bigone-77/olleh_front/issues/2#issue-2152761917)

## 7. 페이지 별 기능

---

<aside>
💡 아래는 공통 부분입니다.

1. 홈페이지, 공고리스트에는 플로팅 버튼을 통해서 랜덤 설문조사가 가능합니다.
2. 회원가입한 회원, 비회원 모두 마이페이지 / 교육 수강 신청 / 설문 조사 기능 가능합니다.
3. (2에 대한 추가설명) 회원은 찜하기를 통해 마이페이지에서 해당 항목들을 확인 가능합니다. 회원은 설문조사 하기를 눌렀을때 이전 설문조사 내역이 있다면 우선적으로 내역 먼저 도출합니다.
4. mvp에 해당하지 않는 ‘우리 동네 인기 선생님’은 구현되어 있지 않습니다.

</aside>

### [홈]

- 최초 페이지 접근 시 구역별 온보딩 발현
    - 해당 온보딩 메시지를 모두 읽은 경우 쿠키에 유효기간 14일을 적용하여 14일 후 재접근 시 온보딩 메시지 다시 발현하게 했습니다.
    - 모든 카테고리에 해당하는 프리뷰 목록을 확인할 수 있습니다.

### [공고리스트]

- 각 카테고리에 해당하는 항목을 클릭 시 라우팅
- (최신순, 마감순, 신청자순) **필터 기능**이 있고 **무료 교육만 보기 버튼**을 클릭하여 수강료가 무료인 교육들만 볼 수 있습니다.
- **검색 기능**을 통해 배우고자 하는 교육의 제목, 강사이름, 장소를 입력하여 원하는 교육을 찾을 수 있습니다.
- **딱 맞는 교육 찾기**를 통해 설문조사 페이지로 이동합니다.

### [교육 상세 페이지]

- 회원은 교육 신청 및 찜하기가 가능합니다.
- 비회원은 교육 신청 폼 내용을 기재함으로써 교육 신청이 가능합니다.
- 상황에 맞는 알림모달창으로 유저로 하여금 intent를 상기시킵니다.

### [설문조사 페이지]

- 해당 페이지의 경로는 두가지가 있습니다.
    - 공고리스트 → 설문조사
        - 각 공고 카테고리에 맞는 질문이 첫번째 질문으로 나옵니다.
    - 플로팅 버튼 → 설문조사
        - 원하는 카테고리를 선택하면 해당 카테고리에 해당하는 질문이 첫번째 질문으로 나옵니다.
        - 이후 질문들은 “공고리스트 → 설문조사” 질문과 동일합니다.
- 질문에 대한 선택이 끝나고 나면 해당 선택에 해당하는 교육들이 결과로 나타나고 이후 설문조사 다시하기 및 해당 교육 리스트로 돌아가기 를 선택할 수 있습니다.

### [마이페이지]

- 마이페이지는 회원용으로 수강한 교육, 신청한 교육, 찜한 교육 리스트를 확인 가능하고 본인 계정 정보를 수정할 수 있습니다.
- 비회원용으로 비회원 신청내역을 통해 수강한 교육, 신청한 교육 내역을 확인 가능합니다. 이때 비회원은 자신이 신청했을때 기재한 전화번호를 초기에 입력해야 합니다.
    - 이때의 전화번호는 해당 유저의 세션에 저장되고 유저가 창을 닫을 때, 로그인을 할 때에 입력했던 전화번호는 초기화됩니다.

### [소통하러 올래]

- 일종의 sns 게시글로 파트는 “궁금해요”, “같이해요” 두 가지로 나뉘어집니다.
- 각 게시글에 조회수 확인, 댓글 달기를 할 수 있습니다. (대댓글, 댓글 좋아요 기능은 구현되어 있지 않습니다.)

### [올래 생활 뉴스]

- 시니어들을 위한 소식들을 확인 가능합니다.
- “공지사항”, “건강정보”, “생활정보”, “취업정보” 로 총 4가지로 나뉘어집니다.
- 각 뉴스는 조회수 기능이 있습니다.

### [로그인 / 회원가입]

- 로그인
    - 기본적으로 이메일, 비밀번호를 입력하여 로그인 합니다. (소셜로그인 및 아이디, 비밀번호 찾기 기능은 구현되어 있지 않습니다.)
- 회원가입(총 3가지로 나뉩니다)
    - 휴대폰 인증기능은 유료 api인 관계로 넘어가게 됩니다.
    - 3가지 이용약관을 확인합니다. 이때 동의하지않은 항목이 있다면 알림창이 뜸과 동시에 해당 항목에 빨간 테두리가 그어집니다.
    - 모든 항목에 필요한 값들을 입력합니다. 이때 이메일 및 문자 프로모션 정보 수신 내역은 필수 기재 항목은 아닙니다.

## 8. 프로젝트 후기

---

**🧑‍💻 신태일**

프론트끼리 하는 협업은 처음이라 어떻게 잘 협업해야 하는지에 대해서 끊임없이 고민하고 또 고민하다가 결국 고민만(?) 하게 된 것만 같아 아쉬운 부분이 컷습니다. 깃 활용에 대해서도 이슈란, 깃 프로젝트 활용, 커밋 메시지 통일, pr 템플릿 통일 등등 활용한다면 더욱 나은 효과를 누릴수 있었을것 같은데 개발에 쫓겨 이런 부분들을 등한시한것만 같아서 아쉽습니다. 리드미 작성을 하면서도 느끼는 부분이 부분 개발할 때에 있어서의 기록을 미처 생각치 않은것 같아 또 아쉽습니다. 결국 아쉬운 부분이 많지만 이로 인해 성장한 부분 또한 무시할 수 없는것 같습니다. 지금까지의 개발 경험에 있어서 가장 치열하게 또 만드는 서비스 부분에 있어서 유저 입장을 심히 고려해본 점은 앞으로의 저의 개발 경험에 있어서 너무나도 값진 경험이 된 것 같습니다! 한 해의 마지막, 또 새로운 해의 처음을 올래와 함께 하게 되어서 영광입니다. 추후에 더 나은 리팩토링을 통해 미처 구현하지 못한 부분들을 구현하고 더 나아가 이 서비스가 실용화 되길 기대합니다😽
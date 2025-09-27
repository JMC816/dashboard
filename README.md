# [ Dashboard ]

로컬 환경 실행: npm run dev

### Dashboard

- 7시간(9월 26일)

### Company + Post

- 5시간(9월 27일)

## 📝 질문 및 가정

- 배출량 데이터(emissions)는 단위가 톤 CO₂eq라고 가정했습니다.
- yearMonth는 "YYYY-MM" 형식으로만 제공된다고 가정했습니다.
- 포스트(Post)는 특정 회사의 id와 연결된다고 가정했습니다.

## 🏗️ 아키텍처 개요

- Dashboard / Company / Post → Zustand에서 상태 구독 → API 호출 → 데이터 표시
- UI 상태: 로딩 상태를 각 컴포넌트에서 관리
- 필터 상태: 선택한 회사, 국가 → Zustand로 공유
- Navigation Drawer: 페이지 이동(Dashboard / Company / Post)

## ⚡ 렌더링 효율성

- 로딩 스피너는 데이터 fetch 시에만 리렌더링이 발생합니다.

## 🎨 디자인

- 사용자 경험을 높이기 위해 비슷한 계열의 색상끼리 통일
- 데이터를 효과적으로 전달하기 위해 막대 그래프, Area 그래프, 지도 시각화 사용

<br>

## 기능 구현

- Navigation Drawer
- Dashboard / Company / Post 페이지 이동 가능

### Dashboard

- 각 나라 월별 배출량 합계 표시
- 현재 달 vs 이전 달 비교 → 증가/감소율(%) 표시
- 월별 배출량 막대 그래프 & Area 그래프
- 지도 기반 국가별 배출량 표시
- 로딩 애니메이션 표시

### Company
- 드롭다운으로 회사 선택
- 월별 배출량 막대 그래프 & Area 그래프
- Post 입력(제목, 시간, 내용 → 등록 가능)
- 로딩 애니메이션 표시

### Post

- 드롭다운으로 회사 선택
- Post 목록 및 신규 등록
- 로딩 애니메이션 표시

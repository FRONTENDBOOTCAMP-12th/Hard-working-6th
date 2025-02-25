# 과제 (검색 리스트)

## 검색 리스트를 구현하라.

### 📁 파일 구조

```bash
├── src
│   ├── app.tsx
│   ├── components
│   │   ├── Atom
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   └── SearchInput.tsx
│   │   ├── Molecule
│   │   │   └── CardList.tsx
│   │   └── Organism
│   │       └── SearchPage.tsx
│   ├── data
│   │   └── data.json

```

### 💯 성능

- input에 change이벤트가 발생했을 때 `throttle`을 이용해 과도한 이벤트 발생 방지

### 🚨 접근성

- 검색 버튼에 `aria-label`을 달아 접근 가능하도록 구현
- 초기 상태에 검색창에 `focus`가 가도록 구현

### 💻 최종 결과

**결과화면**

![Image](https://github.com/user-attachments/assets/35e2bb2e-36d0-4d19-8dd1-ce2e9d67c8a9)

gif 압축을 했더니 조금 깨집니다 ㅠㅠ

**Lighthouse 지표**

<img width="456" alt="Image" src="https://github.com/user-attachments/assets/1e1a81c6-d196-4dc0-a3dd-76a256fe7e3c" />

### 컴포넌트

**Atom**

- `Badge`

  - 포켓몬의 타입을 받는 컴포넌트. 지정한 타입이 아닐 경우에 에러가 발생하도록 구현

- `Card`

  - 포켓몬의 정보를 볼 수 있도록 구현한 카드뷰. api와 직접적인 통신을 하는 컴포넌트

- `SearchInput`

  - 검색 컴포넌트. SearchPage에서 받은 상태를 변경하는 역학을 함

**Molecule**

- `CardList`

  - 카드 리스트 컴포넌트. SearchPage에서 쿼리를 받으며 해당 쿼리를 이용해 리스트를 렌더링함

**Organism**

- `SearchPage`

  - SearchInput 와 CardList 의 부모 컴포넌트. 두 컴포넌트의 상태를 공유하는 역할을 함

### 💬 회고

> 이전에 포켓몬 api를 이용해 js 과제를 했던 기억이 있어 이번에도 포켓몬을 이용해 `검색 리스트`를 구현했다. 먼저 외부에서 데이터를 받아오는 과정은 `side effect`이기 때문에 `useEffect` 내부에 코드를 작성했다.
>
> 기능 관련해서는 검색을 위해 `CardList`와 `SearchInput`의 공통 상위요소인 `SearchPage`의 상태를 `SearchInput`에 전달하고, `change` 이벤트가 발생했을 때 `CardList`가 리렌더링 될 수 있도록 구현했다.
>
> 처음에는 api에서 가져온 데이터만으로 구현하려고 했지만 영어로 된 부분이 많아 한국어 data 파일을 추가했고 정작 api에서는 이미지만 가져왔다.
>
> 성능을 위해 `throttle` 유틸 함수를 가져와 사용했다.
>
> 아쉬웠던 점은 API 데이터를 불러올 때 `성능 최적화`를 적용하지 못한 점이 아쉬웠다. 예전에 배운 내용이 있었던 것 같은데 막상 사용하려니 기억이 나지 않아 적용하지 못했다. 이 부분에 대해서는 기록을 다시 찾아보면서 개선해 나갈 생각이다.
>
> 추가) 내일 배울 내용을 잠깐 훑어봤는데 use 훅을 알게 되었다. 해당 훅은 비동기 데이터를 useEffect 에서 사용하지 않고도 가져올 수 있는 훅이라는데 이러면 내 카드 컴포넌트를 `use`로 바꿀 수 있겠잖아?!?!?!?

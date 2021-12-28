# 🍱 Hansup Food

## 🎈 프로젝트 소개

한숲푸드는 경북 포항시에서 케이터링 및 도시락, 반찬 사업을 운영하고 있는 장애친화적 예비 사회적기업입니다.
<br>
<br>
이번 프로젝트에서는 한숲푸드에 대한 소개 및 각종 설명, 공지사항과 리뷰, 고객의 소리와 같은 유저들의 이야기를 적을 수 있는 CRUD 기능들과 더불어 인터넷으로 특정 날짜를 예약할 수 있는 시스템과 관리자가 예약란을 빠르게 확인할 수 있는 기능을 포함하여 개발하였습니다.

<div style="width:100%; display:flex; justify-content:center;">
   <b>👉 <a href="http://hansupfood.com">hansupfood</a> 👈</b>
</div>

## 🧱 기술 스택

### Client

- React
- Redux
- tailwind css

### Server

- Node.js
- Express
- mongo DB
- cafe24 hosting

## 📰 Data Schema

### Mongo DB

```
User {
  id : string,
  email : string,
  password : string
}
Review {
	content : (string),
	email : (string),
	response : (string),
	password : (string),
	imgList : [object],
}
Notice {
	title : (string),
	content : (string),
	fileList: [object],
	read : (Number)
}
Voice {
	status : (String : unread, read),
	title : (string),
	content : (string),
	name : (string),
	phone : (string),
	email : (string),
	isDeleted : (Boolean)
}
Order : {
	name : (string),
	phone : (string),
	count: (string),
	request : (string),
	date : (Date),
	delivery : (String : delivery, self),
	address : (string)
	mainMenu: (array),
	subMenu : (array),
	soup : (array),
	dessert : (array),
	payment : (string),
	cashReceipt : (Object) - {
		method : (type- personal, business, none)
		number : (string - phoneNumber or businessNumber),
	},
	payed : (Boolean),
	isDeleted : (Boolean)
}
Menu : {
	category: (String : restaurant, catering),
	type : (String : mainMenu, subMenu, soup, dessert),
	name : (string),
	price : (string),
	imgList : [object)]
	isDeleted : (Boolean)
}

```

## ⚒ 프로젝트 기능 요약

### 사용자

- [리뷰] 페이지에서 음식에 대한 사진과 함께 리뷰를 작성할 수 있습니다.
- [마음의 소리] 페이지에서

### 관리자

1. CRUD

- 공지사항
- 리뷰
- 고객의 소리
- 예약하기

2. 이미지 업로드

-

## User

- Everybody can read all posts.
- Anyone write posts about counseling, support document, volunteer in participation page.

## part to be supplemented

- UI/UX
- paging Check

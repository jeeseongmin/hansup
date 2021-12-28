# 🍱 Hansup Food

## 🎈 프로젝트 소개

한숲푸드는 경북 포항시에서 케이터링 및 도시락, 반찬 사업을 운영하고 있는 장애친화적 사회적기업입니다.
![home](https://user-images.githubusercontent.com/47960777/147586077-dd79d375-81d1-42e2-be27-710ac98468be.png)

이번 프로젝트에서는 한숲푸드에 대한 소개 및 각종 설명, 공지사항과 리뷰, 고객의 소리와 같은 유저들의 이야기를 적을 수 있는 CRUD 기능들과 더불어 인터넷으로 특정 날짜를 예약할 수 있는 시스템과 관리자가 예약란을 빠르게 확인할 수 있는 기능을 포함하여 개발하였습니다.

개발 기간은 2021.10월부터 현재 진행중입니다.

<div style="width:100%; display:flex; justify-content:center;">
   <b>👉 <a href="http://hansupfood.com">hansupfood</a> 👈</b>
</div>

<br></br>

## 🧱 기술 스택

### Client

<div>
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=black"/>
<img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-badge&logo=Redux&logoColor=black"/>
<img alt="tailwindcss" src ="https://img.shields.io/badge/tailwindcss-06B6D4.svg?&style=for-the-badge&logo=tailwindcss&logoColor=black"/>
</div>

### Server

<div>
<img alt="Nodejs" src ="https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=black"/>
<img alt="Express" src ="https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white"/>
<img alt="mongoDB" src ="https://img.shields.io/badge/mongoDB-47A248.svg?&style=for-the-badge&logo=mongoDB&logoColor=white"/>
</div>

<br></br>

## 📰 Data Schema (Mongo DB)

<details>
<summary style="">toggle</summary>
<div markdown="1">

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

</div>
</details>

##

## ⚒ 프로젝트 기능 요약

### **사용자**

- [커뮤니티] - [리뷰] 페이지에서 음식에 대한 사진과 함께 리뷰를 작성할 수 있습니다.
  ![img](https://user-images.githubusercontent.com/47960777/147586094-ae4e5c13-4e1e-4a86-9ea8-039cd69ad437.png)
- [커뮤니티] - [고객의 소리] 페이지에서 건의사항을 작성할 수 있습니다.
  ![img](https://user-images.githubusercontent.com/47960777/147586095-9d7cc31f-6493-4903-a79a-c00e6aee9831.png)
- [케이터링 예약] 페이지에서 특정 날짜를 지정하여 예약할 수 있습니다.
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147586085-b0e3b798-3c3a-4bce-8fa8-a9d022b1fc0f.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147586087-014281d6-dd95-48ce-81df-a8dad25f14b0.png" alt="img">
</div>
</div>
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147586088-880f7c7d-1166-4d07-8893-6f24f4701d98.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147586090-561604e7-b596-4be2-9cd3-b8aae9d28119.png" alt="img">
</div>
</div>
<div style="display:grid; grid-template-columns: 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147586091-3a9ff3cd-4fd6-4c77-80db-8fcbf4946f4c.png" alt="img">

</div>
<div>
</div>
</div>

- [케이터링 예약] 페이지에서 기존에 등록했던 예약 정보를 확인할 수 있습니다.

<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589379-6f90a948-a039-4d55-a0db-8d949af6e5e4.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589382-2866c849-6457-4c62-8d09-df0683564443.png" alt="img">
</div>
</div>

### **관리자**

- [특정 url](http://hansupfood.com/admin)을 통해 관리자 페이지로 접속할 수 있습니다.
  ![img](https://user-images.githubusercontent.com/47960777/147586073-a8f918d3-6bc8-4849-9086-c75588c2b379.png)
- [공지사항] 페이지에서 파일 업로드 기능을 포함하여 텍스트 에디터([draft.js](https://draftjs.org/))를 통해 공지사항을 작성할 수 있습니다.
  ![img](https://user-images.githubusercontent.com/47960777/147586083-255506ee-60b8-406f-94ee-2c51d24d05b2.png)
- 공지사항, 리뷰, 고객의 소리, 예약 관리를 진행할 수 있습니다. (CRUD)
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147586083-255506ee-60b8-406f-94ee-2c51d24d05b2.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147592546-a9140a2c-2925-46f6-8b9f-28f1dd281c98.png" alt="img">
</div>
</div>
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589378-43fe0ef6-3003-49dd-86fe-653668d95ab9.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589375-9f0e99f5-7e4d-460f-9353-6b496d4b7d93.png" alt="img">
</div>
</div>

- [관리자] - [예약확인] 페이지에서 캘린더를 통해 월 별 예약 현황을 확인할 수 있습니다. 또한 예약 세부 페이지에서는 예약을 확정 여부를 결정할 수 있습니다.
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147591330-05731171-7ba3-454a-8674-1a55458dcf07.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147591331-49529542-467e-442f-8f5a-d7dcb1092ef0.png" alt="img">

</div>
</div>
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">

<div>
<img src="https://user-images.githubusercontent.com/47960777/147591332-7c90622e-801f-4501-8207-411451de98d2.png" alt="img">
</div>
</div>
<div>
</div>
</div>

- [관리자] - [예약확인] 페이지에서 예약 별로 필요한 정보가 요약된 영수증을 출력할 수 있습니다. (클라이언트 요청 사항 - 주방과 배달원에게 각각 제공되어야 할 영수증이 필요합니다.)
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147591332-7c90622e-801f-4501-8207-411451de98d2.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147591324-e36a8eba-cf25-440f-a08f-2c6b49b0e632.png" alt="img">
</div>
</div>
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147591326-fdadc5b1-1676-4ebb-86c1-3dbc4c0bce1a.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147591328-ff2c7a68-4aa5-4700-922b-8ae68ddcf605.png" alt="img">
</div>
</div>

- [관리자] - [메뉴관리] 페이지에서 보여지는 메뉴를 관리할 수 있습니다.
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589362-caea2a97-9bed-4bb9-99f9-5bfdcbe1ee0b.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589370-8ea5084f-4a99-451e-b23b-8b15d56b0b5d.png" alt="img">
</div>
</div>

- 신규 [예약], [고객의 소리]에 대한 알림을 실시간으로 확인할 수 있습니다. <br></br>(redux 사용)
  [예약]과 [고객의 소리]의 CRUD가 발생할 때마다 redux로 상태 변화를 감지해서 우측 상단에 알람이 나타나게 해서 관리자가 실시간으로 예약을 확인할 수 있도록 합니다.
  ![img](https://user-images.githubusercontent.com/47960777/147589373-96e7158e-d5e1-4fad-aae4-a07a553dee41.png)

# π± Hansup Food

## π νλ‘μ νΈ μκ°

νμ²νΈλλ κ²½λΆ ν¬ν­μμμ μΌμ΄ν°λ§ λ° λμλ½, λ°μ°¬ μ¬μμ μ΄μνκ³  μλ μ₯μ μΉνμ  μ¬νμ κΈ°μμλλ€.

![home](https://user-images.githubusercontent.com/47960777/147586077-dd79d375-81d1-42e2-be27-710ac98468be.png)

μ΄λ² νλ‘μ νΈμμλ νμ²νΈλμ λν μκ° λ° κ°μ’ μ€λͺ, κ³΅μ§μ¬ν­κ³Ό λ¦¬λ·°, κ³ κ°μ μλ¦¬μ κ°μ μ μ λ€μ μ΄μΌκΈ°λ₯Ό μ μ μ μλ CRUD κΈ°λ₯λ€κ³Ό λλΆμ΄ μΈν°λ·μΌλ‘ νΉμ  λ μ§λ₯Ό μμ½ν  μ μλ μμ€νκ³Ό κ΄λ¦¬μκ° μμ½λμ λΉ λ₯΄κ² νμΈν  μ μλ κΈ°λ₯μ ν¬ν¨νμ¬ κ°λ°νμμ΅λλ€.

κ°λ° κΈ°κ°μ 2021.10μλΆν° νμ¬ μ§νμ€μλλ€.

<div style="width:100%; display:flex; justify-content:center;">
   <b>π <a href="http://hansupfood.com">hansupfood</a> π</b>
</div>

<br></br>

## π§± κΈ°μ  μ€ν

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

## π° DataΒ Schema (Mongo DB)

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

## β νλ‘μ νΈ κΈ°λ₯ μμ½

### **μ¬μ©μ**

- [μ»€λ?€λν°] - [λ¦¬λ·°] νμ΄μ§μμ μμμ λν μ¬μ§κ³Ό ν¨κ» λ¦¬λ·°λ₯Ό μμ±ν  μ μμ΅λλ€.

  ![img](https://user-images.githubusercontent.com/47960777/147586094-ae4e5c13-4e1e-4a86-9ea8-039cd69ad437.png)

- [μ»€λ?€λν°] - [κ³ κ°μ μλ¦¬] νμ΄μ§μμ κ±΄μμ¬ν­μ μμ±ν  μ μμ΅λλ€.

  ![img](https://user-images.githubusercontent.com/47960777/147586095-9d7cc31f-6493-4903-a79a-c00e6aee9831.png)

- [μΌμ΄ν°λ§ μμ½] νμ΄μ§μμ νΉμ  λ μ§λ₯Ό μ§μ νμ¬ μμ½ν  μ μμ΅λλ€.
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

- [μΌμ΄ν°λ§ μμ½] νμ΄μ§μμ κΈ°μ‘΄μ λ±λ‘νλ μμ½ μ λ³΄λ₯Ό νμΈν  μ μμ΅λλ€.

<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589379-6f90a948-a039-4d55-a0db-8d949af6e5e4.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589382-2866c849-6457-4c62-8d09-df0683564443.png" alt="img">
</div>
</div>

### **κ΄λ¦¬μ**

- [νΉμ  url](http://hansupfood.com/admin)μ ν΅ν΄ κ΄λ¦¬μ νμ΄μ§λ‘ μ μν  μ μμ΅λλ€.

  ![img](https://user-images.githubusercontent.com/47960777/147586073-a8f918d3-6bc8-4849-9086-c75588c2b379.png)

---

- [κ³΅μ§μ¬ν­] νμ΄μ§μμ νμΌ μλ‘λ κΈ°λ₯μ ν¬ν¨νμ¬ νμ€νΈ μλν°([draft.js](https://draftjs.org/))λ₯Ό ν΅ν΄ κ³΅μ§μ¬ν­μ μμ±ν  μ μμ΅λλ€.

  ![img](https://user-images.githubusercontent.com/47960777/147586083-255506ee-60b8-406f-94ee-2c51d24d05b2.png)

---

- κ³΅μ§μ¬ν­, λ¦¬λ·°, κ³ κ°μ μλ¦¬, μμ½ κ΄λ¦¬λ₯Ό μ§νν  μ μμ΅λλ€. (CRUD)

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

---

- [κ΄λ¦¬μ] - [μμ½νμΈ] νμ΄μ§μμ μΊλ¦°λλ₯Ό ν΅ν΄ μ λ³ μμ½ νν©μ νμΈν  μ μμ΅λλ€. λν μμ½ μΈλΆ νμ΄μ§μμλ μμ½μ νμ  μ¬λΆλ₯Ό κ²°μ ν  μ μμ΅λλ€.
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

---

- [κ΄λ¦¬μ] - [μμ½νμΈ] νμ΄μ§μμ μμ½ λ³λ‘ νμν μ λ³΄κ° μμ½λ μμμ¦μ μΆλ ₯ν  μ μμ΅λλ€. (ν΄λΌμ΄μΈνΈ μμ²­ μ¬ν­ - μ£Όλ°©κ³Ό λ°°λ¬μμκ² κ°κ° μ κ³΅λμ΄μΌ ν  μμμ¦μ΄ νμν©λλ€.)
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

---

- [κ΄λ¦¬μ] - [λ©λ΄κ΄λ¦¬] νμ΄μ§μμ λ³΄μ¬μ§λ λ©λ΄λ₯Ό κ΄λ¦¬ν  μ μμ΅λλ€.
<div style="display:grid; grid-template-columns: 1fr 1fr; gap:4px;">
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589362-caea2a97-9bed-4bb9-99f9-5bfdcbe1ee0b.png" alt="img">

</div>
<div>
<img src="https://user-images.githubusercontent.com/47960777/147589370-8ea5084f-4a99-451e-b23b-8b15d56b0b5d.png" alt="img">
</div>
</div>

---

- μ κ· [μμ½], [κ³ κ°μ μλ¦¬]μ λν μλ¦Όμ μ€μκ°μΌλ‘ νμΈν  μ μμ΅λλ€. <br></br>(redux μ¬μ©)
  [μμ½]κ³Ό [κ³ κ°μ μλ¦¬]μ CRUDκ° λ°μν  λλ§λ€ reduxλ‘ μν λ³νλ₯Ό κ°μ§ν΄μ μ°μΈ‘ μλ¨μ μλμ΄ λνλκ² ν΄μ κ΄λ¦¬μκ° μ€μκ°μΌλ‘ μμ½μ νμΈν  μ μλλ‘ ν©λλ€.
  ![img](https://user-images.githubusercontent.com/47960777/147589373-96e7158e-d5e1-4fad-aae4-a07a553dee41.png)

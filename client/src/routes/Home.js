import React from "react";
import { ImageBackground } from 'react-native';
import Background from 'image/homeBack.png';
import Emoji from 'image/homeEmoji.png';
import Lunchbox from 'image/homeLunchbox.png';
import Catering from 'image/homeCatering.png';
import HomeButton from "components/button/HomeButton";
import HomeContent from "components/content/HomeContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import logo from '../public/images/logo.png';


const Home = () => {
	return(
		<div>
			<ImageBackground source= {Background} >
				<div class="flex">
					<div class="w-3/5 pt-40 pl-24 pb-20 flex-col">
						<img src={ Emoji } class="h-48 w-48" alt='emoji'/>
						<div class="text-3xl text-white pt-8">
							<h2>다한 나무들이 모여 하나의 숲을 만들 듯,</h2>		
							<h2>청각장애인과 비장애인들이 모여 우리만의</h2>
							<h2>특색있는 숲을 만들고자 합니다.</h2>		
						</div>				
					</div>
					<div class="flex-col pt-80 pl-20 pb-10 w-96">
						<HomeButton text="한숲의 인사말" />
						<HomeButton text="한숲 스토리" />
						<HomeButton text="한숲은 꿈꿔요" /> 						
					</div>
				</div>				
			</ImageBackground>			
			<div class="text-center py-14 text-2xl text-hansupBrown">
				<h2>특색을 담은 맛있는 음식으로</h2>
				<h2>고객님들께 착하고 즐거운 맛을 제공합니다.</h2>
			</div>
			<div>
				<HomeContent image={Catering} title="수화식당" text="수화식당은 국내 최초 청각장애인 레스토랑으로, 한식과 양식을 판매하는 식당입니다." color="homePink" reverse="true"/>
				<HomeContent image={Catering} title="케이터링" text="행사, 기념일에 고객님께서 더 풍성하고 행복하게 보내도록 맛난 케이터링 서비스를 제공합니다! " color="homeGray" reverse="false"/>
				<HomeContent image={Lunchbox} title="도시락" text="한숲 도시락은 대상 맞춤형 음식들을 풍성하게 담아 합리적인 가격으로 제공합니다." color="homePink" reverse="true"/>
			</div>	
			<div class="px-28 py-20">
				<div class="pb-8 text-hansupBrown flex">
					<p class="text-xl font-bold ">한숲푸드의 여러 후기들</p>
					<p class="ml-auto">다른 후기 보러가기 </p>
					<div class="mt-1 ml-2">
						<FontAwesomeIcon icon={faArrowRight} className="float-right" />
					</div>
				</div>
				<div class="flex">
					<div class="border border-black w-3/10 h-80">
						image
					</div>
					<div class="border border-black w-3/10 mx-16">
						image
					</div>
					<div class="border border-black w-3/10">
						image
					</div>
				</div>
			</div>		
		</div>		
	)
}

export default Home;

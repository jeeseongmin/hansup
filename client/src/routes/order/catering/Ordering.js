import React, { useState, useEffect } from "react";
import PageLayout from "components/Layout/PageLayout";
import ContentLayout from "components/Layout/ContentLayout";
import styled, { css } from "styled-components";
import StepBox from "components/Box/StepBox";

const Ordering = () => {
	const [selected, setSelected] = useState(1);
	return (
		<PageLayout>
			<div class="w-full flex flex-col mb-16 lg:mb-24 px-8 xl:px-40 ">
				<div class="grid grid-cols-3 gap-8 mb-8">
					<StepBox
						selected={selected}
						step={1}
						text={"1. 예약정보 입력"}
						setSelected={setSelected}
					/>
					<StepBox
						selected={selected}
						step={2}
						text={"2. 메뉴 선택"}
						setSelected={setSelected}
					/>
					<StepBox
						selected={selected}
						step={3}
						text={"3. 결제"}
						setSelected={setSelected}
					/>
				</div>
				<div class="w-full relative border-b border-hansupBrown">
					<div class="rounded-full h-4 w-4 bg-hansupBrown absolute -bottom-2 left-1/4"></div>
				</div>
			</div>
		</PageLayout>
	);
};

export default Ordering;

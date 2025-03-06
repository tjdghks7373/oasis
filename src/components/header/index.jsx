import { Box, ButtonGroup , Button } from '@mui/material';
import { styled } from 'styled-components';
import Search from "@/components/search";
import Image from 'next/image';
import Link from "next/link";

const CustomButton = styled(Button)({
    backgroundColor: "transparent",
    borderRight: "none !important", 
    color: "#747474",
    "&:hover": {
        backgroundColor: "transparent !important",
        borderRight: "none !important",
    },
    "&:active": {
        backgroundColor: "transparent !important",
        borderRight: "none !important",
    },
    boxShadow: "none"
});

const JoinButton = styled(Button)({
    border:"1px solid #00000026",
    padding:"4px 10px 2px",
});

const Header = () => {
    return(
        <StyledheaderBox>
            <StyledLeftSection>
                <h1>
                    <Link href="/">
                        <StyledLogoImg
                            width={151}
                            height={35}
                            src={'logo.svg'}
                            alt={'왓챠피디아'}
                        />
                    </Link>
                </h1>
                <ButtonGroup variant="text" component="nav">
                    <Link href="/">
                        <CustomButton disableRipple disableElevation color="inherit">홈</CustomButton>
                    </Link>
                    <Link href="/movie">
                        <CustomButton disableRipple disableElevation color="inherit">영화</CustomButton>
                    </Link>
                    <Link href="/series">
                        <CustomButton disableRipple disableElevation color="inherit">시리즈</CustomButton>
                    </Link>
                    <Link href="/webtoon">
                        <CustomButton disableRipple disableElevation color="inherit">웹툰</CustomButton>
                    </Link>
                </ButtonGroup>
            </StyledLeftSection>
            <StyledRightSection>
                <Search />
                <StyledLoginSection>
                    <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">로그인</CustomButton>
                    <JoinButton href="/" disableRipple disableElevation variant="outlined" size="small" color="inherit" component="a">회원가입</JoinButton>
                </StyledLoginSection>
            </StyledRightSection>
        </StyledheaderBox>
    )
}
export default Header;

const StyledheaderBox = styled(Box)`
    display:flex;
    align-items:center;
    width:1320px;
    height:62px;
    margin:0 auto; 
`;

const StyledLogoImg = styled(Image)`
    margin-right:15px;
`;

const StyledLeftSection = styled(Box)`
    width:600px;
    float:left;
    display:flex;
`;

const StyledRightSection = styled(Box)`
    width:600px;
    float:right;
    display:flex;
`;

const StyledLoginSection = styled(Box)`
`;
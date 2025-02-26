import { Box, Link, ButtonGroup , Button } from '@mui/material';
import { styled } from 'styled-components';
import Search from "@/components/search";
import Image from 'next/image';

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
                    <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">홈</CustomButton>
                    <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">영화</CustomButton>
                    <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">시리즈</CustomButton>
                    <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">웹툰</CustomButton>
                </ButtonGroup>
            </StyledLeftSection>
            <StyledRightSection>
                <Search />
            </StyledRightSection>
        </StyledheaderBox>
    )
}
export default Header;

const StyledheaderBox = styled(Box)`
    display:flex;
    align-items:center;
    width:1200px;
    height:62px;
    margin:0 auto; 
`;

const StyledLogoImg = styled(Image)`
    margin-right:15px;
`;

const StyledLeftSection = styled(Box)`
    float:left;
    display:flex;
`;

const StyledRightSection = styled(Box)`
    float:right;
    display:flex;
`;
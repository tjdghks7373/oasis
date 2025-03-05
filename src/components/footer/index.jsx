import { Box, Button } from '@mui/material';
import { styled } from 'styled-components';

const CustomButton = styled(Button)({
    fontSize:13,
    padding:0,
    backgroundColor: "transparent",
    borderRight: "none !important",
    color: "#a5a5a7",
    "&::after": {
        content:'""',
        display:'inline-block',
        width:1,
        height:12,
        backgroundColor:"#848485",
        margin:"0 8px"
    },
    "&:last-of-type::after": {
        display: "none",
    },
});

const Footer = () => {
    return(
        <StyledFooterBox>
            <ListGroup variant="text" component="nav">
                <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">서비스 이용약관</CustomButton>
                <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">개인정보 처리방침</CustomButton>
                <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">회사 안내</CustomButton>
            </ListGroup>
            <ListGroup variant="text" component="nav">
                <TextArea>고객센터</TextArea>
                <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">cs@watchapedia.co.kr, 02-515-9985</CustomButton>
            </ListGroup>
            <ListGroup variant="text" component="nav">
                <TextArea>광고문의</TextArea>
                <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">ad-sales@watcha.com</CustomButton>
                <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">최신 광고 소개서</CustomButton>
            </ListGroup>
            <ListGroup variant="text" component="nav">
                <TextArea>제휴 및 대외 협력</TextArea>
                <CustomButton href="/" disableRipple disableElevation color="inherit" component="a">https://watcha.team/contact</CustomButton>
            </ListGroup>
        </StyledFooterBox>
    )
}
export default Footer;

const StyledFooterBox = styled(Box)`
    width:1320px;
    margin:0 auto;
`;

const ListGroup = styled(Box)`
    display:block;
    width:100%;
    &:first-child {
        margin-bottom: 12px;
    }
`;

const TextArea = styled(Box)`
    display:inline-block;
    font-size:13px;
    &::after{
        content:"";
        display:inline-block;
        width:1px;
        height:12px;
        background-color:#848485;
        margin:0 8px
    }
`;
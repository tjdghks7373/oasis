import Rating from '@mui/material/Rating';
import { Box, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { SvgIcon } from '@mui/material';

function CustomStarIcon(props) {
    return (
        <SvgIcon {...props}>
            <path fill="currentColor" d="M11.303 2.613a.75.75 0 0 1 1.345 0l2.722 5.516a.25.25 0 0 0 .188.137l6.088.885a.75.75 0 0 1 .416 1.279l-4.405 4.294a.25.25 0 0 0-.072.221l1.04 6.063a.75.75 0 0 1-1.089.79l-5.445-2.862a.25.25 0 0 0-.232 0L6.414 21.8a.75.75 0 0 1-1.089-.79l1.04-6.064a.25.25 0 0 0-.072-.221L1.888 10.43a.75.75 0 0 1 .416-1.28l6.088-.884a.25.25 0 0 0 .188-.137z"></path>
        </SvgIcon>
    );
}

export default function RatingComponent() {
    return (
        <StyledRatinBox>
            <Rating
                name="half-rating"
                defaultValue={0}
                precision={0.5}
                size="large"
                icon={<CustomStarIcon sx={{ color: '#ff2f6e', fontSize:40 }} />}
                emptyIcon={<CustomStarIcon sx={{ color: '#e0e0e0',  fontSize:40 }} />}
            />
            <Typography component="legend" sx={{ margin:"10px 0 0 6px", color: '#7e7e7e',  fontSize:12 }}>평가하기</Typography>
        </StyledRatinBox>
    );
}

const StyledRatinBox = styled(Box)`
    float:left;
    width:340px;
`;
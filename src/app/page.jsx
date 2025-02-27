"use client";

import { Box } from '@mui/material';
import { styled } from 'styled-components';
import Header from "@/components/header";

export default function Home() {
  return (
    <StyledHeader>
      <Header />
    </StyledHeader>
  );
}

const StyledHeader = styled(Box)`
  width:100%;
  height:69px;
  margin:0 auto;
  border-bottom:1px solid #00000014;
`;



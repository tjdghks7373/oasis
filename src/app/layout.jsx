"use client";

import { Box } from '@mui/material';
import { styled } from 'styled-components';
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledWrap>
          <StyledHeader>
            <Header />
          </StyledHeader>
          <StyledContent>
            {children}
          </StyledContent>
          <StyledFooter>
            <Footer />
          </StyledFooter>
        </StyledWrap>
      </body>
    </html>
  );
}

const StyledWrap = styled(Box)``;

const StyledHeader = styled(Box)`
  width:100%;
  height:69px;
  margin:0 auto;
  border-bottom:1px solid #00000014;
`;

const StyledContent = styled(Box)`

`;

const StyledFooter = styled(Box)`
  width:100%;
  background-color:#1c1d1f;
  color:#a5a5a7;
  font-size:13px;
  padding:20px 0 38px;
`;


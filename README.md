<<<<<<< HEAD
# 환경설정 가이드

### 설치 및 빌드 가이드
1. https://nodejs.org/en <- 홈페이지 접속하여 .msi 파일 다운로드 후 설치 (node v20 이상)
2. https://code.visualstudio.com/download <- vscode 윈도우 버전 다운로드 후 설치
2. vscode 실행 후 왼쪽 네비게이션 아이콘중  source Control 클릭
3. Clone Repository 클릭
4. 상단 입력창 표시되면 https://github.com/{git주소}/nextjs.git 입력후 enter
5. 로컬 폴더에 프로젝트 생성 완료 되면 vscode 상단에 Terminal -> new Terminal 클릭
6. 하단에 터미널창 오픈 되면 순서대로 입력
   - npm install -g npm
   - npm install
   - npx prisma generate
   - npx next build
   - npx next start (수정 작업중에는 npm run dev 입력)
7. 브라우저에서 기본 주소 http://localhost:3000/ 실행
8. git에서 pull 받고 package.json , schema.prisma 변경 내용 있을 시 개발 전 아래 커맨드 입력 상시 반복 (최초 세팅 이후)
   - npm ci
   - npx prisma generate
   - npx next build
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 74b3eef (Initial commit from Create Next App)

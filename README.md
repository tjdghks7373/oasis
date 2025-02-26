환경설정 가이드
설치 및 빌드 가이드
https://nodejs.org/en <- 홈페이지 접속하여 .msi 파일 다운로드 후 설치 (node v20 이상)
https://code.visualstudio.com/download <- vscode 윈도우 버전 다운로드 후 설치
vscode 실행 후 왼쪽 네비게이션 아이콘중 source Control 클릭
Clone Repository 클릭
상단 입력창 표시되면 https://github.com/{git주소}/nextjs.git 입력후 enter
로컬 폴더에 프로젝트 생성 완료 되면 vscode 상단에 Terminal -> new Terminal 클릭
하단에 터미널창 오픈 되면 순서대로 입력
npm install -g npm
npm install
npx prisma generate
npx next build
npx next start (수정 작업중에는 npm run dev 입력)
브라우저에서 기본 주소 http://localhost:3000/ 실행
git에서 pull 받고 package.json , schema.prisma 변경 내용 있을 시 개발 전 아래 커맨드 입력 상시 반복 (최초 세팅 이후)
npm ci
npx prisma generate
npx next build

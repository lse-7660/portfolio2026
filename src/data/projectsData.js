export const projectsData = [
  {
    routeId: 'leysys',
    name: 'Leysys',
    koreanName: '레이시스',
    siteUrl: 'https://www.leysys.com/',
    imgUrl: '/projects/leysys.png',
    dottedImgUrl: '/projects/leysys-halftone.png',
    period: '2025.10',
    contribution: 'full process',
    description: [
      '건물 종합 관리 시스템과 전자 투표 시스템을 서비스하는 IT 기업의 홈페이지 프로젝트.',
      '블랙 앤 화이트 톤과 타이포그래피 중심의 디자인으로 신뢰감 있는 브랜드 이미지를 구축하고,',
      '레이아웃에 변주를 주어 시각적 리듬을 형성했다.',
      '채도 높은 포인트 컬러를 활용해 젊고 도전적인 브랜드 이미지를 표현했다.',
    ],
    designStack: ['figma', 'aftereffect', 'motion'],
    frontStack: ['vue'],
    task: [
      {
        title: '인터랙티브 UI 구현',
        desc: 'motion.js 라이브러리를 활용, 사용자 마우스 커서 추적 및 스크롤 기반 애니메이션 구현으로 고도화된 시각적 경험 제공',
      },
      {
        title: '모션 그래픽 최적화',
        desc: 'After Effects로 작업한 모션 디자인 요소를 웹 환경에 최적화하여 구현',
      },
      {
        title: '타이포그래피 디자인',
        desc: '타이포그래피 중심의 UI 디자인으로 신뢰성 있는 IT 기업의 브랜드 이미지 구축',
      },
      {
        title: 'Troubleshooting',
        desc: '데이터 바인딩 시 null 체크 로직(Optional Chaining) 부재로 인한 렌더링 오류 개선 및 안정성 확보',
      },
    ],
    detail: [
      { imgUrl: '/projects/leysys-1.png', text: '상황에 따른 커서 이펙트로 몰입감을 더했다.' },
      {
        imgUrl: '/projects/leysys-2.png',
        text: '레이아웃에 변주를 주어 젊은 기업의 느낌을 강조했다.',
      },
      {
        imgUrl: '/projects/leysys-3.png',
        text: '모션을 활용해 기업이 추구하는 방향을 시각화했다.',
      },
      {
        imgUrl: '/projects/leysys-4.png',
        text: '채도 높은 포인트 컬러를 활용해 도전적인 브랜드 이미지를 표현했다.',
      },
    ],
  },
  {
    routeId: 'leyve-cloud',
    name: 'Leyve Cloud',
    koreanName: '레이브 클라우드',
    period: '2025.08 - 2026.01',
    siteUrl: 'https://www.leyve.com/',
    imgUrl: '/projects/leyvecloud.png',
    dottedImgUrl: '/projects/leyvecloud-halftone.png',
    contribution: 'full process',
    description: [
      '건물 종합 관리 시스템 레이브 클라우드의 홈페이지 프로젝트.',
      '고객이 별도의 문의 없이 서비스와 견적을 확인하고 이용 신청까지 진행할 수 있도록',
      '사용자 접근성을 개선하는 데 초점을 맞췄다. 사용자의 홈페이지 이용 흐름을 분석해',
      '상황에 맞는 페이지 이동 버튼을 배치하고, 자연스럽게 다음 단계로 이어지는 사용자 동선을 설계했다.',
    ],
    designStack: ['figma'],
    frontStack: ['vue'],
    task: [
      {
        title: '실시간 견적 산출 로직 구현',
        desc: 'Vue의 반응형 시스템을 활용, 사용자 입력과 동시에 복잡한 견적 금액이 실시간으로 계산되는 인터랙티브 UI 구현',
      },
      {
        title: '데이터 무결성 확보',
        desc: '유효성 검증(Validation) 로직으로 비정상 데이터 유입 차단 및 사용자 입력 편의성 개선',
      },
      {
        title: '백엔드 협업 및 연동',
        desc: 'Java 기반 API 연동으로 이용 문의 및 서비스 신청 프로세스 구축',
      },
      {
        title: '사용자 경험 재구성',
        desc: '기존 페이지의 정보를 분석하여 서비스 신청까지의 경로를 단축하는 직관적인 UX 흐름 기획 및 반영',
      },
    ],
    detail: [
      {
        imgUrl: '/projects/leyvecloud-1.png',
        text: '기존 사이트 정보를 재구성하고, 타깃 사용자의 공감을 이끌어 관심을 높였다.',
      },
      {
        imgUrl: '/projects/leyvecloud-2.png',
        text: '기존 서비스 흐름을 단순화하고 직관적으로 개선해 이용 편의성을 높였다.',
      },
      {
        imgUrl: '/projects/leyvecloud-3.png',
        text: '견적 조회부터 신청까지의 과정을 통합 구현해 간편한 사용자 경험을 제공했다.',
      },
      {
        imgUrl: '/projects/leyvecloud-4.png',
        text: '사용 흐름에 맞춘 인터랙션 설계로 자연스럽게 다음 행동으로 이어지도록 했다.',
      },
    ],
  },
  {
    routeId: 'brave-vote',
    name: 'Brave Vote',
    koreanName: '브레이브 보트',
    period: '2025.09',
    siteUrl: 'https://www.bravevote.com/',
    imgUrl: '/projects/bravevote.png',
    dottedImgUrl: '/projects/bravevote-halftone.png',
    contribution: 'full process',
    description: [
      '전자 투표 시스템 ‘브레이브 보트’의 홈페이지 프로젝트.',
      '간결한 구성을 요청한 클라이언트 요구에 맞추어 서비스의 핵심 기능을 명확하게 전달하는 것에 집중했다.',
      '불필요한 시각 요소를 최소화하고 정돈된 레이아웃을 적용해 콘텐츠 가독성을 높이고,',
      '핵심 정보가 직관적으로 전달되도록 설계했다.',
    ],
    designStack: ['figma'],
    frontStack: ['vue'],
    task: [
      {
        title: '로직 재사용 및 효율화',
        desc: '기존 개발된 견적 산출 모듈을 프로젝트 요구사항에 맞춰 최적화하여 개발 공수 단축',
      },
      {
        title: 'API 통신 안정화',
        desc: 'Java 기반 백엔드와 연동하여 서비스 이용 문의 시스템 구축',
      },
    ],
    detail: [
      {
        imgUrl: '/projects/bravevote-1.png',
        text: '해시태그와 이미지를 활용해 서비스의 정체성을 직관적으로 전달했다.',
      },
      { imgUrl: '/projects/bravevote-2.png', text: '정돈된 레이아웃을 적용해 가독성을 높였다.' },
      {
        imgUrl: '/projects/bravevote-3.png',
        text: '입력 즉시 견적을 확인할 수 있는 기능을 구현해 사용자 편의성을 높였다.',
      },
      {
        imgUrl: '/projects/bravevote-4.png',
        text: '입력 데이터의 정확성과 사용자 경험을 동시에 고려한 유효성 검증을 구현했다.',
      },
    ],
  },
  {
    routeId: 'leyve-mobile-app',
    name: 'Leyve App',
    koreanName: '레이브 모바일 앱',
    period: '2025.10 - 2025.11',
    siteUrl: 'https://play.google.com/store/apps/details?id=com.leysys.leyve&hl=ko',
    imgUrl: '/projects/leyveapp.png',
    dottedImgUrl: '/projects/leyveapp-halftone.png',
    contribution: 'Design / Frontend',
    description: [
      '건물 종합 관리 시스템 ‘레이브 클라우드’의 모바일 애플리케이션 프로젝트.',
      '기존 기획과 디자인을 기반으로 프론트엔드 구현을 담당했다.',
      '구현 과정에서 필요한 디자인 요소는 디자이너와 협의하며 보완했고, 미구성된 페이지는',
      '기존 디자인 톤을 유지하면서 새롭게 디자인하고 개발했다.',
    ],
    designStack: ['figma'],
    frontStack: ['vue', 'Capacitor', ' Xcode', 'Android Studio'],
    task: [
      {
        title: '하이브리드 앱 아키텍처 설계',
        desc: 'Vue.js 기반 웹 애플리케이션을 Capacitor를 활용해 iOS/Android 하이브리드 앱으로 전환하여 유지보수 효율성 극대화',
      },
      {
        title: '스토어 런칭 주도',
        desc: '각 플랫폼(App Store, Play Store)의 심사 가이드라인을 준수하여 보안 및 정책 검토 후 최종 배포 완료',
      },
      {
        title: '디자인 시스템 확장',
        desc: '기존 디자인 가이드를 준수하면서 신규 페이지를 직접 설계 및 구현하여 일관성 있는 브랜드 경험 제공',
      },
    ],
    detail: [
      {
        imgUrl: '/projects/leyveapp-1.png',
        text: '기획과 디자인을 토대로 구현을 진행하고, UI/UX를 협업으로 지속 개선했다.',
      },
      {
        imgUrl: '/projects/leyveapp-2.png',
        text: 'API 연동으로 고객 데이터를 불러와 동적으로 렌더링했다.',
      },
      {
        imgUrl: '/projects/leyveapp-3.png',
        text: '관리비 데이터를 그래프로 시각화해 정보 전달력을 높였다.',
      },
      {
        imgUrl: '/projects/leyveapp-4.png',
        text: '미구성 페이지를 기존 디자인 톤에 맞춰 설계하고 구현했다.',
      },
    ],
  },
  {
    routeId: '2025-portfolio',
    name: '2025 Portfolio',
    koreanName: '2025 포트폴리오',
    period: '2025.04 - 2025.05',
    siteUrl: 'https://portfolio-songeun.netlify.app/',
    imgUrl: '/projects/2025portfolio.png',
    dottedImgUrl: '/projects/2025portfolio-halftone.png',
    contribution: 'full process',
    description: [
      '2025년도 디자인 및 프론트엔드 포트폴리오.',
      'HTML과 바닐라 자바스크립트로 제작한 프로젝트부터 React 기반의 개인 및 팀 프로젝트,',
      '그리고 4년간의 디자인 실무 작업물을 함께 정리해 디자인과',
      '프론트엔드 역량의 성장 과정을 담았다.',
    ],
    designStack: ['figma', 'photoshop'],
    frontStack: ['react'],
    task: [],
    detail: [],
  },
]

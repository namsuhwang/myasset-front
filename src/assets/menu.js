export default 
[
    {
        id:'menu_01', name:'홈', path: '/asset/total',
        subMenus:[      
            {id:'menu_01_01', name:'종합현황', path: '/asset/total'},
            {id:'menu_01_02', name:'자산조회', path: '/asset/total'}
        ]
    },
    {id:'menu_02', name:'계좌', path: '/asset/bank',
        subMenus:[      
            {id:'menu_02_01', name:'계좌 보유현황', path: '/asset/bank'},
            {id:'menu_02_02', name:'계좌 등록', path: '/asset/bank/reg'}
        ]
    },
    {
        id:'menu_03', name:'주식', path: '/asset/stock/list',
        subMenus:[      
            {id:'menu_03_01', name:'보유 주식', path: '/asset/stock/list'},
            {id:'menu_03_02', name:'주식 계좌 등록', path: '/asset/stock/acno/reg'},
            {id:'menu_03_02', name:'주식 종목 등록', path: '/asset/stock/kind/reg'},
            {id:'menu_03_03', name:'주식 거래 등록', path: '/asset/stock/trade/reg'},
            {id:'menu_03_04', name:'주식 물타기 계산', path: '/asset/stock/avgcalc'}
        ]
    },
    {
        id:'menu_04', name:'부동산', path: '/asset/re',
        subMenus:[      
           {id:'menu_04_01', name:'부동산 보유현황', path: '/asset/re'},
           {id:'menu_04_02', name:'부동산 매수 등록', path: '/asset/re/buy/reg'},
           {id:'menu_04_03', name:'부동산 매도 등록', path: '/asset/re/buy/sale'}
        ]
    },
    {id:'menu_05', name:'장부',
        subMenus:[      
            {id:'menu_05_01', name:'수입/지출'},
            {id:'menu_05_02', name:'손익 조회'}
        ]
    },
    {id:'menu_06', name:'정보',
        subMenus:[      
            {id:'menu_06_01', name:'나의 정보'},
            {id:'menu_06_02', name:'시스템 기본 정보'},
            {id:'menu_06_03', name:'로그 아웃'}
        ]
    }
]
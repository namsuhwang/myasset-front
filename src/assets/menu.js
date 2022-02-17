export default 
[
    {
        id:'menu_01', name:'홈', path: '/asset/stock/total',
        subMenus:[      
            {id:'menu_01_01', name:'[종합현황]', path: '/asset/total'},
            {id:'menu_01_02', name:'[자산조회]', path: '/asset/total'}
        ]
    },
    {
        id:'menu_02', name:'계좌', path: '/asset/bank',
        subMenus:[      
            {id:'menu_02_01', name:'[보유계좌]', path: '/asset/bank'},
            {id:'menu_02_02', name:'[계좌등록]', path: '/asset/bank/detail'}
        ]
    },
    {
        id:'menu_03', name:'주식', path: '/asset/stock/total',
        subMenus:[      
            {id:'menu_03_01', name:'[관심종목]', path: '/asset/stock/interest'}, 
            {id:'menu_03_02', name:'[보유종목]', path: '/asset/stock/total'},
            {id:'menu_03_03', name:'[계좌등록]', path: '/asset/stock/acno/detail'},
            {id:'menu_03_04', name:'[보유종목등록]', path: '/asset/stock/kind/detail'},
            {id:'menu_03_05', name:'[거래내역]', path: '/asset/stock/trade/history'},
          //  {id:'menu_03_04', name:'주식 물타기 계산', path: '/asset/stock/avgcalc'}
        ]
    },
    {
        id:'menu_04', name:'부동산', path: '/asset/re',
        subMenus:[      
           {id:'menu_04_01', name:'[보유부동산]', path: '/asset/re'},
           {id:'menu_04_02', name:'[부동산매수]', path: '/asset/re/buy/detail'},
           {id:'menu_04_03', name:'[부동산매도]', path: '/asset/re/buy/sale'},
           {id:'menu_04_04', name:'[임대현황]', path: '/asset/re/buy/sale'},
           {id:'menu_04_05', name:'[임대등록/수정]', path: '/asset/re/buy/sale'}
        ]
    },
    {id:'menu_05', name:'장부',
        subMenus:[      
            {id:'menu_05_01', name:'[수입/지출]'},
            {id:'menu_05_02', name:'[손익조회]'}
        ]
    },
    {id:'menu_06', name:'시스템', path: '/system/myinfo',
        subMenus:[      
            {id:'menu_06_01', name:'[로그인]', path: '/system/login'},
            {id:'menu_06_02', name:'[나의정보]', path: '/system/myinfo'},
            {id:'menu_06_03', name:'[로그아웃]', path: '/system/logout'}
        ]
    }
]
import axios from 'axios';

const methods = {
    comma3(str){ 
        if(str == null){
            return "0";
        }
        
        if(str.length <= 3){
            return str;
        }
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    won(str){        
        if(str == null){
            return "0 원";
        }
        
        if(str.length <= 3){
            return str + " 원";
        }
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
    },
    uncomma(str) {
       // console.log("uncomma=" + str);
       str = String(str);
       str = str.replace(/[^\d]+/g, '');
       str = String(parseInt(str));
       return str;
    },
    isNumeric(num, opt) {  // 좌우 trim(공백제거)을 해준다.
        /*
            isNumeric( "-10" ) // true
            isNumeric( "+10" ) // true
            isNumeric( "-10", 2 ) // false
            isNumeric( "+10", 2 ) // false
            isNumeric( "0" ) // true
            isNumeric( "0xFF" ) // false
            isNumeric( "8e5" ) // false
            isNumeric( "3.1415" ) // true
            isNumeric( "3.1415", 4 ) // false
            isNumeric( "0144" ) // true
            isNumeric( ".423" ) // false
            isNumeric( "" ) // false
            isNumeric( "432,000" ) // true
            isNumeric( "432,000", 3 ) // false
            isNumeric( "23,223.002" ) // true
            isNumeric( "3,23,423" ) // false
            isNumeric( "-0x42" ) // false
            isNumeric( "7.2acdgs" ) // false
            isNumeric( {} ) // false
            isNumeric( NaN ) // false
            isNumeric( null ) // false
            isNumeric( true ) // false
            isNumeric( false ) // false
            isNumeric( Infinity ) // false
            isNumeric( undefined ) // false 
        */
        num = String(num).replace(/^\s+|\s+$/g, "");
       
        if(typeof opt == "undefined" || opt == "1"){
          // 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
          var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
        }else if(opt == "2"){
          // 부호 미사용, 자릿수구분기호 선택, 소수점 선택
          var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
        }else if(opt == "3"){
          // 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
          var regex = /^[0-9]+(\.[0-9]+)?$/g;
        }else{
          // only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
          var regex = /^[0-9]$/g;
        }
       
        var numYn = false;
        if( regex.test(num) ){
            num = num.replace(/,/g, "");
            numYn = isNaN(num) ? false : true;
        }else{ 
            numYn = false;  
        }

        // if(!numYn){
        //     alert("숫자만 입력 가능! [" + num + "]");
        // }
        return numYn;
    },
    getCodeNameFromCodeList(codeList, code){ 
        for(var idx in codeList){
            // console.log("tmp = " + JSON.stringify(codeList[idx]));
            if(codeList[idx].code == code)
                return codeList[idx].codeName;
        }
    },
    numColor(numVal){
        // console.log("numVal=" + numVal + ", isNumeric=" + this.isNumeric(numVal));
        
        if(numVal == null || isNaN(numVal)){
            return null;
        }

        if(numVal > 0){
            return "num-plus";            
        }else if(numVal < 0){ 
            return "num-minus";          
        }else if(numVal == 0){
            return "num-zero";
        }else if(numVal.includes('▲')){
            return "num-plus";            
        }else if(numVal.includes('▼')){
            return "num-minus";           
        }else{
            return "num-zero";           
        }            
    },
    getDateNow(dateType){
        var today = new Date();

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        
        var dateString = "";
        if(dateType == "8"){
            dateString = year + month + day;
        }else if(dateType == "10"){
            dateString = year + "-" + month + "-" + day;
        }

        return dateString;
    }
     
}
    
export default{
    install(Vue){
        Vue.config.globalProperties.$comma3 = methods.comma3;
        Vue.config.globalProperties.$won = methods.won;
        Vue.config.globalProperties.$uncomma = methods.uncomma;
        Vue.config.globalProperties.$getCodeNameFromCodeList = methods.getCodeNameFromCodeList;
        Vue.config.globalProperties.$isNumeric = methods.isNumeric; 
        Vue.config.globalProperties.$numColor = methods.numColor; 
        Vue.config.globalProperties.$getDateNow = methods.getDateNow; 
    }
}
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
       console.log("uncomma=" + str);
       str = String(str);
       str = str.replace(/[^\d]+/g, '');
       str = String(parseInt(str));
       return str;
    },
    getCodeNameFromCodeList(codeList, code){ 
        for(var idx in codeList){
            // console.log("tmp = " + JSON.stringify(codeList[idx]));
            if(codeList[idx].code == code)
                return codeList[idx].codeName;
        }
    }
}
    
export default{
    install(Vue){
        Vue.config.globalProperties.$comma3 = methods.comma3;
        Vue.config.globalProperties.$won = methods.won;
        Vue.config.globalProperties.$uncomma = methods.uncomma;
        Vue.config.globalProperties.$getCodeNameFromCodeList = methods.getCodeNameFromCodeList;
    }
}
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
    }
}
    
export default{
    install(Vue){
        Vue.config.globalProperties.$comma3 = methods.comma3;
        Vue.config.globalProperties.$won = methods.won;
    }
}
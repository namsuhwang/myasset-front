const methods = {
    comma3(str){
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    won(str){        
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
    }
}
    
export default{
    install(Vue){
        Vue.config.globalProperties.$comma3 = methods.comma3;
        Vue.config.globalProperties.$won = methods.won;
    }
}
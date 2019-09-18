export default {
    loadDataStore(){
        return JSON.parse(window.localStorage.getItem('dataStore'));
    },
    saveDataStore(update){
        return window.localStorage.setItem('dataStore',JSON.stringify(update));
    }
}
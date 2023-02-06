export default function loadingReducer(prevState={isLoading:false},action){
    switch (action.type) {
        case 'hide-loading':
            return {...prevState,isLoading:false}
        case 'show-loading':
            return {...prevState,isLoading:true}
        default:
            return {...prevState}
    }

}
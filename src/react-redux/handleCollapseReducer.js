export default function handleCollapseReducer(prevState={isCollapsed:false},action){
    switch (action.type) {
        case 'handleCollapse':
            return {
                ...prevState,
                isCollapsed:!prevState.isCollapsed
            }
    
        default:
            return prevState
    }
    

}
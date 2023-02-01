export default function getRoutesReducer(prevState={routesRawData:[]},action){
    switch (action.type) {
        case 'updateRoutes':
            return {...prevState,routesRawData:action.payload}
        default:
            return {...prevState}
    }

}
export function getGreetingByTime(){
    let date = new Date();
    let hour = date.getHours()
    if(hour < 12){
        return 'morning';
    } else if (hour > 12 && hour < 17){
        return 'afternoon';
    } else {
        return 'evening';
    }
}
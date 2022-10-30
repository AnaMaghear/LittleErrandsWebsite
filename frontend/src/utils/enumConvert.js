export const convertErrandStatus = (status) => {
    switch(status){
        case 0 : return "New"
        case 1 : return "In progress"
        case 2 : return "Done"
        default : return ""
    }
} 

export const convertConfirmationStatus = (status) => {
    switch(status){
        case 0 : return "Pending"
        case 1 : return "Declined"
        case 2 : return "Accepted"
        default : return ""
    }
} 

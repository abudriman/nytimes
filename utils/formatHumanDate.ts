import { format } from "date-fns"

const formatHumanDate = (date: number | Date) => {
    return format(date, 'MMM d, yyyy')
}

export default formatHumanDate
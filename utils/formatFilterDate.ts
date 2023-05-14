import { format } from "date-fns"

const formatFilterDate = (date: number | Date) => {
    return format(date, 'yyyyMMdd')
}

export default formatFilterDate
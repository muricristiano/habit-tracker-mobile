import dayjs from "dayjs"

export function generateDatesFromYearBeginning() {
    const firstDayOfTheYear = dayjs().startOf('year')
    const today = new Date()

    const dates = []
    let compareDate = firstDayOfTheYear

    // Adicionado "&& dates.length < 126", para que exista um limite de dias registrados de 18 semanas.
    // Para remover basta remover o que está exatamente entre aspas duplas no exemplo
    while (compareDate.isBefore(today)) {
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates
}
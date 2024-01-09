export const useDate = () => {
   const findBDay = (days, months, years) => {
      const date = new Date()

      date.setDate(date.getDate() + days)
      date.setMonth(date.getMonth() + months)
      date.setFullYear(date.getFullYear() + years)

      return date.toISOString()
   }

   const getFormatedStringFromDays = numberOfDays => {
      const years = Math.floor(numberOfDays / 365)
      const months = Math.floor((numberOfDays % 365) / 30)
      const days = Math.floor((numberOfDays % 365) % 30)

      const yearsDisplay =
         years > 0
            ? years + (years === 1 ? ' year ' : ' years ')
            : ''
      const monthsDisplay =
         months > 0
            ? months +
              (months === 1 ? ' month ' : ' months ')
            : ''
      const daysDisplay =
         days > 0
            ? days + (days === 1 ? ' day' : ' days')
            : ''

      if (yearsDisplay) {
         return yearsDisplay
      } else if (monthsDisplay) {
         return monthsDisplay
      } else {
         return daysDisplay
      }
   }

   const getPlantAge = bday => {
      {
         {
            return getFormatedStringFromDays(
               Math.round(
                  (new Date() - new Date(bday)) /
                     (1000 * 3600 * 24)
               )
            )
         }
      }
   }

   return {
      findBDay,
      getFormatedStringFromDays,
      getPlantAge,
   }
}

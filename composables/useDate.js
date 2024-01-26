export const useDate = () => {
   const findBDay = (days, months, years) => {
      const date = new Date()

      date.setDate(date.getDate() + days)
      date.setMonth(date.getMonth() + months)
      date.setFullYear(date.getFullYear() + years)

      return date.toISOString()
   }

   // Takes no of days, returns no of years/months/days
   const getFormattedStringFromDays = numberOfDays => {
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

   // Takes bday and return no of days old
   const getPlantAge = bday => {
      const numDays = Math.round(
         (new Date() - new Date(bday)) / (3600 * 1000 * 24)
      )

      return getFormattedStringFromDays(numDays)
   }

   const howLongAgoPosted = createdDate => {
      const exactNumDays =
         (new Date() - new Date(createdDate)) /
         (3600 * 1000 * 24)

      const roundedNumDays = Math.round(
         (new Date() - new Date(createdDate)) /
            (3600 * 1000 * 24)
      )

      const numHours =
         (new Date() - new Date(createdDate)) /
         (3600 * 1000)

      const numMinutes =
         (new Date() - new Date(createdDate)) / (60 * 1000)

      if (numMinutes <= 1) {
         return 'Just now'
      } else if (numHours < 1) {
         return Math.round(numMinutes) + ' mins'
      } else if (exactNumDays < 1) {
         return Math.round(numHours) + ' hours'
      } else {
         return getFormattedStringFromDays(roundedNumDays)
      }
   }

   return {
      findBDay,
      getFormattedStringFromDays,
      getPlantAge,
      howLongAgoPosted,
   }
}

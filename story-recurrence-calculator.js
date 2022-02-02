const moment = require('moment');
const MAX_STORIES = 10;

const weekOfMonth = (momentDate) => { 
  return momentDate.week() - moment(momentDate).startOf('month').week() + 1;
};

const customRecurrence = (momentDate, data) => {
  const customData = data.customRecurrence;
  if (!customData?.repeatEveryValue) {
    return null;
  }

  const newDate = moment(momentDate);
  let arr = [newDate];
  if (customData.repeatEveryOccasion === 'WEEK') {
    for (let i = 0; i < customData.repeatEveryValue; i++) {
      let sundayDate = moment(arr[arr.length - 1]);
      sundayDate = sundayDate.day() !== 0 ? sundayDate.day(7) : sundayDate;
      // Next Sunday is Sunday or not
      for (let j = 0; j < customData.repeatOnEveryWeek.length; j++) {
        arr.push(moment(sundayDate).add(customData.repeatOnEveryWeek[j], 'days'));
        if (arr.length === MAX_STORIES) {
          return arr;
        }
      }
    }
    return arr;
  } else if (customData.repeatEveryOccasion === 'MONTH') {
    const maxValue = customData.repeatEveryValue > MAX_STORIES ? MAX_STORIES : customData.repeatEveryValue;
    if (customData.repeatOnEveryMonth === 'SPECIFIC_WEEKDAY') {
      const weeks = weekOfMonth(arr[arr.length - 1]);
      const weekday = moment(arr[arr.length - 1]).day();
      for (let i = 1; i < maxValue; i++) {
        let nextMonthDate = moment(arr[arr.length - 1]).add(1, 'month')
                                                       .startOf('month');                      
        let addWeeksToDate = moment(nextMonthDate).add(weeks, 'week');
        
        if (nextMonthDate.month() !== addWeeksToDate.month()) {
          const endOfMonth = moment(nextMonthDate).endOf('month');
          const endOfMonthWeekday = endOfMonth.day();
          addWeeksToDate = endOfMonth.day(endOfMonthWeekday < weekday ? -7 : 0);
        }

        nextMonthDate = addWeeksToDate.day(weekday);

        if (weeks === 1 && addWeeksToDate.date() > 7) {
          nextMonthDate = addWeeksToDate.subtract(7, 'days');
        }
        
        arr.push(nextMonthDate);
      }
    } else if (customData.repeatOnEveryMonth === 'SPECIFIC_DAY') {
      for (let i = 1; i < maxValue; i++) {
        const nextMonthDate = moment(arr[arr.length - 1]).add(1, 'month');
        arr.push(nextMonthDate);
      }
    }
    return arr;
  }

  return null;
};

const nextPublishDate = (momentDate, data) => {
  let newDate;
  switch (data.scheduleType) {
    case 'DAILY':
      newDate = moment(momentDate).add(1, 'days');
      break;
    case 'WEEKLY':
      newDate = moment(momentDate).add(1, 'week');
      break;
    case 'MONTHLY':
      newDate = moment(momentDate).add(30, 'days');
      break;
  }

  if (data.endDate && newDate > moment(data.endDate)) {
    return null;
  }

  return newDate;
};

const getRecurrenceDates = (dateStr, data) => {
  const firstPublishDate = moment(dateStr);
  let arr = [firstPublishDate];

  if (data.scheduleType !== 'CUSTOM') {
    for (let i = 1; i < MAX_STORIES; i++) {
      const nextDate = nextPublishDate(arr[arr.length - 1], data);
      if (!nextDate) break;
      arr.push(nextDate);
    }
  } else {
    arr = customRecurrence(arr[arr.length - 1], data) || [];
  }

  return arr;
};

module.exports = {
  getRecurrenceDates
};
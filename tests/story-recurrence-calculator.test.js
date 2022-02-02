const { getRecurrenceDates } = require('../story-recurrence-calculator');
const { expect } = require('chai');

describe('story-recurrence-calculator', () => {
  const formattedDates = (dates) => dates.map((date) => date.format('YYYY-MM-DD'));

  it('daily recurrence', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'DAILY'
    });

    const datesArr = [
      '2022-05-26',
      '2022-05-27',
      '2022-05-28',
      '2022-05-29',
      '2022-05-30',
      '2022-05-31',
      '2022-06-01',
      '2022-06-02',
      '2022-06-03',
      '2022-06-04'
    ];

    expect(formattedDates(result)).to.deep.equal(datesArr);
  });

  it('daily recurrence with end date', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'DAILY',
      endDate: '2022-06-01'
    });

    const datesArr = [
      '2022-05-26',
      '2022-05-27',
      '2022-05-28',
      '2022-05-29',
      '2022-05-30',
      '2022-05-31',
      '2022-06-01'
    ];

    expect(formattedDates(result)).to.deep.equal(datesArr);
  });

  it('weekly recurrence', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'WEEKLY'
    });

    const datesArr = [
      '2022-05-26',
      '2022-06-02',
      '2022-06-09',
      '2022-06-16',
      '2022-06-23',
      '2022-06-30',
      '2022-07-07',
      '2022-07-14',
      '2022-07-21',
      '2022-07-28'
    ];

    expect(formattedDates(result)).to.deep.equal(datesArr);
  });

  it('weekly recurrence with end date', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'WEEKLY',
      endDate: '2022-07-01'
    });

    const datesArr = [
      '2022-05-26',
      '2022-06-02',
      '2022-06-09',
      '2022-06-16',
      '2022-06-23',
      '2022-06-30'
    ];

    expect(formattedDates(result)).to.deep.equal(datesArr);
  });

  it('custom recurrence scheduled on specific week days', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 2,
        repeatEveryOccasion: 'WEEK',
        repeatOnEveryWeek: [0, 2, 4] // Sunday, Tuesday, and Thursday
      }
    });

    const datesArr = [
      '2022-05-26',
      '2022-05-29',
      '2022-05-31',
      '2022-06-02',
      '2022-06-05',
      '2022-06-07',
      '2022-06-09'
    ];

    expect(formattedDates(result)).to.deep.equal(datesArr);
  });

  it('custom recurrence scheduled on every month on specific weekday', () => {
    const result = getRecurrenceDates('2022-06-01', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 3,
        repeatEveryOccasion: 'MONTH',
        repeatOnEveryMonth: 'SPECIFIC_WEEKDAY'
      }
    });

    const datesArr = [
      '2022-06-01',
      '2022-07-06',
      '2022-08-03',
      '2022-09-07'
    ];

    expect(formattedDates(result)).to.deep.equal(datesArr);
  });
});
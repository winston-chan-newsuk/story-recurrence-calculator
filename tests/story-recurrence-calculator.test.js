const { getRecurrenceDates } = require('../story-recurrence-calculator');
const { expect } = require('chai');

describe('story-recurrence-calculator', () => {
  const formattedDates = (dates) => dates.map((date) => date.format('YYYY-MM-DD'));

  it('daily recurrence', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'DAILY'
    });

    expect(formattedDates(result)).to.deep.equal([
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
    ]);
  });

  it('daily recurrence with end date', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'DAILY',
      endDate: '2022-06-01'
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-05-26',
      '2022-05-27',
      '2022-05-28',
      '2022-05-29',
      '2022-05-30',
      '2022-05-31',
      '2022-06-01'
    ]);
  });

  it('weekly recurrence', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'WEEKLY'
    });

    expect(formattedDates(result)).to.deep.equal([
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
    ]);
  });

  it('weekly recurrence with end date', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'WEEKLY',
      endDate: '2022-07-01'
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-05-26',
      '2022-06-02',
      '2022-06-09',
      '2022-06-16',
      '2022-06-23',
      '2022-06-30'
    ]);
  });

  it('monthly recurrence', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'MONTHLY'
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-05-26',
      '2022-06-26',
      '2022-07-26',
      '2022-08-26',
      '2022-09-26',
      '2022-10-26',
      '2022-11-26',
      '2022-12-26',
      '2023-01-26',
      '2023-02-26'
    ]);
  });

  it('monthly recurrence with end date - case 1', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'MONTHLY',
      endDate: '2022-07-01'
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-05-26',
      '2022-06-26'
    ]);
  });

  it('monthly recurrence with end date - case 2', () => {
    // At the end of the month
    const result = getRecurrenceDates('2022-01-31', {
      scheduleType: 'MONTHLY'
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-01-31',
      '2022-02-28',
      '2022-03-31',
      '2022-04-30',
      '2022-05-31',
      '2022-06-30',
      '2022-07-31',
      '2022-08-31',
      '2022-09-30',
      '2022-10-31',
    ]);
  });

  it('custom recurrence scheduled on specific week days - case 1', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 2,
        repeatEveryOccasion: 'WEEK',
        repeatOnEveryWeek: [0, 2, 4] // Sunday, Tuesday, and Thursday
      }
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-05-26',
      '2022-05-29',
      '2022-05-31',
      '2022-06-02',
      '2022-06-05',
      '2022-06-07',
      '2022-06-09'
    ]);
  });

  it('custom recurrence scheduled on specific week days - case 2', () => {
    const result = getRecurrenceDates('2022-05-26', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 3,
        repeatEveryOccasion: 'WEEK',
        repeatOnEveryWeek: [1, 4, 5, 6] // Monday, Thursday, Friday, and Saturday
      }
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-05-26',
      '2022-05-30',
      '2022-06-02',
      '2022-06-03',
      '2022-06-04',
      '2022-06-06',
      '2022-06-09',
      '2022-06-10',
      '2022-06-11',
      '2022-06-13'
    ]);
  });

  it('custom recurrence scheduled on every month on specific weekday - case 1', () => {
    const result = getRecurrenceDates('2022-06-15', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 20,
        repeatEveryOccasion: 'MONTH',
        repeatOnEveryMonth: 'SPECIFIC_WEEKDAY'
      }
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-06-15',
      '2022-07-20',
      '2022-08-24',
      '2022-09-21',
      '2022-10-19',
      '2022-11-23',
      '2022-12-21',
      '2023-01-25',
      '2023-02-22',
      '2023-03-22'
    ]);
  });

  it('custom recurrence scheduled on every month on specific weekday - case 2', () => {
    // Start from beginning of the month
    const result = getRecurrenceDates('2022-06-01', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 20,
        repeatEveryOccasion: 'MONTH',
        repeatOnEveryMonth: 'SPECIFIC_WEEKDAY'
      }
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-06-01',
      '2022-07-06',
      '2022-08-03',
      '2022-09-07',
      '2022-10-05',
      '2022-11-02',
      '2022-12-07',
      '2023-01-04',
      '2023-02-01',
      '2023-03-01'
    ]);
  });

  it('custom recurrence scheduled on every month on specific weekday - case 3', () => {
    // Start from end of the month
    const result = getRecurrenceDates('2022-06-30', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 20,
        repeatEveryOccasion: 'MONTH',
        repeatOnEveryMonth: 'SPECIFIC_WEEKDAY'
      }
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-06-30',
      '2022-07-28',
      '2022-08-25',
      '2022-09-29',
      '2022-10-27',
      '2022-11-24',
      '2022-12-29',
      '2023-01-26',
      '2023-02-23',
      '2023-03-30'
    ]);
  });

  it('custom recurrence scheduled on every month on specific day - case 1', () => {
    // Start from beginning of the month
    const result = getRecurrenceDates('2022-01-01', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 20,
        repeatEveryOccasion: 'MONTH',
        repeatOnEveryMonth: 'SPECIFIC_DAY'
      }
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-01-01',
      '2022-02-01',
      '2022-03-01',
      '2022-04-01',
      '2022-05-01',
      '2022-06-01',
      '2022-07-01',
      '2022-08-01',
      '2022-09-01',
      '2022-10-01'
    ]);
  });

  it('custom recurrence scheduled on every month on specific day - case 2', () => {
    // Start from end of the month
    const result = getRecurrenceDates('2022-01-31', {
      scheduleType: 'CUSTOM',
      customRecurrence: {
        repeatEveryValue: 20,
        repeatEveryOccasion: 'MONTH',
        repeatOnEveryMonth: 'SPECIFIC_DAY'
      }
    });

    expect(formattedDates(result)).to.deep.equal([
      '2022-01-31',
      '2022-02-28',
      '2022-03-31',
      '2022-04-30',
      '2022-05-31',
      '2022-06-30',
      '2022-07-31',
      '2022-08-31',
      '2022-09-30',
      '2022-10-31'
    ]);
  });
});
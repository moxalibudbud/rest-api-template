import moment from 'moment-timezone';
moment.tz.setDefault(process.env.APP_TIMEZONE);
export default moment;
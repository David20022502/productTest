import {Dimensions, PixelRatio} from 'react-native';

export const CustomUtils = {
  envVars: {
    productServerHost:
      'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros', // Para manejar una ruta dinámica, o claves secretas, se puede usar las variables de entorno de expo, secrets keys,
  },
  dimensions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  colors: {
    gray: '#1f3467',
    primary: '#ffdd00',
    secondary: '#e9e9e9',
    error: '#d50707',
    transparent: 'rgba(52, 52, 52, 0.5)',
    white: 'white',
    dark: 'dark',
    disabled: '#CCCCCC',
    disabledBackGround: '#e6e6e6',
  },
  regex: {
    formatDate: /^\d{4}-\d{2}-\d{2}$/,
  },
  getPxH: function (dimension: number) {
    return PixelRatio.roundToNearestPixel(
      (Dimensions.get('window').height * dimension) / 100,
    );
  },
  getPxW: function (dimension: number) {
    return PixelRatio.roundToNearestPixel(
      (Dimensions.get('window').width * dimension) / 100,
    );
  },
  formatDate: function (date?: string) {
    return new Date(date || 0).toISOString().split('T')[0];
  },
  increaseYearsToDate: function (date: string, years: number) {
    if (!this.isValidDate(date)) return new Date().toISOString();
    const validDate = new Date(date);
    validDate.setFullYear(validDate.getFullYear() + years);
    return validDate.toISOString();
  },
  isValidDate: function (date: string) {
    if (!this.regex.formatDate.test(date)) return false;
    const [year, month, day] = date.split('-').map(item => Number(item));
    return year >= 1970 && month > 0 && month < 13 && day > 0 && day < 32;
  },
  isDateGreaterEqualThan: function (date: Date, minDate?: Date) {
    return (
      date >= (minDate || new Date(new Date().toISOString().split('T')[0]))
    );
  },
};

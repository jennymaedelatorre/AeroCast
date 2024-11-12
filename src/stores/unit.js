import { defineStore } from 'pinia';

export const useUnitsStore = defineStore('units', {
  state: () => ({
    tempUnit: 'C', 
    windSpeedUnit: 'km/h',
    pressureUnit: 'mm',
    precipitationUnit: 'mm',
    distanceUnit: 'km',
    rawTempValue: 25, 
    rawWindSpeedValue: 5, 
    rawPressureValue: 1009, 
  }),

  actions: {
    setTempUnit(unit) {
      this.tempUnit = unit;
    },
    setWindSpeedUnit(unit) {
      this.windSpeedUnit = unit;
    },
    setPressureUnit(unit) {
      this.pressureUnit = unit;
    },
    setPrecipitationUnit(unit) {
      this.precipitationUnit = unit;
    },
    setDistanceUnit(unit) {
      this.distanceUnit = unit;
    },

    // Conversion functions
    convertTemperature(value) {
      let result = value;
      if (this.tempUnit === 'F') {
        result = (value * 9/5) + 32; // Celsius to Fahrenheit
      }
      return result.toFixed(2); 
    },

    convertWindSpeed(value) {
      let result = value;
      if (this.windSpeedUnit === 'm/s') {
        result = value / 3.6; // Convert km/h to m/s
      } else if (this.windSpeedUnit === 'knots') {
        result = value * 0.53996; // Convert km/h to knots
      }
      return result.toFixed(2); 
    },

    convertPressure(value) {
      let result = value;
      if (this.pressureUnit === 'inch') {
        result = value * 0.02953; // hPa to Inches
      } else if (this.pressureUnit === 'kPa') {
        result = value / 10; // hPa to kPa
      }
      return result.toFixed(2); 
    },
    
    convertPrecipitation(value) {
      let result = value;
      if (this.precipitationUnit === 'inch') {
        result = value * 0.03937; // Millimeters to Inches
      }
      return result.toFixed(2); 
    },

    convertDistance(value) {
      let result = value;
      if (this.distanceUnit === 'miles') {
        result = value * 0.621371; // Kilometers to miles
      }
      return result.toFixed(2); 
    },
  },

  // Computed properties for conversion
  getters: {
    convertedTemp() {
      return parseFloat(this.convertTemperature(this.rawTempValue));
    },
    convertedWindSpeed() {
      return parseFloat(this.convertWindSpeed(this.rawWindSpeedValue));
    },
    convertedPressure() {
      return parseFloat(this.convertPressure(this.rawPressureValue));
    },
    convertedPrecipitation() {
      return parseFloat(this.convertPrecipitation(this.rawPrecipitationValue));
    },
    convertedDistance() {
      return parseFloat(this.convertDistance(this.rawDistanceValue));
    },
  },
});

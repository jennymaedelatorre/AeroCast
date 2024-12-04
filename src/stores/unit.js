// stores/unit.js
import { defineStore } from 'pinia';

export const useUnitsStore = defineStore('unitStore', {
  state: () => ({
    tempUnit: 'C',               // Default temperature unit
    pressureUnit: 'hPa',         // Default pressure unit
    precipitationUnit: 'mm',     // Default precipitation unit
  }),
  actions: {
    // Action to change temperature unit and save it to localStorage
    setTemperatureUnit(unit) {
      this.tempUnit = unit;
      localStorage.setItem('tempUnit', unit); // Save to localStorage
      console.log(`Temperature unit set to: ${unit}`);
    },
    setPressureUnit(unit) {
      this.pressureUnit = unit;
      localStorage.setItem('pressureUnit', unit); // Save to localStorage
      console.log(`Pressure unit set to: ${unit}`);
    },
    setPrecipitationUnit(unit) {
      this.precipitationUnit = unit;
      localStorage.setItem('precipitationUnit', unit); // Save to localStorage
      console.log(`Precipitation unit set to: ${unit}`);
    },

    // Method to load units from localStorage
    loadUnitsFromLocalStorage() {
      const savedTempUnit = localStorage.getItem('tempUnit');
      const savedWindSpeedUnit = localStorage.getItem('windSpeedUnit');
      const savedPressureUnit = localStorage.getItem('pressureUnit');
      const savedPrecipitationUnit = localStorage.getItem('precipitationUnit');

      if (savedTempUnit) this.tempUnit = savedTempUnit;
      if (savedWindSpeedUnit) this.windSpeedUnit = savedWindSpeedUnit;
      if (savedPressureUnit) this.pressureUnit = savedPressureUnit;
      if (savedPrecipitationUnit) this.precipitationUnit = savedPrecipitationUnit;
    }
  },
});

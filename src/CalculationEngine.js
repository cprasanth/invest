
class CalculationEngine {

  constructor(initialAmount, monthlyAmount, timescaleInYears) {
    this.initialAmount = initialAmount;
    this.monthlyAmount = monthlyAmount;
    this.timescaleInYears = timescaleInYears;
  }

  calculateResults = (growthRate) => {
    var result = [];
    var currentValue = this.initialAmount.toFixed(2);;
    result.push(currentValue);
    for (var month = 1; month <= this.timescaleInYears * 12; month++) {
      currentValue = currentValue * (1 + growthRate / 12);
      currentValue = currentValue + this.monthlyAmount;
      result.push(currentValue.toFixed(2));
    }
    return result;
  };

  highRiskResults = () => ({
    invested: this.calculateResults(0),
    wideBandLowerLimit: this.calculateResults(-0.01),
    wideBandUpperLimit: this.calculateResults(0.07),
    narrowBandLowerLimit: this.calculateResults(0.02),
    narrowBandUpperLimit: this.calculateResults(0.04)
  });

  mediumRiskResults = () => ({
    invested: this.calculateResults(0),
    wideBandLowerLimit: this.calculateResults(0.0),
    wideBandUpperLimit: this.calculateResults(0.05),
    narrowBandLowerLimit: this.calculateResults(0.015),
    narrowBandUpperLimit: this.calculateResults(0.03)
  });

  lowRiskResults = () => ({
    invested: this.calculateResults(0),
    wideBandLowerLimit: this.calculateResults(0.01),
    wideBandUpperLimit: this.calculateResults(0.03),
    narrowBandLowerLimit: this.calculateResults(0.015),
    narrowBandUpperLimit: this.calculateResults(0.025)
  });

  getChartData = (risk) => {
    let data = {};
    if (risk === "0") {
      data = this.lowRiskResults();
    } else if (risk === "1") {
      data = this.mediumRiskResults();
    } else {
      data = this.highRiskResults();
    }
    let formattedData = [];
    for (let i = 0, len = data.invested.length; i < len; i++) {
      let myObj = {};
      myObj.month = i;
      myObj.invested = data.invested[i];
      myObj.narrowBand = [data.narrowBandUpperLimit[i], data.narrowBandLowerLimit[i]];
      myObj.wideBand = [data.wideBandUpperLimit[i], data.wideBandLowerLimit[i]];
      formattedData.push(myObj);
    }
    return formattedData;
  };
}
export default CalculationEngine;

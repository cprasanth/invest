function CalculationEngine(initialAmount, monthlyAmount, timescaleInYears) {
  this.initialAmount = initialAmount;
  this.monthlyAmount = monthlyAmount;
  this.timescaleInYears = timescaleInYears;
}
CalculationEngine.prototype.calculateResults = function(growthRate) {
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
CalculationEngine.prototype.highRiskResults = function() {
  return {
    invested: this.calculateResults(0),
    wideBandLowerLimit: this.calculateResults(-0.01),
    wideBandUpperLimit: this.calculateResults(0.07),
    narrowBandLowerLimit: this.calculateResults(0.02),
    narrowBandUpperLimit: this.calculateResults(0.04)
  };
};
CalculationEngine.prototype.mediumRiskResults = function() {
  return {
    invested: this.calculateResults(0),
    wideBandLowerLimit: this.calculateResults(0.0),
    wideBandUpperLimit: this.calculateResults(0.05),
    narrowBandLowerLimit: this.calculateResults(0.015),
    narrowBandUpperLimit: this.calculateResults(0.03)
  };
};
CalculationEngine.prototype.lowRiskResults = function() {
  return {
    invested: this.calculateResults(0),
    wideBandLowerLimit: this.calculateResults(0.01),
    wideBandUpperLimit: this.calculateResults(0.03),
    narrowBandLowerLimit: this.calculateResults(0.015),
    narrowBandUpperLimit: this.calculateResults(0.025)
  };
};

CalculationEngine.prototype.getChartData = function(risk) {
  let data = {};
  if (risk === 0) {
    data = this.lowRiskResults();
  } else if (risk === 1) {
    data = this.mediumRiskResults();
  } else {
    data = this.highRiskResults();
  }
  let formattedData = [];
  data.invested.map((val, i) => {
    let myObj = {};
    myObj.month = i;
    myObj.invested = val;
    myObj.narrowBandUpper = data.narrowBandUpperLimit[i];
    myObj.narrowBandLower = data.narrowBandLowerLimit[i];
    myObj.wideBandLower = data.wideBandLowerLimit[i];
    myObj.wideBandUpper = data.wideBandUpperLimit[i];
    formattedData.push(myObj);
  });

  return formattedData;
};
export default CalculationEngine;

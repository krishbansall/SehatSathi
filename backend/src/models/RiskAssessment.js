const mongoose = require('mongoose');

const riskAssessmentSchema = new mongoose.Schema({
  patient:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Input data submitted by patient
  inputs: {
    age:              Number,
    gender:           String,
    bmi:              Number,
    bloodPressure:    String,
    cholesterol:      String,
    smokingStatus:    String,
    diabetesStatus:   String,
    familyHistory:    [String],
    symptoms:         [String]
  },

  // FL model output
  results: {
    overallRiskScore:  { type: Number, min: 0, max: 100 },   // percentage
    riskLevel:         { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'] },
    diseaseRisks: [{
      disease:     String,
      riskPercent: Number,
      confidence:  Number
    }],
    recommendations: [String],
    fedAvgVersion:   { type: String, default: 'v4.2' },
    modelNodes:      { type: Number, default: 3 }   // hospital FL nodes used
  },

  analyzedAt: { type: Date, default: Date.now }

}, { timestamps: true });

riskAssessmentSchema.index({ patient: 1, analyzedAt: -1 });

module.exports = mongoose.model('RiskAssessment', riskAssessmentSchema);

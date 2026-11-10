const mongoose = require('mongoose');
const { Schema } = mongoose;
const categories = ['projector', 'microphone', 'tripod'];
const equipmentSchema = new Schema(
  {
    assetCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 32,
    },
    name: { type: String, required: true, maxlength: 120 },
    category: { type: String, enum: categories, required: true },
    location: { type: String, required: true, maxlength: 120 },
    status: {
      type: String,
      enum: ['available', 'borrowed', 'maintenance'],
      default: 'available',
      required: true,
    },
    description: { type: String, default: '', maxlength: 1000 },
  },
  { timestamps: true },
);
equipmentSchema.index({ category: 1, status: 1 });
const loanSchema = new Schema(
  {
    equipmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true,
    },
    borrowerName: { type: String, required: true, maxlength: 80 },
    borrowerId: { type: String, required: true, maxlength: 40 },
    borrowedAt: { type: Date, required: true, default: Date.now },
    dueAt: { type: Date, default: null },
    returnedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ['active', 'returned'],
      default: 'active',
      required: true,
    },
    handledBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    notes: { type: String, default: '', maxlength: 1000 },
  },
  { timestamps: true },
);
loanSchema.index(
  { equipmentId: 1 },
  {
    unique: true,
    partialFilterExpression: { status: 'active' },
    name: 'one_active_loan_per_equipment',
  },
);
loanSchema.index({ borrowerId: 1, status: 1 });
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    displayName: { type: String, required: true },
  },
  { timestamps: true },
);
module.exports = {
  Equipment: mongoose.model('Equipment', equipmentSchema),
  Loan: mongoose.model('Loan', loanSchema),
  User: mongoose.model('User', userSchema),
  categories,
};

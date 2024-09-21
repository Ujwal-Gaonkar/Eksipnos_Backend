import { Schema, model, Document } from 'mongoose';

// Interface for TypeScript to define the structure of Enquiry Document
interface EnquiryDocument extends Document {
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  createdAt: Date;
}

// Define the Schema for an enquiry
const enquirySchema = new Schema<EnquiryDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the model
const Enquiry = model<EnquiryDocument>('Enquiry', enquirySchema);

export default Enquiry;

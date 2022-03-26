import {
  Schema,
  Types,
} from 'mongoose';
import db from '@src/db';

type InfoDoc = {
  proj_id: typeof Types.ObjectId,
  proj_name: string,
  event_id: typeof Types.ObjectId,
  event_type: string,
  visitor_id: string,
  detail: string,
};

const InfoSchema = new Schema<InfoDoc>({
  proj_id: {
    type: Types.ObjectId,
    required: true,
  },
  proj_name: {
    type: String,
    required: true,
  },
  event_id: {
    type: Types.ObjectId,
    required: true,
  },
  event_type: {
    type: String,
    required: true,
  },
  visitor_id: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'create_time',
    // currentTime,
  },
});

export default db.model('Info', InfoSchema);

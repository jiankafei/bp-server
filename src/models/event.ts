import {
  Schema,
  Types,
} from 'mongoose';
import db from '@src/db';

type EventPropDoc = {
  name: string,
  type: string,
  desc?: string,
};

const EventPropScheme = new Schema<EventPropDoc>({
  name: {
    type: String,
    required: true,
    readonly: true,
  },
  type: {
    type: String,
    required: true,
    readonly: true,
  },
  desc: {
    type: String,
    default: '',
  },
});

type EventDoc = {
  proj_id: typeof Types.ObjectId,
  proj_name: string,
  event_type: string,
  event_desc?: string,
  event_props?: EventPropDoc[],
};

const EventSchema = new Schema<EventDoc>({
  proj_id: {
    type: Types.ObjectId,
    required: true,
  },
  proj_name: {
    type: String,
    required: true,
  },
  event_type: {
    type: String,
    required: true,
    readonly: true,
  },
  event_desc: {
    type: String,
    default: '',
  },
  event_props: [EventPropScheme],
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time',
    // currentTime,
  },
});

// 创建唯一复合索引
EventSchema.index({ proj_id: 1, event_type: 1 }, { unique: true });

export default db.model('Event', EventSchema);

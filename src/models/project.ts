import {
  Schema,
} from 'mongoose';
import db from '@src/db';

type ProjectDoc = {
  proj_name: string,
  proj_desc?: string,
};

const ProjectSchema = new Schema<ProjectDoc>({
  proj_name: {
    type: String,
    required: true,
    unique: true,
    readonly: true,
  },
  proj_desc: {
    type: String,
    default: '',
  },
}, {
  timestamps: {
    createdAt: 'create_time',
    updatedAt: 'update_time',
    // currentTime,
  },
});

export default db.model('Project', ProjectSchema);

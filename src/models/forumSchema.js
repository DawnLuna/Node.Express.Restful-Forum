import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
    { timestamps: true }
);

export const Forum = mongoose.model('Forum', ForumSchema);

const SectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    banner: { type: String, default: '' },
    admins: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    hidden: { type: Boolean, default: false },
    threadCount: { type: Number, default: 0 },
    index: { type: Number, default: 100 }
},
    { timestamps: true }
);

export const Section = mongoose.model('Section', SectionSchema);

const ThreadSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    section: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    replyCount: { type: Number, default: 0 },
    slug: { type: String, default: '' },
},
    { timestamps: true }
);

export const Thread = mongoose.model('Thread', ThreadSchema);

const ReplySchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tid: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
    content: { type: String, default: '' }
},
    { timestamps: true }
);

export const Reply = mongoose.model('Reply', ReplySchema);
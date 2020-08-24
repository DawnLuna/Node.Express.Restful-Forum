import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    hidden: { type: Boolean, default: false },
    threadCount: { type: Number, default: 0 }
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
    slug: String
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

export const Reply = mongoose.model('Post', ReplySchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DomainSchema = new Schema ({
  name: {type: String, required: true, unique: true, trim: true},
  create_datetime: {type: String, required: true, trim: true},
  block_datetime: String,
  remove_datetime: String
}, { collection: 'domain' });

var AccountSchema = new Schema ({
  name: {type: String, required: true, trim: true},
  domain_id: {type: String, required: true, trim: true},
  is_domain_owner: {type: Boolean, default: false},
  is_domain_master: {type: Boolean, default: false},
  open_status: {type: Number, default: 0},
  post_period: String,
  profile_pic: String,
  primary_email: {type: String, required: true},
  secondary_email: String,
  mobile_phone_number: String,
  fix_phone_number: String,
  zipcode: String,
  location_address: String,
  home_address: String,
  gender: {type: Number, default: 0},
  given_name: String,
  middle_name: String,
  family_name: String,
  create_datetime: String,
  update_datetime: String,
  block_datetime: String,
  remove_datetime: String,
  login_datetime: String,
  logout_datetime: String,
}, { collection: 'account' });

AccountSchema.index({domain_id: 1, name: 1}, {unique: true});

var GroupSchema = new Schema ({
  name: {type: String, required: true, trim: true},
  creater_id: {type: String, required: true, trim: true},
  create_datetime: String,
  block_datetime: String,
  remove_datetime: String,
}, { collection: 'group' });

var MemberSchema = new Schema ({
  account_id: {type: String, required: true, trim: true},
  group_id: {type: String, required: true, trim: true},
  create_datetime: String,
  blocker_id: String,
  block_datetime: String,
  remove_datetime: String,
}, { collection: 'member' });

MemberSchema.index({account_id: 1, group_id: 1}, {unique: true});

var FollowSchema = new Schema ({
  followee_id: {type: String, required: true, trim: true},
  follower_id: {type: String, required: true, trim: true},
  create_datetime: String,
  remove_datetime: String,
}, { collection: 'follow' });

FollowSchema.index({followee_id: 1, follower_id: 1}, {unique: true});

var BlockSchema = new Schema ({
  blocker_id: {type: String, required: true, trim: true},
  blockee_id: {type: String, required: true, trim: true},
  create_datetime: String,
  remove_datetime: String,
}, { collection: 'block' });

BlockSchema.index({blocker_id: 1, blockee_id: 1}, {unique: true});

var ArticleSchema = new Schema ({
  writer_id: {type: String, required: true, trim: true},
  create_datetime: String,
  update_datetime: String,
  title: {type: String, trim: true},
  digest: {type: String, trim: true},
  content: {type: String, trim: true},
  tag: {type: String, trim: true},
  event: {type: String, trim: true},
  location_address: String,
  is_blocked: {type: Boolean, default: false},
  blocker_id: {type: String, trim: true},
  block_datetime: String,
  is_removed: {type: Boolean, default: false},
  remover_id: {type: String, trim: true},
}, { collection: 'article' });

var NoteSchema = new Schema ({
  writer_id: {type: String, required: true, trim: true},
  create_datetime: String,
  update_datetime: String,
  content: {type: String, trim: true},
  tag: {type: String, trim: true},
  event: {type: String, trim: true},
  location_address: String,
  is_blocked: {type: Boolean, default: false},
  blocker_id: {type: String, trim: true},
  block_datetime: String,
  is_removed: {type: Boolean, default: false},
  remover_id: {type: String, trim: true},
}, { collection: 'note' });

var ScheduleSchema = new Schema ({
  creater_id: {type: String, required: true, trim: true},
  create_datetime: String,
  update_datetime: String,
  title: {type: String, trim: true},
  digest: {type: String, trim: true},
  content: {type: String, trim: true},
  start_date: String,
  end_date: String,
  start_time: String,
  end_time: String,
  check_item: String,
  check_time: String,
  repeat_pattern: String,
  location_address: String,
  is_blocked: {type: Boolean, default: false},
  blocker_id: {type: String, trim: true},
  block_datetime: String,
  is_removed: {type: Boolean, default: false},
  remover_id: {type: String, trim: true},
  remove_datetime: String,
}, { collection: 'post' });

var ActorSchema = new Schema ({
  schedule_id: {type: String, required: true, trim: true},
  account_id: {type: String, required: true, trim: true},
  priority: String,
  invite_status: {type: Number, default: 0},
  is_accepted: {type: Boolean, default: false},
  is_blocked: {type: Boolean, default: false},
  blocker_id: {type: String, trim: true},
  block_datetime: String,
  is_removed: {type: Boolean, default: false},
  remover_id: {type: String, trim: true},
  remove_datetime: String,
  update_datetime: String,
}, { collection: 'post' });

var CommentSchema = new Schema ({
  parent_type: Number,
  parent_id: {type: String, trim: true},
  level: Number,
  actor_id: {type: String, required: true, trim: true},
  create_datetime: String,
  update_datetime: String,
  content: {type: String, trim: true},
  is_blocked: {type: Boolean, default: false},
  blocker_id: {type: String, trim: true},
  block_datetime: String,
  is_removed: {type: Boolean, default: false},
  remover_id: {type: String, trim: true},
  remove_datetime: String,
}, { collection: 'comment' });

var ChatSchema = new Schema ({
  speaker_id: {type: String, required: true, trim: true},
  partner_id: {type: String, required: true, trim: true},
  group_id: {type: String, required: true, trim: true},
  create_datetime: String,
  update_datetime: String,
  content: {type: String, trim: true},
  is_blocked: {type: Boolean, default: false},
  blocker_id: {type: String, trim: true},
  block_datetime: String,
  is_removed: {type: Boolean, default: false},
  remover_id: {type: String, trim: true},
  remove_datetime: String,
}, { collection: 'chat' });

module.exports = {
  domain: mongoose.model('Domain', DomainSchema);
  account: mongoose.model('Account', AccountSchema);
  group: mongoose.model('Group', GroupSchema);
  member: mongoose.model('Member', MemberSchema);
  follow: mongoose.model('Follow', FollowSchema);
  block: mongoose.model('Block', BlockSchema);
  article: mongoose.model('Article', ArticleSchema);
  note: mongoose.model('Note', NoteSchema);
  schedule: mongoose.model('Schedule', ScheduleSchema);
  actor: mongoose.model('Actor', ActorSchema);
  comment: mongoose.model('Comment', CommentSchema);
  chat: mongoose.model('Chat', ChatSchema);
}

create table bot_group_permission_change_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  type varchar(50) not null,
  origin varchar(255) null,
  current varchar(255) null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_invited_join_group_request_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  event_id int null,
  index idx_event_id (event_id),
  from_id int null,
  index idx_from_id (from_id),
  group_id int null,
  index idx_group_id (group_id),
  group_name  varchar(255),
  nick  varchar(255),
  message  varchar(255),
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_join_group_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  invitor boolean null,
  invitor_id int null,
  index idx_invitor_id (invitor_id),
  invitor_member_name varchar(255) null,
  invitor_special_title varchar(255) null,
  invitor_permission varchar(255) null,
  invitor_join_timestamp int  null,
  invitor_last_speak_timestamp int  null,
  invitor_mute_time_remaining int  null,
  invitor_group_id int null,
  index idx_invitor_group_id (invitor_group_id),
  invitor_group_name varchar(255) null,
  invitor_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_leave_event_disband (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  operator boolean null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_leave_event_kick (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  operator boolean null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_mute_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  duration_seconds int null,
  operator boolean null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_offline_event_active (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_offline_event_dropped (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  qq int null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_online_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table bot_relogin_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  qq int null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table friend_input_status_changed_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  friend_id int null,
  index idx_friend_id (friend_id),
  friend_nickname varchar null,
  friend_remark varchar null,
  inputting boolean null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table friend_message (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  sender_id int null,
  index idx_sender_id (sender_id),
  sender_nickname varchar null,
  sender_remark varchar null,
  message_chain text null,
  message_text text null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table friend_nick_changed_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  friend_id int null,
  index idx_friend_id (friend_id),
  friend_nickname varchar null,
  friend_remark varchar null,
  from varchar(255) null,
  to varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table friend_recall_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  author_id int null,
  index idx_author_id (author_id),
  message_id int null,
  index idx_message_id (message_id),
  time int null,
  operator int null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table friend_sync_message (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  subject_id int null,
  index idx_subject_id (subject_id),
  subject_nickname varchar null,
  subject_remark varchar null,
  message_chain text null,
  message_text text null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table group_allow_anonymous_chat_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  origin boolean null,
  current boolean null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table group_allow_confess_talk_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  origin boolean null,
  current boolean null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  is_by_bot boolean null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table group_message (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  sender_id int null,
  index idx_sender_id (sender_id),
  sender_nickname varchar null,
  sender_remark varchar null,
  message_chain text null,
  message_text text null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table group_mute_all_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  origin boolean null,
  current boolean null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table group_name_change_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  origin varchar(255) null,
  current varchar(255) null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table group_recall_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  author_id int null,
  index idx_author_id (author_id),
  message_id int null,
  index idx_message_id (message_id),
  time int null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table group_sync_message (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  subject_id int null,
  index idx_subject_id (subject_id),
  subject_nickname varchar null,
  subject_remark varchar null,
  message_chain text null,
  message_text text null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_card_change_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  origin varchar(255) null,
  current varchar(255) null,
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  group_permission varchar(255) null,
  member_id int null,
  index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_honor_change_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  member_id int null,
  index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  action varchar(50) null,
  honor varchar(50) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_join_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  member_id int null,
  index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  invitor boolean null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_join_request_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  event_id int null,
  index idx_event_id (event_id),
  from_id int null,
  index idx_from_id (from_id),
  group_id int null,
  index idx_group_id (group_id),
  group_name varchar(255) null,
  nick varchar(255) null,
  message varchar(255) null,
  invitor_id int null,
  index idx_invitor_id (invitor_id),
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_leave_event_kick (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  member_id int null,
  index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_leave_event_quit (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
member_id int null,
index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_mute_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  duration_seconds int null,
  operator_id int null,
  index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  member_id int null,
  index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_permission_change_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  origin varchar(255),
  current varchar(255),
  member_id int null,
  index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_special_title_change_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
 origin varchar(255),
  current varchar(255),
  member_id int null,
  index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table member_unmute_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
operator_id int null,
index idx_operator_id (operator_id),
  operator_member_name varchar(255) null,
  operator_special_title varchar(255) null,
  operator_permission varchar(255) null,
  operator_join_timestamp int  null,
  operator_last_speak_timestamp int  null,
  operator_mute_time_remaining int  null,
  operator_group_id int null,
  index idx_operator_group_id (operator_group_id),
  operator_group_name varchar(255) null,
  operator_group_permission varchar(255) null,
  member_id int null,
  index idx_member_id (member_id),
  member_member_name varchar(255) null,
  member_special_title varchar(255) null,
  member_permission varchar(255) null,
  member_join_timestamp int  null,
  member_last_speak_timestamp int  null,
  member_mute_time_remaining int  null,
  member_group_id int null,
  index idx_member_group_id (member_group_id),
  member_group_name varchar(255) null,
  member_group_permission varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table new_friend_request_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  event_id int null,
  index idx_event_id (event_id),
  from_id int null,
  index idx_from_id (from_id),
  group_id int null,
  index idx_group_id (group_id),
  nick varchar(255) null,
  message varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table nudge_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  from_id int null,
  index idx_from_id (from_id),
  subject_id int null,
  index idx_subject_id (subject_id),
  subject_kind varchar(50) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table other_client_offline_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
   client_id int null,
   index idx_client_id (client_id),
  client_platform varchar(255) null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table other_client_online_event (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  client_id int null,
  index idx_client_id (client_id),
  client_platform varchar(255) null,
  kind int null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table stranger_message (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  sender_id int null,
  index idx_sender_id (sender_id),
  sender_nickname varchar null,
  sender_remark varchar null,
  message_chain text null,
  message_text text null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table temp_message (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
sender_id int null,
index idx_sender_id (sender_id),
  sender_nickname varchar null,
  sender_remark varchar null,
  message_chain text null,
  message_text text null,
  index idx_uuid (uuid),
  index idx_timestamp (timestamp)
);

create table temp_sync_message (
  id int primary key,
  uuid varchar(255) not null unique,
  date datetime not null,
  timestamp int not null,
  subject_id int null,
  index idx_subject_id (subject_id),
  subject_member_name varchar(255) null,
  subject_special_title varchar(255) null,
  subject_permission varchar(255) null,
  subject_join_timestamp int  null,
  subject_last_speak_timestamp int  null,
  subject_mute_time_remaining int  null,
  subject_group_id int null,
  index idx_subject_group_id (subject_group_id),
  subject_group_name varchar(255) null,
  subject_group_permission varchar(255) null
  message_chain text null,
  message_text text null
)
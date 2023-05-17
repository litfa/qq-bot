import inquirer from 'inquirer'
import { query } from '../../src/utils/db'

const sqls = [
  `
  create table bot_group_permission_change_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    origin varchar(255) null,
    current varchar(255) null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_invited_join_group_request_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    event_id bigint null,
    index idx_event_id (event_id),
    from_id bigint null,
    index idx_from_id (from_id),
    group_id bigint null,
    index idx_group_id (group_id),
    group_name varchar(255),
    nick varchar(255),
    message varchar(255),
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_join_group_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    invitor boolean null,
    invitor__id bigint null,
    index idx_invitor__id (invitor__id),
    invitor__member_name varchar(255) null,
    invitor__special_title varchar(255) null,
    invitor__permission varchar(255) null,
    invitor__join_timestamp bigint null,
    invitor__last_speak_timestamp bigint null,
    invitor__mute_time_remaining int null,
    invitor__group__id bigint null,
    index idx_invitor__group__id (invitor__group__id),
    invitor__group__name varchar(255) null,
    invitor__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_leave_event_disband (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    operator boolean null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_leave_event_kick (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    operator boolean null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_mute_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    duration_seconds int null,
    operator boolean null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_offline_event_active (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    qq bigint null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_offline_event_dropped (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    qq bigint null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_online_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    qq bigint null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table bot_relogin_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    qq bigint null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table friend_input_status_changed_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    friend__id bigint null,
    index idx_friend__id (friend__id),
    friend__nickname varchar(255) null,
    friend__remark varchar(255) null,
    inputting boolean null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table friend_message (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    sender__id bigint null,
    index idx_sender__id (sender__id),
    sender__nickname varchar(255) null,
    sender__remark varchar(255) null,
    message_chain text null,
    message_text text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table friend_nick_changed_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    friend__id bigint null,
    index idx_friend__id (friend__id),
    friend__nickname varchar(255) null,
    friend__remark varchar(255) null,
    \`from\` varchar(255) null,
    \`to\` varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table friend_recall_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    author_id bigint null,
    index idx_author_id (author_id),
    message_id bigint null,
    index idx_message_id (message_id),
    time int null,
    operator bigint null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table friend_sync_message (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    subject__id bigint null,
    index idx_subject__id (subject__id),
    subject__nickname varchar(255) null,
    subject__remark varchar(255) null,
    message_chain text null,
    message_text text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table group_allow_anonymous_chat_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    origin boolean null,
    current boolean null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table group_allow_confess_talk_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    origin boolean null,
    current boolean null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    is_by_bot boolean null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table group_message (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    sender__id bigint null,
    index idx_sender__id (sender__id),
    sender__member_name  varchar(255) null,
    sender__special_title  varchar(255) null,
    sender__permission  varchar(255) null,
    sender__join_timestamp  bigint null,
    sender__last_speak_timestamp  bigint null,
    sender__mute_time_remaining  int null,
    sender__group__id  int null,
    index idx_sender__group__id (sender__group__id),
    sender__group__name varchar(255) null,
    sender__group__permission varchar(255) null,
    message_chain text null,
    message_text text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table group_mute_all_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    origin boolean null,
    current boolean null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table group_name_change_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    origin varchar(255) null,
    current varchar(255) null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table group_recall_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    author_id bigint null,
    index idx_author_id (author_id),
    message_id bigint null,
    index idx_message_id (message_id),
    time int null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table group_sync_message (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    subject__id bigint null,
    index idx_subject__id (subject__id),
    subject__name varchar(255) null,
    subject__permission varchar(255) null,
    message_chain text null,
    message_text text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_card_change_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    origin varchar(255) null,
    current varchar(255) null,
    group__id bigint null,
    index idx_group__id (group__id),
    group__name varchar(255) null,
    group__permission varchar(255) null,
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_honor_change_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    action varchar(50) null,
    honor varchar(50) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_join_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    invitor boolean null,
    invitor__id bigint null,
    index idx_invitor__id (invitor__id),
    invitor__member_name varchar(255) null,
    invitor__special_title varchar(255) null,
    invitor__permission varchar(255) null,
    invitor__join_timestamp bigint null,
    invitor__last_speak_timestamp bigint null,
    invitor__mute_time_remaining int null,
    invitor__group__id bigint null,
    index idx_invitor__group__id (invitor__group__id),
    invitor__group__name varchar(255) null,
    invitor__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_join_request_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    event_id bigint null,
    index idx_event_id (event_id),
    from_id bigint null,
    index idx_from_id (from_id),
    group_id bigint null,
    index idx_group_id (group_id),
    group_name varchar(255) null,
    nick varchar(255) null,
    message varchar(255) null,
    invitor_id bigint null,
    index idx_invitor_id (invitor_id),
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_leave_event_kick (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_leave_event_quit (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_mute_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    duration_seconds int null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_permission_change_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    origin varchar(255),
    current varchar(255),
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_special_title_change_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    origin varchar(255),
    current varchar(255),
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table member_unmute_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    operator__id bigint null,
    index idx_operator__id (operator__id),
    operator__member_name varchar(255) null,
    operator__special_title varchar(255) null,
    operator__permission varchar(255) null,
    operator__join_timestamp bigint null,
    operator__last_speak_timestamp bigint null,
    operator__mute_time_remaining int null,
    operator__group__id bigint null,
    index idx_operator__group__id (operator__group__id),
    operator__group__name varchar(255) null,
    operator__group__permission varchar(255) null,
    member__id bigint null,
    index idx_member__id (member__id),
    member__member_name varchar(255) null,
    member__special_title varchar(255) null,
    member__permission varchar(255) null,
    member__join_timestamp bigint null,
    member__last_speak_timestamp bigint null,
    member__mute_time_remaining int null,
    member__group__id bigint null,
    index idx_member__group__id (member__group__id),
    member__group__name varchar(255) null,
    member__group__permission varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table new_friend_request_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    event_id bigint null,
    index idx_event_id (event_id),
    from_id bigint null,
    index idx_from_id (from_id),
    group_id bigint null,
    index idx_group_id (group_id),
    nick varchar(255) null,
    message varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table nudge_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    from_id bigint null,
    index idx_from_id (from_id),
    subject__id bigint null,
    index idx_subject__id (subject__id),
    subject__kind varchar(50) null,
    action varchar(100) null,
    suffix varchar(100) null,
    target bigint null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table other_client_offline_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    client__id bigint null,
    index idx_client__id (client__id),
    client__platform varchar(255) null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table other_client_online_event (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    client__id bigint null,
    index idx_client__id (client__id),
    client__platform varchar(255) null,
    kind int null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table stranger_message (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    sender__id bigint null,
    index idx_sender__id (sender__id),
    sender__nickname varchar(255) null,
    sender__remark varchar(255) null,
    message_chain text null,
    message_text text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table temp_message (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    sender__id bigint null,
    index idx_sender__id (sender__id),
    sender__member_name  varchar(255) null,
    sender__special_title  varchar(255) null,
    sender__permission  varchar(255) null,
    sender__join_timestamp  bigint null,
    sender__last_speak_timestamp  bigint null,
    sender__mute_time_remaining  int null,
    sender__group__id  int null,
    index idx_sender__group__id (sender__group__id),
    sender__group__name varchar(255) null,
    sender__group__permission varchar(255) null,
    message_chain text null,
    message_text text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table temp_sync_message (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    subject__id bigint null,
    index idx_subject__id (subject__id),
    subject__member_name varchar(255) null,
    subject__special_title varchar(255) null,
    subject__permission varchar(255) null,
    subject__join_timestamp bigint null,
    subject__last_speak_timestamp bigint null,
    subject__mute_time_remaining int null,
    subject__group__id bigint null,
    index idx_subject__group__id (subject__group__id),
    subject__group__name varchar(255) null,
    subject__group__permission varchar(255) null,
    message_chain text null,
    message_text text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );
  
  `,
  `
  create table messages (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    type varchar(100) not null,
    sender_id bigint null,
    sender_nickname varchar(100) null,
    sender_remark varchar(100) null,
    sender_member_name varchar(100) null,
    sender_special_title varchar(100) null,
    sender_permission varchar(100) null,
    sender_join_timestamp bigint null,
    sender_last_speak_timestamp bigint null,
    sender_mute_time_remaining int null,
    sender_group_id bigint null,
    sender_group_name varchar(100) null,
    sender_group_permission varchar(100) null,
    message_chain text null,
    message_text text null,
    qq bigint null,
    inputting tinyint(1) null,
    friend_id bigint null,
    friend_nickname varchar(100) null,
    friend_remark varchar(100) null,
    \`from\` varchar(100) null,
    \`to\` varchar(100) null,
    origin varchar(100) null,
    current varchar(100) null,
    group_id bigint null,
    group_name varchar(100) null,
    group_permission varchar(100) null,
    duration_seconds int null,
    operator int null,
    operator_member_name varchar(100) null,
    operator_permission varchar(100) null,
    operator_special_title varchar(100) null,
    operator_join_timestamp bigint null,
    operator_last_speak_timestamp bigint null,
    operator_mute_time_remaining int null,
    operator_group_id bigint null,
    operator_group_name varchar(100) null,
    operator_group_permission varchar(100) null,
    invitor_id bigint null,
    invitor_member_name varchar(100) null,
    invitor_permission varchar(100) null,
    invitor_special_title varchar(100) null,
    invitor_join_timestamp bigint null,
    invitor_last_speak_timestamp bigint null,
    invitor_mute_time_remaining int null,
    invitor_group_id bigint null,
    invitor_group_name varchar(100) null,
    invitor_group_permission varchar(100) null,
    author_id bigint null,
    message_id bigint null,
    time int null,
    from_id bigint null,
    subject_id bigint null,
    subject_kind varchar(100) null,
    subject_nickname varchar(100) null,
    subject_remark varchar(100) null,
    subject_name varchar(100) null,
    subject_permission varchar(100) null,
    subject_member_name varchar(100) null,
    subject_special_title varchar(100) null,
    subject_join_timestamp bigint null,
    subject_last_speak_timestamp bigint null,
    subject_mute_time_remaining int null,
    subject_group_id bigint null,
    subject_group_name varchar(100) null,
    subject_group_permission varchar(100) null,
    action varchar(100) null,
    suffix varchar(100) null,
    target int null,
    is_by_bot tinyint(1) null,
    member_id bigint null,
    member_member_name varchar(100) null,
    member_permission varchar(100) null,
    member_special_title varchar(100) null,
    member_join_timestamp bigint null,
    member_last_speak_timestamp bigint null,
    member_mute_time_remaining int null,
    member_group_id bigint null,
    member_group_name varchar(100) null,
    member_group_permission varchar(100) null,
    honor varchar(100) null,
    event_id bigint null,
    group__id bigint null,
    nick varchar(100) null,
    message varchar(100) null,
    client_id bigint null,
    client_platform varchar(100) null,
    kind int null,
    name varchar(100) null,
    args text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp),
    index idx_sender_id (sender_id),
    index idx_sender_group_id (sender_group_id),
    index idx_friend_id (friend_id),
    index idx_group_id (group_id),
    index idx_operator_group_id (operator_group_id),
    index idx_invitor_id (invitor_id),
    index idx_invitor_group_id (invitor_group_id),
    index idx_author_id (author_id),
    index idx_message_id (message_id),
    index idx_from_id (from_id),
    index idx_subject_id (subject_id),
    index idx_subject_group_id (subject_group_id),
    index idx_member_id (member_id),
    index idx_member_group_id (member_group_id),
    index idx_event_id (event_id),
    index idx_group__id (group__id),
    index idx_client_id (client_id)
  );
  
  `,
  `
  create table message_text (
    id int auto_increment primary key,
    uuid varchar(255) not null unique,
    date datetime not null,
    timestamp bigint not null,
    text text null,
    index idx_uuid (uuid),
    index idx_timestamp (timestamp)
  );`
]

export const createTable = async () => {
  {
    const { confirm } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      default: false,
      message:
        '即将升级 数据库备份 工具版本，新版与旧版不兼容，需要新建数据库，请确认已经备份，并建立新的数据库，并吧配置文件中的 database 修改为新的数据库!'
    })

    if (!confirm) {
      console.log('取消')
      return process.exit()
    }
  }

  {
    const { confirm } = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      default: false,
      message:
        '即将开始新建表，请确认已经备份,并已将配置文件中的 database 修改为新的数据库!'
    })

    if (!confirm) {
      console.log('取消')
      return process.exit()
    }
  }
  let errs = 0
  for (let i in sqls) {
    console.log(`正在执行第${Number(i) + 1}/${sqls.length}`)
    const [err, res] = await query(sqls[i])
    if (err) {
      errs++
      console.log('失败 请尝试手动执行', err, sqls[i])
    }
    console.log(res)
  }
  if (errs == 0) {
    console.log('执行成功，可重新执行 yarn update:sqlv2 选择转移数据来迁移数据')
  } else {
    console.log(`执行失败，失败${errs}个，请尝试手动执行`)
  }
}

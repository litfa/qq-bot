# 所有数据:
- type
- qq
- inputting
- friend_id
- friend_nickname
- friend_remark
- from
- to
- origin
- current
- group_id
- group_name
- group_permission
- durationSeconds
- operator
- operator_memberName
- operator_permission
- operator_specialTitle
- operator_joinTimestamp
- operator_lastSpeakTimestamp
- operator_muteTimeRemaining
- operator_group_id
- operator_group_name
- operator_group_permission
- invitor_id
- invitor_memberName
- invitor_permission
- invitor_specialTitle
- invitor_joinTimestamp
- invitor_lastSpeakTimestamp
- invitor_muteTimeRemaining
- invitor_group_id
- invitor_group_name
- invitor_group_permission
- authorId
- messageId
- time
- fromId
- subject_id
- subject_kind
- action
- suffix
- target
- isByBot
- member_id
- member_memberName
- member_permission
- member_specialTitle
- member_joinTimestamp
- member_lastSpeakTimestamp
- member_muteTimeRemaining
- member_group_id
- member_group_name
- member_group_permission
- honor
- eventId
- groupId
- nick
- message
- client_id
- client_platform
- kind
- name
- args
- sender_id
- sender_memberName
- sender_permission
- sender_specialTitle
- sender_joinTimestamp
- sender_lastSpeakTimestamp
- sender_muteTimeRemaining
- sender_group_id
- sender_group_name
- sender_group_permission
- sender_nickname
- sender_remark
- messageChain

# 升级
``` sql
alter table messages
  modify	id	int	auto_increment,
  add	uuid	varchar(50)	not null,
  modify	date	datetime	not null,
  modify	type	varchar(100)	not null,
  add	qq	long	null,
  add	inputting	boolean	null,
  add	friend_id	long	null,
  add	friend_nickname	varchar(100)	null,
  add	friend_remark	varchar(100)	null,
  add	'from'	varchar(100)	null,
  add	'to'	varchar(100)	null,
  add	origin	varchar(100)	null,
  add	current	varchar(100)	null,
  add	group_id	long	null,
  add	group_name	varchar(100)	null,
  add	group_permission	varchar(100)	null,
  add	duration_seconds	int	null,
  add	operator	long	null,
  add	operator_member_name	varchar(100)	null,
  add	operator_permission	varchar(100)	null,
  add	operator_special_title	varchar(100)	null,
  add	operator_join_timestamp	int	null,
  add	operator_last_speak_timestamp	int	null,
  add	operator_mute_time_remaining	int	null,
  add	operator_group_id	long	null,
  add	operator_group_name	varchar(100)	null,
  add	operator_group_permission	varchar(100)	null,
  add	invitor_id	long	null,
  add	invitor_member_name	varchar(100)	null,
  add	invitor_permission	varchar(100)	null,
  add	invitor_special_title	varchar(100)	null,
  add	invitor_join_timestamp	int	null,
  add	invitor_last_speak_timestamp	int	null,
  add	invitor_mute_time_remaining	int	null,
  add	invitor_group_id	long	null,
  add	invitor_group_name	varchar(100)	null,
  add	invitor_group_permission	varchar(100)	null,
  add	author_id	long	null,
  add	message_id	long	null,
  add	time	int	null,
  add	from_id	long	null,
  add	subject_id	long	null,
  add	subject_kind	varchar(100)	null,
  add	action	varchar(100)	null,
  add	suffix	varchar(100)	null,
  add	target	long	null,
  add	is_by_bot	boolean	null,
  add	member_id	long	null,
  add	member_member_name	varchar(100)	null,
  add	member_permission	varchar(100)	null,
  add	member_special_title	varchar(100)	null,
  add	member_join_timestamp	int	null,
  add	member_last_speak_timestamp	int	null,
  add	member_mute_time_remaining	int	null,
  add	member_group_id	long	null,
  add	member_group_name	varchar(100)	null,
  add	member_group_permission	varchar(100)	null,
  add	honor	varchar(100)	null,
  add	event_id	long	null,
  add	group__id	long	null,
  add	nick	varchar(100)	null,
  add	message	varchar(100)	null,
  add	client_id	int	null,
  add	client_platform	varchar(100)	null,
  add	kind	int	null,
  add	name	varchar(100)	null,
  add	args	text	null,
  modify	sender_id	long	null,
  modify	sender_member_name	varchar(100)	null,
  modify	sender_permission	varchar(100)	null,
  modify	sender_special_title	varchar(100)	null,
  modify	sender_join_timestamp	int	null,
  modify	sender_last_speak_timestamp	int	null,
  modify	sender_mute_time_remaining	int	null,
  modify	sender_group_id	long	null,
  modify	sender_group_name	varchar(100)	null,
  modify	sender_group_permission	varchar(100)	null,
  modify	sender_nickname	varchar(100)	null,
  modify	sender_remark	varchar(100)	null,
  modify	message_chain	text	null;
alter table message_text
    add uuid varchar(50) null after date;
```
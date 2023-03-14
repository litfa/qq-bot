import inquirer from 'inquirer'
import { query } from '../src/utils/db'

const sql = [
  `alter table message_text
add uuid varchar(50) null unique after date,
  modify	id	int(11)	auto_increment unique;
`,
  `alter table messages
modify	id	int	auto_increment unique,
add	uuid	varchar(50)	not null,
modify	date	datetime	not null,
modify	type	varchar(100)	not null,
add	qq	long	null,
add	inputting	boolean	null,
add	friend_id	long	null,
add	friend_nickname	varchar(100)	null,
add	friend_remark	varchar(100)	null,
add	\`from\`	varchar(100)	null,
add	\`to\`	varchar(100)	null,
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
add	operator_join_timestamp	varchar(100)	null,
add	operator_last_speak_timestamp	varchar(100)	null,
add	operator_mute_time_remaining	int	null,
add	operator_group_id	long	null,
add	operator_group_name	varchar(100)	null,
add	operator_group_permission	varchar(100)	null,
add	invitor_id	long	null,
add	invitor_member_name	varchar(100)	null,
add	invitor_permission	varchar(100)	null,
add	invitor_special_title	varchar(100)	null,
add	invitor_join_timestamp	varchar(100)	null,
add	invitor_last_speak_timestamp	varchar(100)	null,
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
add subject_nickname varchar(100) null,
add subject_remark varchar(100) null,
add subject_name varchar(100) null,
add subject_permission varchar(100) null,
add subject_member_name varchar(100) null,
add subject_special_title varchar(100) null,
add subject_join_timestamp varchar(100) null,
add subject_last_speak_timestamp varchar(100) null,
add subject_mute_time_remaining int null,
add subject_group_id long null,
add subject_group_name varchar(100) null,
add subject_group_permission varchar(100) null,
add	action	varchar(100)	null,
add	suffix	varchar(100)	null,
add	target	long	null,
add	is_by_bot	boolean	null,
add	member_id	long	null,
add	member_member_name	varchar(100)	null,
add	member_permission	varchar(100)	null,
add	member_special_title	varchar(100)	null,
add	member_join_timestamp	varchar(100)	null,
add	member_last_speak_timestamp	varchar(100)	null,
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
modify	sender_join_timestamp	varchar(100)	null,
modify	sender_last_speak_timestamp	varchar(100)	null,
modify	sender_mute_time_remaining	int	null,
modify	sender_group_id	long	null,
modify	sender_group_name	varchar(100)	null,
modify	sender_group_permission	varchar(100)	null,
modify	sender_nickname	varchar(100)	null,
modify	sender_remark	varchar(100)	null,
modify	message_chain	text	null;`
]

;(async () => {
  const { confirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    default: false,
    message:
      '即将修改数据库中的数据类型，升级后无法回退为旧版本，请确认已经备份！'
  })

  if (!confirm) {
    console.log('取消')
    return process.exit()
  }
  let errs = 0
  for (let i in sql) {
    console.log(`执行第 ${Number(i) + 1}/${sql.length} 个`)
    const [err, res] = await query(sql[i])
    if (err) {
      errs += 1
    }
    console.log(err)
    console.log(res)
  }
  if (errs >= 1) {
    console.log('失败 请尝试手动执行')
  } else {
    console.log('升级成功')
  }

  return process.exit()
})()

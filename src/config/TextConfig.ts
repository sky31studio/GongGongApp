
export enum ContentType {
    Text = 0,
    Image = 1,
}

export interface Content {
    title: string,
    content: {type: number, text: string[], extra?: string[]}[]
}

export class TextConfig {

    static aboutUs: Content[] = [
        {
            title: '',
            content: [
                {
                    type: 0,
                    text: ['这里是三翼工作室—产品中心。产品中心由技术部、产品经理组、设计部、产品运营部四个部门组成。作为一个完整的中心' +
                        '，四个部门携手致力于完成三翼工作室旗下各类互联网产品的研发与维护；作为四个具有不同工作性质的部门，每一个部门与部门' +
                        '中的人员都在尽力做好自己的本职工作。产品中心，卷起三翼的思维风暴。'],
                },
            ]
        }
    ]

    static specs: Content[] = [
        {
            title: '',
            content: [
                {
                    type: 0,
                    text: ['**Eatest**与**Upick**可能采取下架违规内容、断开违规内容链接、暂停违规用户帐号功能等方式，对以下违法、不良信息或存在危害的行为进行处理。'],
                },
            ]
        },
        {
            title: '1. 违反法律法规的信息',
            content: [
                {
                    type: 0,
                    text: ['（1）反对宪法所确定的基本原则\n' +
                    '（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一，损害国家荣誉和利益\n' +
                    '（3）侮辱、滥用英烈形象，歪曲、丑化、亵渎、否定英雄烈士事迹和精神，以侮辱、诽谤或者其他方式侵害英雄烈士的姓名、肖像、名誉、荣誉\n' +
                    '（4）宣扬恐怖主义、极端主义或者煽动实施恐怖活动、极端主义活动\n' +
                    '（5）煽动民族仇恨、民族歧视，破坏民族团结 \n' +
                    '（6）破坏国家宗教政策，宣扬邪教和封建迷信\n' +
                    '（7）散布谣言，扰乱社会秩序，破坏社会稳定\n' +
                    '（8）宣扬淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪\n' +
                    '（9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序\n' +
                    '（10）侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益\n' +
                    '（11）含有法律、行政法规禁止的其他内容\n'],
                },
            ]
        },
        {
            title: '2. 不友善、不尊重拱拱用户及其所贡献内容的信息或行为',
            content: [
                {
                    type: 0,
                    text: ['（1）轻蔑：贬低、轻视他人及其劳动成果\n' +
                    '（2）诽谤：捏造、散布虚假事实，损害他人名誉\n' +
                    '（3）嘲讽：以比喻、夸张、侮辱性的手法对他人或其行为进行揭露或描述，以此来激怒他人\n' +
                    '（4）挑衅：以不友好的方式激怒他人，意图使对方对自己的言论作出回应，蓄意制造事端\n' +
                    '（5）羞辱：贬低他人的能力、行为、生理或身份特征，让对方难堪\n' +
                    '（6）谩骂：以不文明的语言对他人进行负面评价\n' +
                    '（7）歧视：煽动人群歧视、地域歧视等，针对他人的民族、种族、宗教、性取向、性别、年龄、地域、生理特征等身份或者归类的攻击\n' +
                    '（8）威胁：许诺以不良的后果来迫使他人服从自己的意志\n' +
                    '（9）盗用：未经发布者本人同意，将发布者原创、自制的发布内容进行二次编辑、复制重做，并将复制后的、二次修改过的发布内容标注为原创。\n'],
                },
            ]
        },
        {
            title: '3. 发布垃圾广告信息',
            content: [
                {
                    type: 0,
                    text: ['（1）多次发布包含售卖产品、提供服务、宣传推广内容的垃圾广告。包括但不限于以下几种形式：\n' +
                    'A. 单个帐号多次发布包含垃圾广告的内容\n' +
                    'B. 多个广告帐号互相配合发布、传播包含垃圾广告的内容\n' +
                    'C. 多次发布包含欺骗性外链的内容，如未注明的淘宝客链接、跳转网站等，诱骗用户点击链接\n' +
                    'D. 发布大量包含 SEO 推广链接、产品、品牌等内容获取搜索引擎中的不正当曝光\n' +
                    '（2）购买或出售帐号之间虚假地互动，发布干扰社区秩序的推广内容及相关交易。包括但不限于以下几种形式：\n' +
                    'A. 购买机器注册帐号，或人工操控帐号的关注，伪造在社区内的影响力\n' +
                    'B. 购买机器注册帐号，或人工操控帐号点击赞同，谋求回答的不正当曝光\n' +
                    'C. 使用机器、恶意程序手段或人为有组织性地操控帐号进行点赞、回答等扰乱秩序的行为\n' +
                    '（3）使用严重影响用户体验的违规手段进行恶意营销。包括但不限于以下几种形式：\n' +
                    'A. 不规范转载或大篇幅转载他人内容同时加入推广营销内容\n' +
                    'B. 发布包含欺骗性的恶意营销内容，如通过伪造经历、冒充他人等方式进行恶意营销\n' +
                    'C. 使用特殊符号、图片等方式规避垃圾广告内容审核的广告内容。\n'],
                },
            ]
        },
        {
            title: '4. 恶意行为',
            content: [
                {
                    type: 0,
                    text: ['（1）恶意编辑，指清空或删除有效内容，添加无关信息，破坏内容结构等降低公共编辑内容质量的编辑\n' +
                    '（2）干扰正常用户体验的内容。包括但不限于以下几种形式：\n' +
                    'A. 在不同的发布下重复回复相同或近似内容\n' +
                    'B. 频繁发布难以辨识涵义影响阅读体验的字符、数字等无意义乱码\n' +
                    'C. 骚扰他人，以评论、@ 他人、私信等方式对他人反复发送重复或者相似的诉求\n' +
                    'D. 诱导投票或关注，如通过点赞抽奖、集赞更新等形式诱导投票或者诱导关注\n' +
                    'E. 制作及传播外挂或者用于操作帐号功能的恶意程序或相关教程\n' +
                    'F. 发布含有潜在危险的内容，如钓鱼网站、木马、病毒网站等\n' +
                    'G. 不当利用产品功能，通过不正常的赞同、反对，或与其他用户抱团点赞干扰内容排序\n'],
                },
            ]
        },
        {
            title: '5. 色情低俗信息\n',
            content: [
                {
                    type: 0,
                    text: ['（1）包含自己或他人性经验的细节描述或露骨的感受描述\n' +
                    '（2）涉及色情段子、两性笑话的低俗内容\n' +
                    '（3）配图、头图中包含庸俗或挑逗性图片的内容\n' +
                    '（4）带有性暗示、性挑逗等易使人产生性联想\n' +
                    '（4）展现血腥、惊悚、残忍等致人身心不适\n' +
                    '（5）炒作绯闻、丑闻、劣迹等\n' +
                    '（6）宣扬低俗、庸俗、媚俗内容\n'],
                },
            ]
        },
        {
            title: '6. 不实信息',
            content: [
                {
                    type: 0,
                    text: ['（1）可能存在事实性错误或者造谣等内容\n' +
                    '（2）存在事实夸大、伪造虚假经历等误导他人的内容\n' +
                    '（3）伪造身份、冒充他人，通过头像、用户名等个人信息暗示自己具有特定身份，或与特定机构或个人存在关联\n'],
                },
            ]
        },
        {
            title: '7. 文章标题党',
            content: [
                {
                    type: 0,
                    text: ['（1）以各种夸张、猎奇、不合常理的表现手法等行为来诱导用户\n' +
                    '（2）内容与标题之间存在严重不实或者原意扭曲\n' +
                    '（3）使用夸张标题，内容与标题严重不符的\n'],
                },
            ]
        },
        {
            title: '违规处罚',
            content: [
                {
                    type: 0,
                    text: ['1.当某位用户发布违规内容时，审核方将依据相关用户违规情  节严重程度，对帐号进行禁言 1 天、7 天、15 天甚至永' +
                    '久禁言的处罚。对于使用时间较长，并取得一定社区成就的用户，审核方将视违规情节严重程度，酌情从轻或减轻处罚。当通过作弊手段' +
                    '注册、使用帐号，或滥用多个帐号发布违规内容时，将加重处罚。\n\n' +
                    '2.审核方通过设置敏感词进行自动管理，如用户发布内容涉及到相关敏感词，审核方将对账号进行1天、7天、15天甚至永久禁言的处罚。\n\n' +
                    '3.如果用户对于自己被封禁的内容提出质疑，请联系QQ2954301659进行查询。审核方将根据用户的申诉进行反馈。'],
                },
            ]
        },
    ]

    static userAgreement: Content[] = [
        {
            title: '',
            content: [
                {
                    type: 0,
                    text: ['感谢你选择并注册使用**拱拱3.0**，在此提醒您在注册成为“拱拱3.0”用户之前，请认真阅读**《拱拱3.0用户服务协议》**' +
                    '（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，' +
                    '否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。\n'],
                }
            ]
        },
        {
            title: '一、协议条款的确认及接受',
            content: [
                {
                    type: 0,
                    text: ['2.1拱拱（包括拱拱所属网址，以及在IOS系统及Android系统中运行的名为“拱拱”）由共青团湘潭大学委员会三翼工作室运营并享有完全的的所' +
                    '有权及知识产权等权益，拱拱提供的服务将完全按照其发布的条款和操作规则严格执行。\n' +
                    '2.2您确认同意本协议及拱拱已公示或将来公示的各项规则及提示，所有的前述协议、规则及提示乃不可分割的整体，同等具有法律效力，本协议在您与共青团' +
                    '湘潭大学委员会三翼工作室间成立并发生法律效力，同时您成为拱拱正式用户。\n' +
                    '2.3“拱拱”有权根据需要不时地制定、修改本协议或各类规则，如本协议有任何变更，会刊载公告，用户需及时关注并注意遵守该等规则。如果不同意对本服务条' +
                    '款所做的修改，有权停止用户使用拱拱所提供服务。\n' +
                    '2.4 用户申请注册即视为同意本协议，请用户务必审慎阅读、充分理解各条款内容。阅读本协议的过程中，如果用户不同意本协议或其中任何条款约定，用户' +
                    '应立即停止注册登录。如有任何疑问，可向平台工作人员进行咨询。无论用户事实上是否在注册之前认真阅读了本服务协议，只要用户选择同意本协议并按照注' +
                    '册程序成功注册为用户，用户的行为仍然表示其同意并签署了本服务协议。\n' +
                    '2.5 用户登录或继续使用“服务”将表示用户接受经修订的协议或规则。除另行明确声明外，任何使“服务”范围扩大或功能增强的新内容均受本协议约束。\n'],
                }
            ]
        },
        {
            title: '二、账号注册及使用规则',
            content: [
                {
                    type: 0,
                    text: ['3.1拱拱登录注册的账号密码为您在湘潭大学教务系统端的账号及密码，该账号及密码由您本人负责保管，您应当对其用户账号进行的所有活动和事件负法律责任。\n' +
                    '3.2您须对在拱拱的个人信息的真实性、合法性、有效性承担全部责任，您不得冒充他人，利用他人的名义发布任何信息，拱拱转载的文字、图片等资料均由用户提供，其真实' +
                    '性、准确性和合法性由信息发布人负责，拱拱不提供任何保证，并不承担任何法律责任。\n' +
                    '3.3用户不得利用拱拱账号或本服务制作、上传、复制、发布、传播下干扰拱拱正常运营，以及侵犯其用户或第三方合法权益的内容：\n' +
                    '（1）反对宪法所确认的基本原则的；\n' +
                    '（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；\n' +
                    '（3）损害国家荣誉和利益的；\n' +
                    '（4）煽动民族仇恨、民族歧视、破坏民族团结的；\n' +
                    '（5）破坏国家宗教政策，宣传也叫和封建迷信的；\n' +
                    '（6）散步谣言，扰乱社会秩序，破坏社会稳定的；\n' +
                    '（7）散步淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；\n' +
                    '（8）侮辱或者诽谤他人、侵害他人合法权益的；\n' +
                    '（9）含有法律、行政法规禁止的其他内容的信息。\n' +
                    '3.4拱拱有权对您使用拱拱的情况进行审查和监督，如您在使用拱拱时违反上述规定，拱拱或其授权的人有权要求您改正或直接采取一切必要的措施' +
                    '（包括但不限于更改或删除您张贴的内容、暂停或终止您使用拱拱的权利）以减轻您造成的不当行为造成的影响。\n'],
                }
            ]
        },
        {
            title: '三、免责声明',
            content: [
                {
                    type: 0,
                    text: ['4.1您将照片、个人信息等资料内容发布在拱拱上，有可能会被其他组织或个人复制、转载、擅改或做其他非法用途，用户必须充分意识到此类的' +
                    '风险存在。您明确同意其使用拱拱服务存在的风险完全由您自己承担；因您使用拱拱的一切后果也有您自己承担，拱拱对此不承担任何责任。\n' +
                    '4.2拱拱不担保本网站服务一定能满足您的需求，也不担保本网站服务不会中断，对本网站服务的及时性、安全性、准确性、真实性、完整性也都不作担保，' +
                    '在内容服务方面如有与湘潭大学教务系统有偏差的，请与湘潭大学教务系统端为准。\n' +
                    '4.3因不可抗力或拱拱所不能控制的原因造成本网站服务中断或其他缺陷，拱拱不承担任何责任。\n' +
                    '4.4拱拱作为共青团湘潭大学委员会三翼工作室学生自主研发的网络服务产品，对非法转载，虚拟发布，盗版行为的发生不具备充分' +
                    '的监控能力，拱拱对他人在网站上实施的此类侵权行为不承担法律责任，侵权的法律责任由本人承担。'],
                }
            ]
        },
    ]

    static PrivacyPolicy: Content[] = [
        {
            title: '',
            content: [
                {
                    type: 0,
                    text: ['欢迎使用**拱拱app**，在使用拱拱app前，为了确保您的个人信息安全，请您仔细阅读**《拱拱3.0隐私条款》**(以下简称《隐私条款》)\n' +
                    '请您在登录前详细阅读并了解《隐私条款》，当您登录拱拱app时就默认您同意了《隐私条款》即表示同意我们按照《隐私条款》处理您的相关信息。']
                }
            ]
        },
        {
            title: '一、如何收集信息',
            content: [
                {
                    type: 0,
                    text: ['我们收集您的信息是为了给您和其他用户提供更满意的服务，我们会遵循正当、合法、必要的原则，收集和使用您在使用我们的服务过程中主动提供或' +
                    '因我们产品/或服务所产生的个人信息。如果我们将您的信息经特定的目的收集用于其他目的，我们将以合理的方式向您告知，并在使用前征得您的同意。\n' +
                    '我们将通过以下途径收集您的个人信息\n' +
                    '**1.1账号注册及登录**\n' +
                    '（1）您登录时，信息门户所绑定的个人信息，包括真实姓名，学号，性别，年龄，院系，班级，课表。\n' +
                    '（2）您在提交申诉时所填写的真实姓名，学号，手机号，邮箱。请您谨慎考虑后提供这类信息，若您拒绝提供，您可能无法正常使用相应的功能\n' +
                    '（3）您在设置个人信息时，上传的头像以及编辑的昵称。您不提供此类信息，不会影响您使用本产品和相关服务。\n' +
                    '**1.2向您提供产品**\n' +
                    '发布、收藏、信息浏览功能：\n' +
                    '（1）您在Eatest所浏览并发布的内容，包含图片，标签等内容。\n' +
                    '（2）当您使用发布、评论、点赞、收藏记录些会存储在我们的服务器当中，因为存储是实现这一功能所必需的。我们会以加密方式存储，您也可以随时删除这些信息。\n']
                }
            ]
        },
        {
            title: '二、如何使用隐私信息',
            content: [
                {
                    type: 0,
                    text: ['**2.1用于后台的消息监管**\n' +
                    '例如:当用户在Eatast发布不良内容且影响十分恶劣时，查询用户的真实身份，用于线下约谈或上报至学院。\n' +
                    '**2.2用于信息通知**\n' +
                    '例如:失物招领校园卡找回功能，校园卡号上传成功后系统自动发送信息至对应用户。\n']
                }
            ]
        },
        {
            title: '三、手机权限的获取与使用',
            content: [
                {
                    type: 0,
                    text: ['**3.1权限的获取**\n' +
                    '拱拱将在您授权同意后获取手机上的权限。包括手机存储权限，地理位置权限，相机权限，后台常驻权限等，具体以您授权内容为准。' +
                    '权限信息属于个人敏感信息，拒绝提供该信息您无法使用上述基于位置提供的相关服务，但不影响您正常使用拱拱的其他功能。\n' +
                    '**3.2权限的使用**\n' +
                    '在您授权同意权限后，拱拱将使用这些权限为您提供更加优质的服务，例如:手机储存权限，将课表等信息储存在本地，离线状态下也能使用课表和其它功能。\n']
                }
            ]
        },
        {
            title: '四、我们如何存储和保护个人信息',
            content: [
                {
                    type: 0,
                    text: ['**4.1个人信息的储存**\n' +
                    '4.1.1我们将遵循法律法规，仅在《隐私条款》所述的所必须且短时间的储存您的信息。例如:当我们终止服务或运营，我们将遵循相关的法律法规及时停止继' +
                    '续收集您信息的活动，同时也将遵循法律法规向您提前通知，并在终止服务或运营后对您的信息进行删除。\n' +
                    '4.1.2我们在拱拱运营中收集和产生的信息，都将储存在拱拱后台系统中，我们会确保依据国家法律法规和相关监管部门的规定，并对您的信息提供足够的保护。\n' +
                    '根据相关法律法规的规定，在以下情形中，我们可以在不征得您的授权，使用一些必要的个人信息。\n' +
                    '（1）与我们履行法律法规规定的义务相关的；\n' +
                    '（2）与国家安全、国防安全直接相关的；\n' +
                    '（3）与公共安全、公共卫生、重大公共利益直接相关的；\n' +
                    '（4）与犯罪侦查、起诉、审判和判决执行等直接相关的；\n' +
                    '（5）出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人统一的；\n' +
                    '（6）所收集的个人信息是您自信向社会公众公开的；\n' +
                    '（7）从合法公开披露的信息中收集您的个人信息，如从合法的新闻报道、政府信息公开等渠道。\n' +
                    '（8）用于维护我们产品安全稳定运行所必须的；\n' +
                    '（9）法律规定的其他情形。\n' +
                    '**4.2保护个人信息**\n' +
                    '我们十分重视对个人信息的保护，建立自己后台系统来监管信息，除内部相关人员外，其他人都不能访问您的个人信息，更好的保护您的信息。\n' +
                    '若不幸发生信息安全事件后，我们将按照法律法规的要求，及时向您告知:安全事件的基本情况，可能产生的影响，我们将采取的措施以及补救措施等' +
                    '。我们将同时以邮件，推送等方式告知您，我们会采取合理，有效的方式发布公告。同时，我们将按照要求主动上报信息安全事件至相关部门。\n']
                }
            ]
        },
        {
            title: '五、如何联系我们',
            content: [
                {
                    type: 0,
                    text: ['若果您对《隐私条款》有什么意见或建议，或者发现个人隐私安全存在问题，请通过以下方式随时联系我们。' +
                    '官方QQ反馈群:' +
                    '一群 564430102' +
                    '二群 882861079' +
                    '三群 771924672' +
                    '四群 634767167' +
                    '地址：湘潭大学学生活动中心办公室406']
                }
            ]
        },
    ]

}
